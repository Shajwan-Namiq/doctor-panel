export function printDiv(divName: string) {
  const printContents: any = document.getElementById(divName)?.innerHTML;
  const w: any = window.open();
  w.document.write(printContents);
  w.print();
  w.close();
}
