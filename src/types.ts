export interface Meal {
  id: string;
  ingredients: string[];
  createdAt: string;
}

export interface Feel {
  id: string;
  score: number;
  createdAt: string;
}

export interface TotalItems {
  totalFeels: number;
  totalMeals: number;
}

export type ItemType = 'feel' | 'meal';
