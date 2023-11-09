export const Hits_URL = "http://localhost:8082/hits";

export interface User{
     id: number;
     nickname : String;
     bookmark: String;
     ageGroup: number;
     genderGroup: String;
}
export interface Book {
    id: number;
    createdDate: string;
    publisher: string;
    title: string;
    author: string;
    itemId: number;
    categoryName: string;
  }