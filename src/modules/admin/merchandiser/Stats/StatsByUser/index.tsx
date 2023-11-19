import axios from "axios";
import { useState, useEffect, Component } from "react";
import { Hits_URL } from "../../Stats";
import { ButtonContainer, TableContainer } from "@/modules/admin/book/BookTable/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Button } from "@/modules/admin/book/BookTable/styles";
import { useNavigate } from "react-router-dom";
import { BtnBasic } from "@/components/Button";
import { StatsContainer } from "../style";

// 예를 들어, 서버로부터 받을 데이터의 형태가 다음과 같다고 가정합니다.
// {
//     "10:00": {10: {"Male": 1, "Female": 2}, 20: {"Male": 1, "Female": 2} },
//     "11:00": {30: {"Male": 1, "Female": 2}, 40: {"Male": 1, "Female": 2} }
// }
interface TimeSeriesItem {
  maleCount: number;
  femaleCount: number;
  unknownCount: number;
  totalCount: number;
  maxGroup: string; // 또는 적절한 타입
}

type AggregatedCounts = {
  maleCount: number;
  femaleCount: number;
  unknown: number;
};
interface GenderCount {
  Male: number;
  Female: number;
}

interface AgeGroupCounts {
  [ageGroup: string]: GenderCount;
}

interface TimeSlotData {
  [timeSlot: string]: AgeGroupCounts;
}

interface IStat {
  key: string; // 시간대 (00:00, 01:00, ... 23:00)
  value: number; // 해당 시간대의 조회수
}
interface Hits {
  [key: string]: number;
}

interface HitsData {
  [time: string]: {
    [ageGroup: number]: {
      Male: number;
      Female: number;
      Unknown: number;
    };
  };
}

