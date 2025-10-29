import { ref } from "vue";
import html2canvas from "html2canvas";

const downloadImage = (dataUrl, filename) => {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert(
    "A imagem foi baixada, pois o compartilhamento nativo não está disponível."
  );
};

export function useShareAsImage() {
  const shareLoading = ref(false);

  const shareElementAsImage = async (elementId) => {
    shareLoading.value = true;
    const resultsElement = document.getElementById(elementId);

    if (!resultsElement) {
      console.error("Elemento de resultados não encontrado para captura.");
      shareLoading.value = false;
      return;
    }

    const originalStyle = resultsElement.style.cssText;

    resultsElement.style.backgroundColor = "transparent";
    resultsElement.style.boxShadow = "none";
    resultsElement.style.border = "none";

    const computedStyle = getComputedStyle(resultsElement);
    const elementBackgroundColor =
      computedStyle.backgroundColor === "rgba(0, 0, 0, 0)" ||
      computedStyle.backgroundColor === "transparent"
        ? "#FFFFFF"
        : computedStyle.backgroundColor;

    await new Promise((resolve) => setTimeout(resolve, 50));

    try {
      const originalCanvas = await html2canvas(resultsElement, {
        useCORS: true,
        scale: 2,
        logging: false,
        backgroundColor: elementBackgroundColor,
      });

      const targetRatio = 9 / 16;
      const originalWidth = originalCanvas.width;
      const originalHeight = originalCanvas.height;
      const originalRatio = originalWidth / originalHeight;

      let destWidth;
      let destHeight;
      let x = 0;
      let y = 0;

      if (originalRatio > targetRatio) {
        destWidth = originalWidth;
        destHeight = Math.round(originalWidth / targetRatio);
        y = Math.round((destHeight - originalHeight) / 2);
      } else {
        destHeight = originalHeight;
        destWidth = Math.round(originalHeight * targetRatio);
        x = Math.round((destWidth - originalWidth) / 2);
      }

      const destCanvas = document.createElement("canvas");
      destCanvas.width = destWidth;
      destCanvas.height = destHeight;
      const destCtx = destCanvas.getContext("2d");

      destCtx.fillStyle = elementBackgroundColor;
      destCtx.fillRect(0, 0, destWidth, destHeight);
      destCtx.drawImage(originalCanvas, x, y);

      const imageDataUrl = destCanvas.toDataURL("image/png");

      if (navigator.share) {
        const blob = await (await fetch(imageDataUrl)).blob();
        const file = new File([blob], "bluebee-simulacao.png", {
          type: "image/png",
        });

        try {
          await navigator.share({
            files: [file],
            title: "Minha Simulação de Investimento Bluebee!",
            text: "Confira a simulação que fiz no Bluebee e comece a investir você também!",
            url: window.location.href,
          });
        } catch (error) {
          console.warn(
            "Compartilhamento nativo falhou ou foi cancelado:",
            error
          );
        }
      } else {
        downloadImage(imageDataUrl, "bluebee-simulacao.png");
      }
    } catch (error) {
      console.error("Erro ao gerar a imagem:", error);
      alert("Não foi possível gerar a imagem para compartilhamento.");
    } finally {
      resultsElement.style.cssText = originalStyle;
      shareLoading.value = false;
    }
  };

  return {
    shareLoading,
    shareElementAsImage,
  };
}
