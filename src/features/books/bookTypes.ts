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
isFavorite?: boolean;
createdBy?: string;
  borrowedBy?: string;
}
