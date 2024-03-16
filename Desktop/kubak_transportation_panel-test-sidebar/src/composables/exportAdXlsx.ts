import * as XLSX from "xlsx";

export function exportAsXlsx(data: any, fileName: string, sheetName: string) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, sheetName || "Sheet1");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  const blob = new Blob([wbout], { type: "application/octet-stream" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName || "data.xlsx";
  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
}
