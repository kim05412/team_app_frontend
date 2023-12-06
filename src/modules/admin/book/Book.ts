// export const BASE_URL = "http://localhost:8082/books";

//location.hostname이 local인지 check하는 함수
function isLocalhost(): boolean {
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

//실행 환경에 맞게 API URL 생성하는 함수
export function BASE_URL(): string {
  return `${isLocalhost() ? "http" : "https"}://${isLocalhost() ? `${window.location.hostname}:8082` : window.location.hostname}/api`;
}

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
