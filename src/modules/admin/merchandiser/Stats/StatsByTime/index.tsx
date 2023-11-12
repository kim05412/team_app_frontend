import axios from "axios";
import { useState, useEffect } from "react";
import { Hits_URL } from "../../Stats";
import { TableContainer } from "@/modules/admin/book/BookTable/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const initialOptions: ApexOptions = {
  // chart: {
  //   type: 'line',
  //   // 기타 차트 옵션
  // },

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
    type: "category",
    categories: [""],
    labels: {},
  },
  yaxis: {
    title: {
      text: "조회수", // y축 타이틀 설정
    },
    min: 0,
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
  colors: ["#C63A29", "#3384C6", "#24C497", "#F3B922", "#3D100B", "#522462"],
};

const HitsByTime = () => {
  const [hits, setHits] = useState({}); // Map 대신 객체 사용
  const [selectedDate, setSelectedDate] = useState("2023-11-10");
  const [selectedGroup, setSelectedGroupselectedGroup] = useState("ageGroup");
  const [groupOptions] = useState(["ageGroup", "genderGroup", "bookmark"]); // 컬럼 선택 옵션
  // const [hitsData, setHitsData] = useState({});
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState<ApexOptions>(initialOptions);

  useEffect(() => {
    const getHitsData = async () => {
      try {
        const response = await axios.get(`${Hits_URL}/time/user`, {
          params: { date: selectedDate, group: selectedGroup },
        });
        console.log(`사용자 group별 조회수 응답:${response.data}`);
        // response.data의 형태는 { "00:00": { "male": 5, "female": 10, ... }, ... } .
        // setHits(response.data);

        // ApexCharts 시리즈 데이터로 변환
        // x축 시간대 배열 생성 및 정렬
        const timeSlots = Object.keys(response.data).sort();

        // 그룹별 시리즈 데이터
        // const groupNames = Object.keys(response.data);
        // const seriesData = groupNames.map((group) => ({
        //   name: group,
        //   data: timeSlots.map((time) => response.data[group][time] || 0),
        // }));
        // console.log(`사용자 group별 seriesData:${seriesData}`);
        // 그룹별 시리즈 데이터 생성
        const seriesData = Object.keys(response.data).map((group) => ({
          name: group,
          data: timeSlots.map((time) => response.data[group][time] || 0),
        }));

        // 시리즈 데이터 로깅
        console.log("사용자 group별 seriesData:", seriesData);

        // 차트 시리즈 설정
        setSeries(seriesData);

        //x축 옵션 변경
        setOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: { ...prevOptions.xaxis, categories: timeSlots },
        }));
      } catch (error) {
        console.error("Error fetching hits by user attribute:", error);
      }
    };

    getHitsData();
  }, [selectedDate, selectedGroup, groupOptions]);

  return (
    <div>
      <h1>사용자 특성별 ({selectedDate})일 조회수 통계</h1>
      <div>
        <label htmlFor="date-select">날짜 선택:</label>
        <input type="date" id="date-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="attribute-select">사용자 특성 선택:</label>
        <select
          id="attribute-select"
          value={selectedGroup}
          onChange={(e) => setSelectedGroupselectedGroup(e.target.value)}>
          {groupOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <h1>
        ({selectedDate})일 기준 {selectedGroup}별 조회수
      </h1>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" data={hits} height={350} />
      </div>
      <div>
        {/* 테이블로 데이터 표시 */}
        {/* ... */}
      </div>
    </div>
  );
};

export default HitsByTime;
