// Food model and API types
export interface FoodItem {
  id: string;
  foodName: string;
  description: string;
  price: number;
  category: string;
  imgUrl: string;
  status: 'active' | 'inactive';
  updatedAt: string;
}

export interface FoodApiItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FoodApiCategory {
  id: number;
  category: string;
  items: FoodApiItem[];
}

export interface Category {
  _id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
