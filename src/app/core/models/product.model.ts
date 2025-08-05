export interface Product {
  id: number;
  intitule: string;
  price: string;
  referenceProduit: string;
  categorie: string;
  numeroLot: string;
  quantiteParUnite: string;
  uniteDeMesure: string;
  poidsDimension: string;
  financement: string;
  utilisateurCible: string;
  dateFabrication: string;
  datePeremption: string;
  status: string;
  image: string;
}

export interface Category {
  id: string;
  intitule: string;
  parent_id: number;
  parent?: string | null;  // nom parent, ou null
  image?: string | null;   // url image, ou null
}
