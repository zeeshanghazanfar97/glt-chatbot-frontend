export interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  options?: string[];
  products?: ProductType[];
  suggestions?: Record<string, string>;
}

export interface ResponseType {
  text: string;
  options?: string[];
  products?: ProductType[];
  suggestions?: Record<string, string>;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: string;
  image_url: string;
  in_stock: boolean;
}

export interface CartItem extends ProductType {
  quantity: number;
}