const initialOptions: ApexOptions = {
  stroke: {
    width: [0, 2, 5], // 각각의 시리즈 타입에 따른 선의 두께 설정
    curve: "smooth", // 또는 'straight', 'stepline'
  },
  plotOptions: {
    bar: {
      columnWidth: "50%", // 막대의 너비를 설정합니다.
      // 추가적인 막대 차트 옵션
    },
  },
  fill: {
    opacity: 1, // 차트 내부 채우기의 불투명도 설정
    gradient: {
      inverseColors: false,
      shade: "light",
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 10, 20, 30],
    },
  },
  labels: [], // 레이블은 서버로부터 받은 데이터로 채워집니다.
  markers: {
    size: 0, // 포인트 마커의 크기를 설정합니다.
  },
  xaxis: {
    title: {
      text: "시간",
    },
    type: "category", //timslot
    categories: [""], // 배열
    // labels: {

    // },
  },

  yaxis: {
    title: {
      text: "조회수", // y축 타이틀 설정
    },
    min: 0, // y축 최소값 설정
    tickAmount: 10,
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return `${y.toFixed(0)} 조회수`;
        }
        return y;
      },
    },
  },
  // 데이터 포인트에 호버했을 때 나타나는 툴팁 설정
  legend: {
    position: "top", // 범례의 위치 설정
    horizontalAlign: "right", // 범례의 수평 정렬 설정
    floating: true,
    offsetY: 5,
    offsetX: 5,
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  colors: ["#3384C6", "#C63A29", "#24C497", "#F3B922", "#3D100B", "#522462"],
};
const HitsByAgeGroup = () => {
  const [tableData, setTableData] = useState([]);
  const [hits, setHits] = useState<TimeSlotData>({});
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(1);
  const [ageGroups] = useState([1, 9, 10, 20, 30, 40, 50, 60, 70]);
  const getAgeGroupLabel = (ageGroup) => {
    switch (ageGroup) {
      case 1:
        return "전체";
      case 9:
        return "10대 이하";
      case 70:
        return "70대 이상";
      default:
        return `${ageGroup}대`;
    }
  };
  const getAgeGroupLabelN = (ageGroup) => {
    const ageGroupNumber = Number(ageGroup);
    switch (ageGroupNumber) {
      case 0:
        return "기타";
      case 9:
        return "10대 이하";
      case 70:
        return "70대 이상";
      default:
        return `${ageGroupNumber}대`;
    }
  };
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState<ApexOptions>(initialOptions);

  // 서버 응답을 새로운 연령대 그룹으로 매핑하는 함수
  // const mapAgesToGroups = (hits) => {
  //   const ageGroups = {
  //     "10대 이하": 0,
  //     "10대": 0,
  //     "20-30대": 0,
  //     "40-50대": 0,
  //     "60이상": 0,
  //   };

  //   Object.entries(hits).forEach(([age, count]) => {
  //     if (typeof count === "number") {
  //       const ageInt = parseInt(age);
  //       if (ageInt <= 10) {
  //         ageGroups["10대 이하"] += count;
  //       } else if (ageInt > 10 && ageInt < 20) {
  //         ageGroups["10대"] += count;
  //       } else if (ageInt >= 20 && ageInt < 40) {
  //         ageGroups["20-30대"] += count;
  //       } else if (ageInt >= 40 && ageInt <= 60) {
  //         ageGroups["40-50대"] += count;
  //       } else if (ageInt > 50) {
  //         ageGroups["60이상"] += count;
  //       }
  //     }
  //   });

  //   return ageGroups;
  // };

  useEffect(() => {
    const getHitsData = async () => {
      try {
        const response = await axios.get<HitsData>(`${Hits_URL}/time/age-group`, {
          params: { date: selectedDate, ageGroup: selectedAgeGroup },
        });
        const responseData = response.data;
        console.log(`responseData: ${responseData}`);
        console.log(`responseData: ${JSON.stringify(responseData)}`);

        // 시간대 추출 및 정렬
        const timeCategories = Object.keys(responseData).sort((a, b) => a.localeCompare(b));
        // 그래프 옵션 업데이트
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            ...prevOptions.xaxis,
            categories: timeCategories, // x축 카테고리 설정
          },
        }));

        // 시간대별 연령대별 성별 조회수 계산
        const timeSeriesData: Record<string, TimeSeriesItem> = {};
        //
        Object.entries(responseData).forEach(([time, ageGroups]) => {
          let maleCount = 0;
          let femaleCount = 0;
          let unknownCount = 0;
          let maxGroup = { group: "", count: 0 };

          Object.entries(ageGroups).forEach(([group, counts]) => {
            maleCount += counts.Male || 0;
            femaleCount += counts.Female || 0;
            unknownCount += counts.Unknown || 0;
            let totalCount = (counts.Male || 0) + (counts.Female || 0) + (counts.Unknown || 0);
            if (totalCount > maxGroup.count) {
              maxGroup = { group, count: totalCount };
            }
          });
          // 시간대별 정렬
          timeSeriesData[time] = {
            maleCount,
            femaleCount,
            unknownCount,
            totalCount: maleCount + femaleCount + unknownCount,
            maxGroup: maxGroup.group,
          };
        });
        // 오름차순 정렬
        const sortedTimeSeriesData: Record<string, TimeSeriesItem> = Object.entries(timeSeriesData)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .reduce((obj, [time, data]) => ({ ...obj, [time]: data as TimeSeriesItem }), {});

        setTableData(
          Object.entries(sortedTimeSeriesData).map(([time, data]) => ({
            time,
            maxGroup: data.maxGroup,
            totalCount: data.totalCount,
            unknownCount: data.unknownCount,
            maleCount: data.maleCount,
            femaleCount: data.femaleCount,
          })),
        );

        // 연령별 및 성별별 총 조회수 계산
        const maleSeriesData = [];
        const femaleSeriesData = [];
        const unknownSeriesData = [];
        let totalSeriesData = [];

        Object.keys(sortedTimeSeriesData).forEach((time) => {
          maleSeriesData.push(sortedTimeSeriesData[time].maleCount);
          femaleSeriesData.push(sortedTimeSeriesData[time].femaleCount);
          unknownSeriesData.push(sortedTimeSeriesData[time].unknownCount);
          totalSeriesData.push(sortedTimeSeriesData[time].totalCount);
        });

        setSeries([
          { name: "Male", data: maleSeriesData, type: "column" },
          { name: "Female", data: femaleSeriesData, type: "column" },
          { name: "Total", data: totalSeriesData, type: "line" },
        ]);
      } catch (error) {
        console.error("Error fetching hits by age group:", error);
      }
    };
    getHitsData();
  }, [selectedDate, selectedAgeGroup]);

  const handleAgeGroupChange = (event) => {
    // setSelectedAgeGroup(Number(event.target.value));
    setSelectedAgeGroup(event.target.value);
  };
  const navigate = useNavigate();

  const todayBookPage = () => {
    navigate("today");
  };
  const dailyTable = () => (
    <table>
      <thead>
        <tr>
          <th>시간대</th>
          <th>최다 조회 연령대</th>
          <th>전체</th>
          <th>남성</th>
          <th>여성</th>
          <th>기타</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.time}</td>
            <td>{getAgeGroupLabelN(row.maxGroup)}</td>
            <td>{row.totalCount}</td>
            <td>{row.maleCount}</td>
            <td>{row.femaleCount}</td>
            <td>{row.unknownCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <StatsContainer>
        <button onClick={todayBookPage}>오늘의 책</button>

        <h1>
          {"<"}시간대별 사용자 조회수 통계{">"}
        </h1>

        <div>
          <label htmlFor="date-select">날짜 선택:</label>
          <input type="date" id="date-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="age-group-select">연령대:</label>
          <select id="age-group-select" value={selectedAgeGroup} onChange={handleAgeGroupChange}>
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup} value={ageGroup}>
                {getAgeGroupLabel(ageGroup)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
        <div></div>
        {/* 테이블 렌더링 부분 */}
        <div>
          {/* 기존의 컴포넌트 렌더링 */}
          <TableContainer>{dailyTable()}</TableContainer>
        </div>
      </StatsContainer>
    </div>
  );
};

export default HitsByAgeGroup;