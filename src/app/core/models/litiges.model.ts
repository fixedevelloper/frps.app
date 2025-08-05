export interface LitigesModel {
  id: number;
  commande_id: number;
  customer_name: string;
  type: string;
  description: number;
  status?: string | null;
  submitted_at?: string | null;
  resolution_deadline?: string | null; // nom parent, ou null
  image?: string | null;   // url image, ou null
}
export interface ReturnRequest {
  id: number;
  product_id: string;
  product_name: string;
  order_id: number;
  reason?: string | null;  // nom parent, ou null
  status?: string | null;
  return_label?: string | null;
  resolution_deadline?: string | null;
  created_at?: string | null;// url image, ou null
}
export interface OrderModel {
  id: string;
  total: number;
  customer_name: string;
  customer_image: string;
  date: string;
  customer_id: number;
  status:string;
  validatedStatus:string,
  products:ProductOrderModel[]
}
export interface ProductOrderModel {
  id: string;
  amount: string;
  order_id: number;
  product: string;
  product_price: number;
  quantity: number;
}
