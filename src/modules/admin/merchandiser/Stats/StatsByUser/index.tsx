import axios from "axios";
import { useState, useEffect, Component } from "react";
import { Hits_URL } from "../../Stats";
import { TableContainer } from "@/modules/admin/book/BookTable/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IStat {
  key: string; // 시간대 (00:00, 01:00, ... 23:00)
  value: number; // 해당 시간대의 조회수
}
interface Hits {
  [key: string]: number;
}
const initialOptions: ApexOptions = {
  stroke: {
    width: [1, 1, 4], // 각각의 시리즈 타입에 따른 선의 두께 설정
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
  },
  labels: [], // 레이블은 서버로부터 받은 데이터로 채워집니다.
  markers: {
    size: 0, // 포인트 마커의 크기를 설정합니다.
  },
  xaxis: {
    type: "category", //timslot
    categories: [""], // 배열
    labels: {
      // x축 레이블 포맷 설정
    },
  },
  yaxis: {
    title: {
      text: "조회수", // y축 타이틀 설정
    },
    min: 0, // y축 최소값 설정
    // 추가적인 y축 설정
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
    offsetY: -25,
    offsetX: -5,
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
  colors: ["#FF5733", "#3399FF", "#33FF57"],
};
const HitsByAgeGroup = () => {
  const [hits, setHits] = useState({}); // Map 대신 객체 사용
  const [selectedDate, setSelectedDate] = useState("2023-11-10");
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
        const response = await axios.get(`${Hits_URL}/time/age-group`, {
          params: { date: selectedDate, ageGroup: selectedAgeGroup },
        });
        setHits(response.data);
        // 차트 데이터로 변환
        const categories = Object.keys(response.data);
        const data = Object.values(response.data);
        setSeries([{ name: `Age Group ${selectedAgeGroup}`, data }]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: { ...prevOptions.xaxis, categories },
        }));
        // 서버 응답을 새로운 연령대 그룹으로 매핑
        // const mappedHits = mapAgesToGroups(response.data);

        // 매핑된 데이터로 시리즈 업데이트
        //   const categories = Object.keys(mappedHits);
        //   const data = Object.values(mappedHits);
        //   setSeries([{ name: "조회수", data }]);
        //   setOptions((prevOptions) => ({
        //     ...prevOptions,
        //     xaxis: { ...prevOptions.xaxis, categories },
        //   }));
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

  return (
    <div>
      <h1>
        Age Group {selectedAgeGroup} Hits for {selectedDate}
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
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div></div>
      {hits && Object.keys(hits).length > 0 && (
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>시간대</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(hits).map(([time, count]) => (
                <tr key={time}>
                  <td>{time}</td>
                  <td>{typeof count === "number" ? count : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </div>
  );
};
export default HitsByAgeGroup;
