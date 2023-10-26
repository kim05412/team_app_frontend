// import { MutableRefObject, useRef } from "react";

// import axios from "axios";

// interface SimplifiedBook {
//   id?: number;
//   createdDate?: string;
//   publisher?: string;
//   title?: string;
//   link?: string;
//   author?: string;
//   pubDate?: string;
//   description?: string;
//   isbn?: string;
//   isbn13?: string;
//   itemId?: number;
//   priceSales?: number;
//   priceStandard?: number;
//   stockStatus?: string;
//   cover?: string;
//   categoryId?: number;
//   categoryName?: string;
//   customerReviewRank?: number;
// }

// interface BookModifyModalProps {
//   book: SimplifiedBook;
//   onConfirm: (updatedBook: SimplifiedBook) => void;
//   onCancel: () => void;
// }

// const BookModifyModal = ({ book, onConfirm, onCancel }: BookModifyModalProps) => {
//   const titleRef = useRef() as MutableRefObject<HTMLInputElement>;
//   const authorRef = useRef() as MutableRefObject<HTMLInputElement>;

//   const handleConfirm = async () => {
//     const updatedBook: SimplifiedBook = {
//       ...book,
//       title: titleRef.current.value || book.title,
//       author: authorRef.current.value || book.author,
//     };

//     try {
//       const response = await axios.put(`http://localhost8080/api/books/${book.id}`, updatedBook);
//       console.log(response.data);
//       onConfirm(updatedBook);
//     } catch (error) {
//       console.error("서버에 요청을 보내는 중 에러가 발생했습니다", error);
//     }
//   };

//   return (
//     <Wrapper>
//       <Container>
//         <input defaultValue={book.title} ref={titleRef} placeholder="Title" />
//         <input defaultValue={book.author} ref={authorRef} placeholder="Author" />
//         <ButtonContainer>
//           <Button primary onClick={handleConfirm}>
//             수정
//           </Button>
//           <Button onClick={onCancel}>취소</Button>
//         </ButtonContainer>
//       </Container>
//     </Wrapper>
//   );
// };

// export default BookModifyModal;
