import { defineStore } from "pinia";
import { ref } from "vue";
import { uid } from "quasar";

export const useStoreNews = defineStore("news", () => {
  /* state */

  const news = ref([
    {
      id: uid(),
      title: "Mercado de ações fecha em alta com otimismo sobre economia",
      source: "Fonte: Bloomberg",
      imageUrl:
        "https://super.abril.com.br/wp-content/uploads/2016/09/super_imggirafa.jpg?quality=70&strip=info&resize=1080,565&crop=1",
      link: "#",
    },
    {
      id: uid(),
      title: "Bitcoin atinge novo recorde histórico",
      source: "Fonte: CoinDesk",
      imageUrl:
        "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcReEoMVZ9sdsDQ1MKvhv8l-JR5nMGiCRTjWwFnRQKnnatctoZqwb5UhBlhVjET90_UaF1QqUxcwHaJyX661JvNmCcgXlWt5chYa82sRc8I",
      link: "#",
    },
    {
      id: uid(),
      title: "Setor de tecnologia lidera ganhos na bolsa",
      source: "Fonte: TechCrunch",
      imageUrl:
        "https://meusanimais.com.br/wp-content/uploads/2020/04/ovelhas-caracteristicas.jpg",
      link: "#",
    },
  ]);

  /* getters */

  /* actions */

  return {
    news
  };
});
