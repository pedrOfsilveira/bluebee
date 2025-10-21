import { defineStore } from "pinia";
import { reactive } from "vue";
import { useShowErrorMessage } from 'src/use/useShowErrorMessage';

const parseDescriptionHtml = (htmlString) => {
  if (!htmlString) {
    return { imageUrl: null, textContent: '' };
  }
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

  const fetchNoticias = async (count = 5) => {
    newsState.loading = true;
    newsState.error = null;
    const apiKey = 'd040f821-06e8-4e20-9029-17a58b19dbd5';
    const apiUrl = 'https://api.parse.bot/scraper/17669cbf-095a-4c47-bb53-2fca4b72de88/run';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ count: count.toString() }),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      const noticiasFormatadas = data.data.map(noticia => {
        const parsedContent = parseDescriptionHtml(noticia.description || '');

        const formattedDate = noticia.pubDate ? noticia.pubDate.split(' ').slice(0, 4).join(' ') : '';

        return {
          ...noticia,
          imageUrl: parsedContent.imageUrl,
          textContent: parsedContent.textContent,
          pubDateFormatted: formattedDate
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
