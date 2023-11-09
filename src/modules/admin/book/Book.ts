export const BASE_URL = "http://localhost:8082/books";

export interface SimplifiedBook {
  id: number;
  createdDate: string;
  publisher: string;
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  stockStatus: string;
  cover: string;
  categoryId: number;
  categoryName: string;
  customerReviewRank: number;
}
