# BlueBee

Plataforma web de educação financeira e simulação de investimentos, com foco em experiência prática, gamificação e organização de carteira.

## ✨ Visão do Produto

O **BlueBee** foi desenvolvido para ajudar pessoas iniciantes (e intermediárias) a aprender sobre investimentos de forma guiada. O projeto combina:

- acompanhamento de carteira;
- desafios e recompensas com progressão;
- simulador de investimentos;
- conteúdos de apoio (glossário, segurança e quiz);
- onboarding interativo por página.

## 🚀 Funcionalidades Principais

- **Autenticação de usuários** com Supabase (cadastro, login e atualização de perfil).
- **Carteira de ativos** com visualização, distribuição e histórico de operações.
- **Diversificação da carteira** com gráfico de alocação por categoria.
- **Calculadora de investimentos** para simulações com juros compostos.
- **Desafios gamificados** com ganho de XP, nível e saldo virtual.
- **Quiz e perfil do investidor** para reforço de aprendizado.
- **Tutoriais guiados (Driver.js)** em telas estratégicas da aplicação.
- **PWA ready** (build para Progressive Web App).

## 🧱 Stack Técnica

- **Frontend:** Vue 3 + Quasar Framework (Vite)
- **Estado global:** Pinia
- **Roteamento:** Vue Router
- **Backend BaaS:** Supabase (Auth + Database)
- **Gráficos:** Chart.js + vue-chartjs
- **UX onboarding:** Driver.js
- **Utilitários:** html2canvas

## 🗂️ Estrutura do Projeto

```txt
src/
	components/     # Componentes de UI e seções
	pages/          # Páginas principais (Home, Wallet, Quiz, etc.)
	stores/         # Stores Pinia (auth, ativos, desafios, quiz...)
	composables/    # Lógica reutilizável (simulações e helpers)
	config/         # Integrações externas (Supabase)
	boot/           # Inicializações globais da aplicação
src-pwa/          # Service worker e manifest para PWA
```

## ⚙️ Como Executar Localmente

### Pré-requisitos

- Node.js **20+**
- npm **6.13+** (ou yarn **1.21+**)

### 1) Instalar dependências

```bash
npm install
```

### 2) Rodar em desenvolvimento

```bash
npm run dev
```

### 3) Gerar build de produção

```bash
npm run build
```

### 4) Gerar build PWA

```bash
npm run build:pwa
```

## 🔐 Variáveis de Ambiente

A aplicação utiliza credenciais do Supabase via variáveis de ambiente (injetadas no build do Quasar).

Defina:

- `SUPABASE_URL`
- `SUPABASE_KEY`

> Recomenda-se manter as chaves fora do versionamento e usar ambientes separados (dev/staging/prod).

## 🧭 Rotas da Aplicação

- `/` — Home
- `/auth` — Login/Cadastro
- `/wallet` — Carteira e histórico
- `/explore` — Explorar ativos
- `/calculator` — Simulador de investimentos
- `/glossary` — Glossário financeiro
- `/challenges` — Desafios
- `/quiz` — Quiz educativo
- `/profile` — Perfil do usuário
- `/security` — Boas práticas de segurança
- `/investprofile` — Perfil de investidor

## 🧪 Scripts Disponíveis

- `npm run dev` — ambiente de desenvolvimento
- `npm run build` — build de produção
- `npm run build:pwa` — build em modo PWA
- `npm run clean:nonframework` — limpeza auxiliar do projeto

## 🌐 Deploy

O repositório contém configuração para deploy na Vercel (`vercel.json`).

Fluxo sugerido:

1. Conectar o repositório na Vercel.
2. Configurar as variáveis `SUPABASE_URL` e `SUPABASE_KEY` no painel.
3. Publicar com build de produção.

---

Se você gostou do projeto, considere deixar uma ⭐ no repositório.
