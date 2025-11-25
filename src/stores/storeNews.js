import { defineStore } from "pinia";
import { reactive } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';

const parseDescriptionHtml = (htmlString) => {
  if (!htmlString) return { imageUrl: null, textContent: '' };

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  const imgTag = tempDiv.querySelector('img');
  const imageUrl = imgTag ? imgTag.src : null;
  const textContent = tempDiv.textContent.trim();

  return { imageUrl, textContent };
}

export const useStoreNews = defineStore("news", () => {
  const newsStateDefault = {
    noticias: [],
    loading: false,
    error: null
  };

  const newsState = reactive({ ...newsStateDefault });

  const fetchNoticias = async () => {
    newsState.loading = true;
    newsState.error = null;

    const rssUrl = 'https://rss.uol.com.br/feed/economia.xml';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;

    try {
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Erro ao acessar RSS: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const decoder = new TextDecoder('iso-8859-1');
      const textData = decoder.decode(arrayBuffer);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(textData, "text/xml");

      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Erro ao ler o formato XML do feed.");
      }

      const items = Array.from(xmlDoc.querySelectorAll("item"));

      const noticiasFormatadas = items.map(item => {
        const title = item.querySelector("title")?.textContent || "Sem título";
        const link = item.querySelector("link")?.textContent || "#";
        const pubDate = item.querySelector("pubDate")?.textContent || "";

        const rawDescription =
          item.querySelector("description")?.textContent ||
          item.querySelector("content\\:encoded")?.textContent ||
          "";

        const parsedContent = parseDescriptionHtml(rawDescription);

        let finalImageUrl = parsedContent.imageUrl;
        if (!finalImageUrl) {
          const enclosure = item.querySelector("enclosure");
          if (enclosure && enclosure.getAttribute("type")?.includes("image")) {
            finalImageUrl = enclosure.getAttribute("url");
          }
        }

        const formattedDate = pubDate ? pubDate.split(' ').slice(0, 4).join(' ') : '';

        return {
          title,
          url: link,
          imageUrl: finalImageUrl,
          textContent: parsedContent.textContent,
          pubDateFormatted: formattedDate,
          rawDate: pubDate
        };
      });

      newsState.noticias = noticiasFormatadas;

    } catch (err) {
      useShowErrorMessage(err.message);
      console.error("Falha ao buscar notícias:", err);
      newsState.error = err.message;
    } finally {
      newsState.loading = false;
    }
  };

  const clearNoticias = () => {
    Object.assign(newsState, newsStateDefault);
  };

  return {
    newsState,
    fetchNoticias,
    clearNoticias
  };
});