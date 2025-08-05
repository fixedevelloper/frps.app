// models/cart-item.model.ts
export interface Departement {
  id: number;
  name: string;
}
export interface City {
  id: number;
  departement_id: number;
  name: string;
}
