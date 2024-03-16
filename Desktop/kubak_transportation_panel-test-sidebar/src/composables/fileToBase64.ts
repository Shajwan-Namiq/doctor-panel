export function changeFileToBase64(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageBytes = new Uint8Array(event.target?.result as ArrayBuffer);
      let binary = "";
      for (let i = 0; i < imageBytes.length; i++) {
        binary += String.fromCharCode(imageBytes[i]);
      }
      const byteFile = btoa(binary);
      resolve(byteFile);
    };
    reader.onerror = function (event) {
      reject(event.target?.error);
    };
    reader.readAsArrayBuffer(imageFile);
  });
}
