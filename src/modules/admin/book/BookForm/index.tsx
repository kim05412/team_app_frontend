import { useState } from "react";
import axios from "axios";
import { MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SimplifiedBook } from "../Book";
import { FormContainer } from "./styles";

// programatic방식으로 라우팅 처리

const BookForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const navigate = useNavigate();
  const [bookData, setBooksData] = useState<SimplifiedBook[]>([]);

  const publisherRef = useRef() as MutableRefObject<HTMLInputElement>;
  const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
  const linkRef = useRef() as MutableRefObject<HTMLInputElement>;
  const authorRef = useRef() as MutableRefObject<HTMLInputElement>;
  const pubDateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
  const isbnRef = useRef() as MutableRefObject<HTMLInputElement>;
  const isbn13Ref = useRef() as MutableRefObject<HTMLInputElement>;
  const itemIdRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceSalesRef = useRef() as MutableRefObject<HTMLInputElement>;
  const priceStandardRef = useRef() as MutableRefObject<HTMLInputElement>;
  const stockStatusRef = useRef() as MutableRefObject<HTMLInputElement>;
  const coverRef = useRef() as MutableRefObject<HTMLInputElement>;
  const categoryIdRef = useRef() as MutableRefObject<HTMLInputElement>;
  const categoryNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const customerReviewRankRef = useRef() as MutableRefObject<HTMLInputElement>;

  // 제외한 나머지 필드만 파라미터로 받음
  const createBookData = async (book: Omit<SimplifiedBook, "id" | "createdDate">) => {
    try {
      const response = await axios.post("http://localhost:8082/api/books/add", book);
      alert("저장되었습니다.");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      alert("저장에 실패하였습니다.");
    }
  };

  const handleSave = async () => {
    const newBook: Omit<SimplifiedBook, "id" | "createdDate"> = {
      publisher: publisherRef.current.value,
      title: titleRef.current.value,
      link: linkRef.current.value,
      author: authorRef.current.value,
      pubDate: pubDateRef.current.value,
      description: descriptionRef.current.value,
      isbn: isbnRef.current.value,
      isbn13: isbn13Ref.current.value,
      itemId: parseInt(itemIdRef.current.value),
      priceSales: parseInt(priceSalesRef.current.value),
      priceStandard: parseInt(priceStandardRef.current.value),
      stockStatus: stockStatusRef.current.value,
      cover: coverRef.current.value,
      categoryId: parseInt(categoryIdRef.current.value),
      categoryName: categoryNameRef.current.value,
      customerReviewRank: parseInt(customerReviewRankRef.current.value),
    };

    // 입력한 데이터 서버로 보내고 응답 받은 데이터 저장
    const savedBook = await createBookData(newBook);
    // 상태함수 : 기존배열-> 새 배열 => 상태변화
    if (savedBook) {
      // 현재 책 리스트의 모든 책들을 개별 요소로 펼친것에 새 책 추가
      setBooksData((prevBooks) => [...prevBooks, savedBook]);
      navigate("/books");
    }
  };

  return (
    <div>
      <FormContainer>
        <p> 도서 정보 추가하기 </p>
        <input ref={publisherRef} placeholder="출판사" />
        <input ref={titleRef} placeholder="제목" />
        <input ref={linkRef} placeholder="링크" />
        <input ref={authorRef} placeholder="저자" />
        <input ref={pubDateRef} placeholder="출판일" />
        <textarea ref={descriptionRef} placeholder="설명" />
        <input ref={isbnRef} placeholder="ISBN" />
        <input ref={isbn13Ref} placeholder="ISBN13" />
        <input ref={itemIdRef} placeholder="상품 ID" />
        <input ref={priceSalesRef} placeholder="판매가" />
        <input ref={priceStandardRef} placeholder="정가" />
        <input ref={stockStatusRef} placeholder="재고 상태" />
        <input ref={coverRef} placeholder="커버 이미지 URL" />
        <input ref={categoryIdRef} placeholder="카테고리 ID" />
        <input ref={categoryNameRef} placeholder="카테고리 이름" />
        <input ref={customerReviewRankRef} placeholder="고객 리뷰 평점" />
        <div>
          <button onClick={handleSave}>저장</button>
          <button>임시저장</button>
        </div>
      </FormContainer>
    </div>
  );
};

export default BookForm;
