// useImageCompressor.js
import { ref } from "vue";
import imageCompression from "browser-image-compression";

export default function useImageCompressor() {
  const compressedImages = ref({});

  async function compressAndSetImage(imageUrl: string, id: any) {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const imageBlob = await response.blob();
      const fileName = imageUrl.split("/").pop();
      const imageFile = new File([imageBlob], fileName as string, {
        type: "image/jpeg",
      });
      const compressedFile = await imageCompression(imageFile, options);

      const reader = new FileReader();
      reader.onloadend = () => {
        compressedImages.value[id] = reader.result;
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing the image: ", error);
      compressedImages.value[id] = "";
    }
  }

  return { compressedImages, compressAndSetImage };
}
