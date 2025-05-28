export interface MessageType {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  options?: string[];
  products?: ProductType[];
  suggestions?: Record<string, string>;
  badges_earned?: BadgeType[];
}

export interface ResponseType {
  text: string;
  options?: string[];
  products?: ProductType[];
  suggestions?: Record<string, string>;
  badges_earned?: BadgeType[];
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

export interface BadgeType {
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  is_earned?: boolean;
  earned_at?: string | null;
}

export interface UserType {
  name: string;
  is_admin: boolean;
}

export interface DashboardDataType {
  user_email: string;
  user_name: string;
  is_admin: boolean;
  total_orders: number;
  orders: OrderType[];
  learning_hours: LearningHoursType;
  badges: BadgeType[];
}

export interface OrderType {
  title: string;
  order_id: string;
  items?: string[];
  created_at: string;
  status: string;
}

export interface LearningHoursType {
  total_hours: number;
  details: {
    wellness: number;
    technology_education: number;
    career_guidance: number;
    digital_safety: number;
    other: number;
  };
}