export interface IBooks {
  id: number;
  title: string;
  author: string;
  category: string[];
  year: number;
  genre: string;
  pages: number;
  publisher: string;
  language: string;
  isbn: string;
  description: string;
  image?: string;
  price?: number;
  stock?: number;
  tags?: string[];
}

export interface ICategory {
  text: string;
  value: string;
}