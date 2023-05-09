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

export type ItemType = 'feel' | 'meal';
