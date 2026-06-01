export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  publishYear: number;
  rating: number;
  coverImage?: string;

  status: "available" | "borrowed";

  borrowedByCurrentUser?: boolean;

  borrowedBy?: string;
}