// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import { useState } from "react";

// interface UserStats {
//   ageGroup: string;
//   male: number;
//   female: number;
// }

// // 서버에서 가져올 데이터의 타입을 정의
// interface BookStats {
//   id: number;
//   title: string;
//   category_name: string;
//   publisher: String;
//   author: String;
// }

// interface ChartData {
//   series: number[];
//   categories: string[];
// }

// interface MyComponentProps {
//   // 여기에 prop 타입을 정의합니다
//   someProp: string;
// }

// interface MyComponentState {
//   // 여기에 state 타입을 정의합니다
// }

// class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
//   constructor(props: MyComponentProps) {
//     super(props);
//     // state 초기화
//     this.state = {
//       // 여기에 state를 정의하세요
//     };
//   }

//   render() {
//     // prop에 접근하려면 this.props.someProp을 사용하세요
//     return <div>{this.props.someProp}</div>;
//   }
// }

// const BookStatsChart: React.FC = () => {
//   const [chartData, setChartData] = useState<UserStats[]>([
//     // 예시 데이터, 실제 구현에서는 API 호출 등을 통해 동적으로 설정해야 함
//     { ageGroup: "10대", male: 40, female: 60 },
//     { ageGroup: "20대", male: 70, female: 130 },
//     { ageGroup: "30대", male: 100, female: 80 },
//     // ... 추가 데이터
//   ]);
//   // ApexCharts의 options 설정
//   const options: ApexOptions = {
//     chart: {
//       type: "bar",
//       height: 350,
//     },
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         columnWidth: "55%",
//         // endingShape: 'rounded',
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["transparent"],
//     },
//     xaxis: {
//       categories: chartData.map((data) => data.ageGroup),
//     },
//     yaxis: {
//       title: {
//         text: "조회수 (회)",
//       },
//     },
//     fill: {
//       opacity: 1,
//     },
//     tooltip: {
//       y: {
//         formatter: function (val) {
//           return val + "회 조회";
//         },
//       },
//     },
//     legend: {
//       position: "top",
//       horizontalAlign: "left",
//       offsetX: 40,
//     },
//   };

//   // ApexCharts의 series 설정
//   const series = [
//     {
//       name: "남성",
//       data: chartData.map((data) => data.male),
//     },
//     {
//       name: "여성",
//       data: chartData.map((data) => data.female),
//     },
//   ];

//   return (
//     <div id="chart">
//       <ReactApexChart options={options} series={series} type="bar" height={350} />
//     </div>
//   );
// };

// export default BookStatsChart;
