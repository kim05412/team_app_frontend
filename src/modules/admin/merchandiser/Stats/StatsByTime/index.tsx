import { useEffect, useState } from "react";
import axios from "axios";
import { Hits_URL } from "../../Stats";
import { TableContainer } from "@/modules/admin/book/BookTable/styles";

// 월과 주를 위한 타입 정의
type StatsType = "daily" | "monthly" | "weekly";

//// 시간대별 조회수만
// interface IStat {
//   key: string; // 시간대 (00:00, 01:00, ... 23:00)
//   value: number; // 해당 시간대의 조회수
// }
// 시간대별 통계와 최대 사용자, 도서 정보를 포함하는 인터페이스를 정의합니다.
interface IStat {
  key: string;
  hits: number;
  maxUserInfo?: {
    ageGroup: number | null;
    genderGroup: string | null;
  };
  maxBookInfo?: {
    title: string | null;
    categoryName: string | null;
  };
}

const StatsTable: React.FC = () => {
  // const [selectedDate, setSelectedDate] = useState(""); // 사용자가 선택한 특정 날짜
  // const [stats, setStats] = useState<IStat[]>([]); // 조회수 데이터
  const [selectedDate, setSelectedDate] = useState(""); // 사용자가 선택한 특정 날짜
  const [stats, setStats] = useState<IStat[]>([]); // 조회수 데이터와 최대 사용자, 도서 정보
  // 시간대별 조회수만
  // const fetchStats = async () => {
  //   if (selectedDate) {
  //     try {
  //       // 'daily' 통계 유형과 선택된 날짜로 서버에 요청
  //       const response = await axios.get(`${Hits_URL}/daily`, {
  //         params: { date: selectedDate },
  //       });
  //       // 서버로부터 받은 데이터로 상태를 업데이트
  //       //key,value
  //       setStats(
  //         Object.entries(response.data).map(([key, value]) => ({
  //           key,
  //           value: Number(value),
  //         })),
  //       );
  //     } catch (error) {
  //       console.error("Error fetching stats", error);
  //     }
  //   }
  // };
  // 선택된 날짜에 대한 통계를 가져오는 함수
  const fetchStats = async () => {
    if (selectedDate) {
      try {
        const response = await axios.get<Response>(`${Hits_URL}/daily`, {
          params: { date: selectedDate },
        });
        // 이제 'response.data'는 'ApiResponse' 타입으로 인식됩니다.
        setStats(
          Object.entries(response.data).map(([key, data]) => ({
            key,
            hits: data.hits, // 'hits' 속성이 존재함을 TypeScript가 인식합니다.
            maxUserInfo: {
              ageGroup: data.maxUserInfo?.ageGroup,
              genderGroup: data.maxUserInfo?.genderGroup,
            },
            maxBookInfo: {
              title: data.maxBookInfo?.title,
              categoryName: data.maxBookInfo?.categoryName,
            },
          })),
        );
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    }
  };

  // 선택된 날짜가 변경될 때마다 통계를 가져옵니다.
  useEffect(() => {
    fetchStats();
  }, [selectedDate]);

  return (
    <div>
      {/* 날짜 선택 입력 필드 */}
      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      <button onClick={fetchStats}>통계 가져오기</button>

      {/* 통계 데이터를 표시하는 테이블 */}
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>시간대</th>
              <th>조회수</th>
              <th>가장 많은 조회수를 기록한 사용자 연령대</th>
              <th>가장 많은 조회수를 기록한 사용자 성별</th>
              <th>가장 많은 조회수를 기록한 도서 제목</th>
              <th>가장 많은 조회수를 기록한 도서 카테고리</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.key}>
                <td>{stat.key}</td>
                <td>{stat.hits}</td>
                <td>{stat.maxUserInfo?.ageGroup ?? "정보 없음"}</td>
                <td>{stat.maxUserInfo?.genderGroup ?? "정보 없음"}</td>
                <td>{stat.maxBookInfo?.title ?? "정보 없음"}</td>
                <td>{stat.maxBookInfo?.categoryName ?? "정보 없음"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};
export default StatsTable;
