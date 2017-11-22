function pic(data,plan) {
    // body...
var chart = echarts.init(document.getElementById('pic'));
var dataAxis = ['西安',"铜川","宝鸡","咸阳","渭南","汉中","延安","安康","商洛","榆林"];
var yMax = 500;
var dataShadow = [];
var data = [825.5, 566.6, 300.0, 443.4, 590.0, 366.6, 100.0, 132.0, 152.3, 102.5];
var plan = [915.0,623.0,580.0,550.0,1080.0,630.0,280.0,340.0,150.0,900.0];
var gap = [];
var progress = [];
    for (var i = 0; i < data.length; i++) {
      dataShadow.push(0);
      progress.push(Math.round(data[i]/plan[i]*100));
      if (data[i]>plan[i]){
        gap.push(null);
      }
      else {
        gap.push(plan[i]-data[i]);
      }
    }
var option = {
     grid: {
        left: '1%',
        right: '1%',
        bottom: '1%',
        top: '2%',
        containLabel: true
      },
      backgroundColor:'#030A45',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function(params) {
          return params[1].name + ':' + params[1].data;
        }
      }, 
      xAxis: {
        data: dataAxis,
        axisLabel: {
          //inside: true,
          textStyle: {
            color: '#FFF'
          },
          interval: 0,
          formatter: function(params){
            return params.split("").join("");
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
      
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
          splitLine:{
            show:false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
            
          },
          margin:0
        },
      
        boundaryGap: ['0', '5%'],
      },
      series: [
        { // For shadow
          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(0,0,0,0.05)'}
          },
          barGap:'-100%',
          //barCategoryGap:'60%',
          data: dataShadow,
          animation: false
        },
        {
          type: 'bar',
          stack: 'premium',
          slient:false,
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'inside',
          //     top: '1%',
          //     textStyle: {
          //       fontSize: '12px',
          //       color: '#5a5a5a'
          //     }
          //   }
          // },
          itemStyle: {
            normal: {
              color: function(params)
              {
                if(gap[params.dataIndex] === null)
                return new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#ECB0A8'},
                  {offset: 1, color: '#E16757'}
                  ]
                )
                else return new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#99BDF9'},
                  {offset: 1, color: '#4285F4'}
                  ]
                )
              }
              /*color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,[
                  {offset: 0, color: '#99BDF9'},
                  {offset: 1, color: '#4285F4'}
              ])*/
            },
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            }
          },
          animation: false,
          data: data,
          // markLine: {
          //   data: [
          //     {type: 'average', name: '平均值'}
          //   ]
          // }
        },
        {
          type: 'bar',
          stack: 'premium',
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)', barBorderColor: '#99BDF9',barBorderWidth: 1}
          },
          animation: false,
          data: gap
        },
        {
          type: 'bar',
          stack: 'premium',
          color: 'rgba(0,0,0,0)',
          barMaxWidth: 30,
          //barCategoryGap: 0,
          label: {
            normal: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#FFF',
                fontWeight: 'Bold',
                fontSize: 14,
              },
              formatter: function(params){
                return data[params.dataIndex]+"万"+"\n"+Math.round(data[params.dataIndex]/plan[params.dataIndex]*100)+"%"
              }
              }
          },
          data: progress
        }
      ]
    };
    chart.setOption(option);
    chart.setOption(option);
}
