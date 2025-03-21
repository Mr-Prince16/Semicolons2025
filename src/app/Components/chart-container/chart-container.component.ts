import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ApexOptions, NgApexchartsModule } from "ng-apexcharts";




@Component({
  selector: 'app-chart-container',
  standalone: true,
  templateUrl: './chart-container.component.html',
  imports: [NgApexchartsModule, CommonModule]
})
export class ChartContainerComponent implements AfterViewInit {
  chartOptionsPie!: any;
  chartOptionsBar!: any; 
  chartOptionsGantt!: any;
  chartOptionsPyramid!: any;
  chartOptionsPolar!:any;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.initializeCharts();
    }
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return; // Prevent any DOM-related operations on the server
    }
  }

  private initializeCharts() {
    // Pie Chart Configuration (Existing)
    this.chartOptionsPie = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "pie",
        width: 450
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // Bar Chart Configuration (New)
    this.chartOptionsBar = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }
      ],
      chart: {
        type: "bar",
        height: 300,
        width: 550
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
        theme: "dark", // Ensures visibility in dark mode
        style: {
          fontSize: "14px",
          fontFamily: "Arial, sans-serif",
          color: "#000" // Ensures text is visible
        },
        y: {
          formatter: (val: number) => `$ ${val} thousands`
        }
      }
      
      
    };

    this.chartOptionsPolar = {
      series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
      chart: {
        type: "polarArea",
        width: 450
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 0.8
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
     // ✅ Gantt Chart
    //  this.chartOptionsGantt = {
    //   series: [
    //     {
    //       name: "Bob",
    //       data: [
    //         {
    //           x: "Design",
    //           y: [
    //             new Date("2019-03-05").getTime(),
    //             new Date("2019-03-08").getTime()
    //           ]
    //         },
    //         {
    //           x: "Code",
    //           y: [
    //             new Date("2019-03-02").getTime(),
    //             new Date("2019-03-05").getTime()
    //           ]
    //         },
    //         {
    //           x: "Code",
    //           y: [
    //             new Date("2019-03-05").getTime(),
    //             new Date("2019-03-07").getTime()
    //           ]
    //         },
    //         {
    //           x: "Test",
    //           y: [
    //             new Date("2019-03-03").getTime(),
    //             new Date("2019-03-09").getTime()
    //           ]
    //         },
    //         {
    //           x: "Test",
    //           y: [
    //             new Date("2019-03-08").getTime(),
    //             new Date("2019-03-11").getTime()
    //           ]
    //         },
    //         {
    //           x: "Validation",
    //           y: [
    //             new Date("2019-03-11").getTime(),
    //             new Date("2019-03-16").getTime()
    //           ]
    //         },
    //         {
    //           x: "Design",
    //           y: [
    //             new Date("2019-03-01").getTime(),
    //             new Date("2019-03-03").getTime()
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       name: "Joe",
    //       data: [
    //         {
    //           x: "Design",
    //           y: [
    //             new Date("2019-03-02").getTime(),
    //             new Date("2019-03-05").getTime()
    //           ]
    //         },
    //         {
    //           x: "Test",
    //           y: [
    //             new Date("2019-03-06").getTime(),
    //             new Date("2019-03-16").getTime()
    //           ]
    //         },
    //         {
    //           x: "Code",
    //           y: [
    //             new Date("2019-03-03").getTime(),
    //             new Date("2019-03-07").getTime()
    //           ]
    //         },
    //         {
    //           x: "Deployment",
    //           y: [
    //             new Date("2019-03-20").getTime(),
    //             new Date("2019-03-22").getTime()
    //           ]
    //         },
    //         {
    //           x: "Design",
    //           y: [
    //             new Date("2019-03-10").getTime(),
    //             new Date("2019-03-16").getTime()
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       name: "Dan",
    //       data: [
    //         {
    //           x: "Code",
    //           y: [
    //             new Date("2019-03-10").getTime(),
    //             new Date("2019-03-17").getTime()
    //           ]
    //         },
    //         {
    //           x: "Validation",
    //           y: [
    //             new Date("2019-03-05").getTime(),
    //             new Date("2019-03-09").getTime()
    //           ]
    //         }
    //       ]
    //     }
    //   ],
    //   chart: {
    //     height: 450,
    //     type: "rangeBar"
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //       barHeight: "80%"
    //     }
    //   },
    //   xaxis: {
    //     type: "datetime"
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shade: "light",
    //       type: "vertical",
    //       shadeIntensity: 0.25,
    //       gradientToColors: undefined,
    //       inverseColors: true,
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [50, 0, 100, 100]
    //     }
    //   },
    //   legend: {
    //     position: "top",
    //     horizontalAlign: "left"
    //   },
    //   tooltip: {
    //     enabled: true,
    //     theme: "dark", // Change to "light" if needed
    //     style: {
    //       fontSize: "14px",
    //       fontFamily: "Arial, sans-serif",
    //       color: "#000" // Ensures text is visible
    //     },
    //     x: {
    //       formatter: (val: number) => new Date(val).toLocaleDateString() // Converts timestamp to readable date
    //     },
    //     y: {
    //       title: {
    //         formatter: (seriesName: string) => `Task: ${seriesName}`
    //       }
    //     }
    //   }
      
    // };
    // ✅ Pyramid Chart Configuration
    this.chartOptionsPyramid = {
      series: [
        {
          name: "",
          data: [200, 330, 548, 740, 880, 990, 1100, 1380]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          distributed: true,
          barHeight: "80%",
          isFunnel: true
        }
      },
      colors: [
        "#F44F5E",
        "#E55A89",
        "#D863B1",
        "#CA6CD8",
        "#B57BED",
        "#8D95EB",
        "#62ACEA",
        "#4BC3E6"
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val: any, opt: { w: { globals: { labels: { [x: string]: any; }; }; }; dataPointIndex: string | number; }) {
          return opt.w.globals.labels[opt.dataPointIndex];
        },
        dropShadow: {
          enabled: true
        }
      },
      title: {
        text: "Pyramid Chart",
        align: "center"
      },
      xaxis: {
        categories: [
          "Sweets",
          "Processed Foods",
          "Healthy Fats",
          "Meat",
          "Beans & Legumes",
          "Dairy",
          "Fruits & Vegetables",
          "Grains"
        ]
      },
      legend: {
        show: false
      }
    };

    
    
    
  }
  
}
