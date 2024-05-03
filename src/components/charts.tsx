import {
    ArcElement,
    BarElement,
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface BarChartProps{
    horizontal?: boolean,
    data_1: number[],
    data_2: number[],
    title_1: string,
    title_2: string,
    bg_color1: string,
    bg_color2: string,
    labels?: string[],
}



export const BarChart = ({horizontal=false,
                          data_1,
                          data_2,
                          title_1,
                          title_2,
                          bg_color1,
                          bg_color2,
                          labels = months
}: BarChartProps)=>{

    
    const options:ChartOptions<"bar"> = {
        responsive: true,
        indexAxis: horizontal? "y": "x",
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',
          },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                
                grid: {
                    display: false
                }
            }
        }
      };
      const data:ChartData<"bar", number[],string> = {
        labels,
        datasets: [
          {
            label: title_1,
            data: data_1,
            backgroundColor:bg_color1,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4
          },
          {
            label: title_2,
            data: data_2,
            backgroundColor: bg_color2,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4
          },
        ],
      };
      


    return <Bar options={options} data={data} />;

}

interface DoughnutChartsProps {
    
    labels: string[],
    data: number[],
    backgroundColor: string[],
    cutout?: number | string,
    legends?: boolean,
    offset?: number[]
   
    
   
    

}

export const DoughnutChart = ({
    labels,
    data,
    backgroundColor,
    cutout,
    legends = true,
    offset
}:DoughnutChartsProps) =>{
    const doughnutData: ChartData<"doughnut", number[],string> ={
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                borderWidth: 0,
                offset,
            }
        ]
    };
    const doughnutOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        plugins: {
            legend: {
                display: legends,
                position: 'bottom',
                labels: {
                    padding: 40,
                }
            }
        },
        cutout
    };

    return <Doughnut data={doughnutData} options={doughnutOptions} />
}