import axios from "axios";
import { useState, useEffect, MutableRefObject, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, SimplifiedBook } from "../Book";
import { FormContainer } from "./styles";

// programatic방식으로 라우팅 처리

const BookForm = ({ onSave, onClose }) => {
  const [hasTempBook, setHasTempBook] = useState(false);
  const [showTempSaved, setShowTempSaved] = useState(false);
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
  //서버 데이터 전송
  const createBookData = async (book, isTempBook) => {
    try {
      const response = await axios.post(`${BASE_URL}/add`, book);
      console.log(response.data);
      if (isTempBook) {
        clearTempBook();
      }
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
  //type Scribt , Omit : 특정 속성들을 제외한 새로운 타입을 생성
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
      alert("알맞은 값을 채워주세요.");
      return;
    }

    if (!isbn && !isbn13) {
      alert("ISBN 또는 ISBN13 중 하나는 반드시 입력해야 합니다.");
      return;
    }

    // 입력한 데이터 서버로 보내고 응답 받은 데이터 저장
    const savedBook = hasTempBook ? await createBookData(newBook, true) : await createBookData(newBook, false);

    // 상태함수 : 기존배열-> 새 배열 => 상태변화
    if (savedBook) {
      // 현재 책 리스트의 모든 책들을 개별 요소로 펼친것에 새 책 추가
      alert("저장되었습니다.");
      onSave(savedBook);
      onClose();
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const tempBook = localStorage.getItem("tempBook");
      if (tempBook !== null) {
        setHasTempBook(true);
        setShowTempSaved(true);
      }
    };

    // 초기값 설정
    handleStorageChange();

    // storage 이벤트 리스너 등록
    // localStorage 또는 sessionStorage 변경-> storage 이벤트를 발생
    // 브라우저에따라, 탭간의 데이터 동기화
    window.addEventListener("storage", handleStorageChange);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleTempSave = () => {
    const newBook = {
      publisher: publisherRef.current.value,
      title: titleRef.current.value,
      link: linkRef.current.value,
      author: authorRef.current.value,
      pubDate: pubDateRef.current.value,
      description: descriptionRef.current.value,
      isbn: isbnRef.current.value,
      isbn13: isbn13Ref.current.value,
      itemId: itemIdRef.current.value ? parseInt(itemIdRef.current.value) : null,
      priceSales: priceSalesRef.current.value ? parseInt(priceSalesRef.current.value) : null,
      priceStandard: priceStandardRef.current.value ? parseInt(priceStandardRef.current.value) : null,
      stockStatus: stockStatusRef.current.value,
      cover: coverRef.current.value,
      categoryId: categoryIdRef.current.value ? parseInt(categoryIdRef.current.value) : null,
      categoryName: categoryNameRef.current.value,
      customerReviewRank: customerReviewRankRef.current.value ? parseInt(customerReviewRankRef.current.value) : null,
    };

    // 값이 있는지 확인
    if (Object.values(newBook).some((value) => value !== null && value !== "" && !Number.isNaN(value))) {
      localStorage.setItem("tempBook", JSON.stringify(newBook));
      alert("임시저장 되었습니다.");
    } else {
      alert("저장할 데이터가 없습니다.");
    }
  };
  // 임시저장 데이터 지우기
  const clearTempBook = () => {
    localStorage.removeItem("tempBook");
    setShowTempSaved(true);
  };

  const handleLoadTempBook = () => {
    const tempBook = localStorage.getItem("tempBook");
    if (tempBook) {
      const loadedBook = JSON.parse(tempBook);
      publisherRef.current.value = loadedBook.publisher || "";
      titleRef.current.value = loadedBook.title || "";
      linkRef.current.value = loadedBook.link || "";
      authorRef.current.value = loadedBook.author || "";
      pubDateRef.current.value = loadedBook.pubDate || "";
      descriptionRef.current.value = loadedBook.description || "";
      isbnRef.current.value = loadedBook.isbn || "";
      isbn13Ref.current.value = loadedBook.isbn13 || "";
      itemIdRef.current.value = loadedBook.itemId !== null ? loadedBook.itemId.toString() : "";
      priceSalesRef.current.value = loadedBook.priceSales !== null ? loadedBook.priceSales.toString() : "";
      priceStandardRef.current.value = loadedBook.priceStandard !== null ? loadedBook.priceStandard.toString() : "";
      stockStatusRef.current.value = loadedBook.stockStatus || "";
      coverRef.current.value = loadedBook.cover || "";
      categoryIdRef.current.value = loadedBook.categoryId !== null ? loadedBook.categoryId.toString() : "";
      categoryNameRef.current.value = loadedBook.categoryName || "";
      customerReviewRankRef.current.value =
        loadedBook.customerReviewRank !== null ? loadedBook.customerReviewRank.toString() : "";

      alert("데이터가 불러와졌습니다.");
      setHasTempBook(true);
      setShowTempSaved(false);
    } else {
      alert("임시저장된 데이터가 없습니다.");
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
          <input ref={pubDateRef} placeholder="출판일을 입력해주세요 (예: 2023-00-00)" />
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
          <button onClick={handleSave}>추가하기</button>
          {showTempSaved ? (
            <button onClick={handleLoadTempBook}>임시데이터 불러오기</button>
          ) : (
            <button onClick={handleTempSave}>임시저장</button>
          )}
        </div>
      </FormContainer>
    </div>
  );
};
export default BookForm;
