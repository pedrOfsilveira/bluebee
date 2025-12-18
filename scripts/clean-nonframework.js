

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

let stripComments;
let prettier;

(async () => {
  try {
    try {
      const sc = await import('strip-comments');
      stripComments = sc.default ?? sc;
    } catch { stripComments = null; }
    try {
      const pr = await import('prettier');
      prettier = pr.default ?? pr;
    } catch { prettier = null; }

    const root = process.cwd();

    const EXCLUDE_DIRS = new Set([
      path.join(root, 'src', 'config'),
      path.join(root, 'src-pwa'),
      path.join(root, 'public'),
      path.join(root, 'node_modules'),
      path.join(root, '.git'),
    ]);

    const EXCLUDE_FILES = new Set([
      path.join(root, 'quasar.config.js'),
      path.join(root, 'postcss.config.js'),
      path.join(root, 'src', 'config', 'supabase.js'),
    ]);

    const SHOULD_PROCESS = (fullPath) => {
      const rel = path.relative(root, fullPath);
      if (!rel.startsWith('src' + path.sep) && !['src'].includes(rel)) return false;
      for (const d of EXCLUDE_DIRS) {
        if (fullPath.startsWith(d + path.sep) || fullPath === d) return false;
      }
      if (EXCLUDE_FILES.has(fullPath)) return false;
      const ext = path.extname(fullPath).toLowerCase();
      return ['.js', '.ts', '.vue', '.scss', '.css'].includes(ext);
    };

    const srcDir = path.join(root, 'src');
    // Bail out gracefully if src directory doesn't exist
    try { await stat(srcDir); } catch { console.error('src directory not found'); return; }
    const files = await walkDir(srcDir);
    const targets = files.filter(SHOULD_PROCESS);

    let processed = 0;
    for (const file of targets) {
      const ext = path.extname(file).toLowerCase();
      let content = await readFile(file, 'utf8');

      if (ext === '.js' || ext === '.ts') {
        content = stripJs(content);
      } else if (ext === '.css' || ext === '.scss') {
        content = stripCss(content);
      } else if (ext === '.vue') {
        content = stripVue(content);
      }

      if (prettier) {
        try {
          const parser = ext === '.vue' ? 'vue' : ext === '.ts' ? 'babel-ts' : ext === '.js' ? 'babel' : ext === '.scss' ? 'scss' : 'css';
          content = await prettier.format(content, { parser });
        } catch {
          // ignore formatting errors
        }
      }

      await writeFile(file, content, 'utf8');
      processed++;
    }

    console.log(`Cleaned comments and formatted ${processed} file(s).`);
  } catch (e) {
    console.error('Error during cleanup:', e);
    process.exitCode = 1;
  }
})();

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkDir(fullPath)));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

function stripJs(code) {
  if (stripComments) {
    try { return stripComments(code); } catch { /* fallthrough */ }
  }
  // Fallback: naive removal (may miss edge cases)
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
    .replace(/(^|\s)\/\/.*$/gm, '$1'); // line comments
}

function stripCss(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
    .replace(/(^|\s)\/\/.*$/gm, '$1'); // scss line comments
}

function stripVue(sfc) {
  let out = sfc;
  // Remove HTML comments (template parts)
  out = out.replace(/<!--[\s\S]*?-->/g, '');

  // Process <script> blocks
  out = out.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (m, inner) => {
    const stripped = stripJs(inner);
    return m.replace(inner, stripped);
  });

  // Process <style> blocks (supports multiple)
  out = out.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gi, (m, inner) => {
    const stripped = stripCss(inner);
    return m.replace(inner, stripped);
  });

  return out;
}
