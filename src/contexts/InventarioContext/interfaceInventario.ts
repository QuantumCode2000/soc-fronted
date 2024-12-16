interface InventarioItem {
  iDLamina: string;
  tipoLamina: string;
  dimensionesLamina: string;
  cantidadDisponible: string;
  espesor: string;
  color: string;
  fechaIngreso: string;
  estado: string;
}
interface InventarioContextProps{
    Items: InventarioItem[],
    additem: (InventarioItem:InventarioItem)=>void;
    updateitem:(InventarioItem:InventarioItem)=>void;
    removeitem:(iDLamina: string) => void;

}
 export type {InventarioItem, InventarioContextProps}