// import { BASE_URL } from "@/modules/admin/book/Book";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";

// // 서버에서 가져올 데이터의 타입을 정의
// interface BookStats {
//   id: number;
//   title: string;
//   category_name: string;
//   author: string;
//   publisher: string;
// }

// interface HitsRecord {
//     id: number;
//     user_id: number;
//     book_id: number;
//     hits_count: number;
//     created_date: string;
//   }

// interface ChartData {
//   series: number[]; // 값
//   categories: string[]; // X축에 표시될 카테고리
// }

// const MyComponent: React.FC = () => {
//   const [bookStats, setBookStats] = useState<BookStats[]>([]); // 도서 정보 저장할 상태
//   const [chartData, setChartData] = useState<ChartData>({ series: [], categories: [] }); // 차트에 표시할 데이터 저장할 상태

//   useEffect(() => {
//     // 서버에서 데이터를 가져오는 함수
//     const fetchData = async () => {
//       try {
//         const response = await axios(`${BASE_URL}/add`); // API 엔드포인트로 변경하세요.
//         const data: BookStats[] = await response.json();
//         setBookStats(data);

//         // ApexChart, 데이터 가공
//         const titles = data.map((book) => book.title);
//         const series = data.map((book) => book.customer_review_rank);

//         setChartData({ categories, series: [{ name: "Review Rank", data: series }] });
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // 그래프 옵션 설정
//   const options = {
//     chart: {
//       type: "bar",
//     },
//     xaxis: {
//       categories: chartData.categories,
//     },
//   };

//   return (
//     <div>
//       {/* 그래프 렌더링 */}
//       <ReactApexChart options={options} series={chartData.series} type="bar" height={350} />

//       {/* 테이블 렌더링 */}
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Category</th>
//             <th>Review Rank</th>
//             {/* 필요한 헤더를 추가하세요 */}
//           </tr>
//         </thead>
//         <tbody>
//           {bookStats.map((book) => (
//             <tr key={book.id}>
//               <td>{book.id}</td>
//               <td>{book.title}</td>
//               <td>{book.category_name}</td>
//               <td>{book.customer_review_rank}</td>
//               {/* 필요한 데이터 셀을 추가하세요 */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MyComponent;
