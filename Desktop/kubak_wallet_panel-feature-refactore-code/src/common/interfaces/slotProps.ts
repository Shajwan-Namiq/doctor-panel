export interface SlotProps<TData = any> {
  node: any;
  field: string;
  frozenRow: boolean;
  editorInitCallback: () => void;
  data: TData;
  index: number;
  column: string;
}
