/* eslint-disable prettier/prettier */
export function fileToBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target && event.target.result instanceof ArrayBuffer) {
                resolve(new Blob([event.target.result], { type: file.type }));
            } else {
                reject(new Error("Error converting file to Blob."));
            }
        };

        reader.onerror = (error: any) => {
            reject(new Error(`Error reading file: ${error.message}`));
        };

        reader.readAsArrayBuffer(file);
    });
}
