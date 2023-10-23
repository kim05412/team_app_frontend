// import BookTable from "../BookTable";

// const AddBookModal: React.FC = () => {
//     const [formData, setFormData] = useState<SimplifiedBook>({
//       // 초기값 설정
//     });
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//     };
  
//     const handleSubmit = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/books", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         });
  
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
  
//         const data = await response.json();
//         console.log("Success:", data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
  
//     return (
//       <div>
//         {/* 모달 창의 HTML 구조 */}
//         <input type="text" name="title" value={formData.title} onChange={handleChange} />
//         {/* ... (나머지 입력 필드) */}
//         <button onClick={handleSubmit}>추가</button>
//       </div>
//     );
//   };

// function useState<T>(arg0: {}): [any, any] {
//     throw new Error("Function not implemented.");
// }
