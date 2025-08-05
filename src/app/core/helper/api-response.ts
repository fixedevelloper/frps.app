export interface ApiResponse<T> {
  status: string;        // ex: "success" ou "error"
  message: string | null; // message optionnel, peut être null
  data: T;               // données génériques de type T
}
