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

  const createBookData = async (book) => {
    try {
      const response = await axios.post("http://localhost:8082/api/books/add", book);
      alert("저장되었습니다.");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("이미 존재하는 도서 정보입니다.");
      } else {
        console.error("저장에 실패하였습니다", error);
        alert("저장에 실패하였습니다.");
      }
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

    // 빈 값 체크
    // 도서 정보 특성 반영
    const { isbn, isbn13, ...otherFields } = newBook;
    if (
      Object.values(otherFields).some(
        (value) => value === "" || value === null || value === undefined || Number.isNaN(value),
      )
    ) {
      alert("빈 값을 채워주세요.");
      return;
    }

    if (!isbn && !isbn13) {
      alert("ISBN 또는 ISBN13 중 하나는 반드시 입력해야 합니다.");
      return;
    }

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
        <label>
          <span>출판사 :</span>
          <input ref={publisherRef} placeholder="출판사를 입력해주세요" />
        </label>
        <label>
          <span>제목 :</span>
          <input ref={titleRef} placeholder="도서의 제목을 입력해주세요" />
        </label>
        <label>
          <span>링크 :</span>
          <input ref={linkRef} placeholder="도서의 링크를 입력해주세요" />
        </label>
        <label>
          <span>저자 :</span>
          <input ref={authorRef} placeholder="저자의 이름을 입력해주세요" />
        </label>
        <label>
          <span>출판일 :</span>
          <input ref={pubDateRef} placeholder="출판일을 입력해주세요 (예: 2022-01-01)" />
        </label>
        <label>
          <span>설명 :</span>
          <textarea ref={descriptionRef} placeholder="도서에 대한 설명을 입력해주세요" />
        </label>
        <label>
          <span>ISBN :</span>
          <input ref={isbnRef} placeholder="ISBN을 입력해주세요" />
        </label>
        <label>
          <span>ISBN13 :</span>
          <input ref={isbn13Ref} placeholder="ISBN13을 입력해주세요" />
        </label>
        <label>
          <span>상품 ID :</span>
          <input ref={itemIdRef} placeholder="상품 ID를 입력해주세요" />
        </label>
        <label>
          <span>판매가 :</span>
          <input ref={priceSalesRef} placeholder="판매가를 입력해주세요" />
        </label>
        <label>
          <span>정가 :</span>
          <input ref={priceStandardRef} placeholder="정가를 입력해주세요" />
        </label>
        <label>
          <span>재고 상태 :</span>
          <input ref={stockStatusRef} placeholder="재고 상태를 입력해주세요" />
        </label>
        <label>
          <span>커버 URL :</span>
          <input ref={coverRef} placeholder="커버 이미지의 URL을 입력해주세요" />
        </label>
        <label>
          <span>카테고리 ID :</span>
          <input ref={categoryIdRef} placeholder="카테고리 ID를 입력해주세요" />
        </label>
        <label>
          <span>카테고리 :</span>
          <input ref={categoryNameRef} placeholder="카테고리 이름을 입력해주세요" />
        </label>
        <label>
          <span>고객 평점:</span>
          <input ref={customerReviewRankRef} placeholder="고객 리뷰 평점을 입력해주세요" />
        </label>
        <div>
          <button onClick={handleSave}>저장</button>
          <button>임시저장</button>
        </div>
      </FormContainer>
    </div>
  );
};

export default BookForm;
