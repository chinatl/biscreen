function baofei(arr) {
    var chart = echarts.init(document.getElementById('baofei'));
    var dataAxis = [];
    var data = [];
    function fn(number) {
        var number = number + '';
        return number[4] + number[5] + '.' + number[6] + number[7];
    }
    for (var i = 0; i < arr.length; i++) {
        data[arr.length - i - 1] = arr[i].prem;
        dataAxis[arr.length - i - 1] = fn(arr[i].date);
    }
    console.log(data)
    console.log(dataAxis)
    var yMax = 500;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    option = {
        grid: {
            left: '3%',
            right: '2%',
            bottom: '3%',
            top:"20%",
            containLabel: true
        },
        xAxis: {
            data: dataAxis,
            axisLabel: {
                textStyle: {
                    color: '#43BDEB',
                    fontSize:14
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                // show: false
            },
            // splitLine: {
            //     show: false,
            //     lineStyle: {
            //         color: '#fff', //21005B
            //         width: 1,
            //     }
            // },
        },
        yAxis: {
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(67,90,106,.4)', //21005B
                    width: 1,
                }
            },
            splitNumber:3,
            axisLine: {
                show: false
            },
            axisTick: {
                // show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#43BDEB',
                    fontSize:18
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'line',
                symbolSize: 16,
                backgroundColor:"#00e4ef",
                symbol: "circle",      // 默认是空心圆（中间是白色的），改成实心圆
                itemStyle: {
                    normal: {
                        color: '#00e4ef',
                        borderColor: '#202b33',
                        borderWidth: 5,
                    },
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ],
                    itemStyle:{
                        normal:{
                            color:'#0479c3',
                            fontSize: 16
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0,228,239,.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(4,97,195,.5)'
                        }])
                    }
                },
                data: data,
                label: {
                    normal: {
                        show: true,
                        borderRadius: 20,
                        backgroundColor: '#0479c3',
                        color: '#fff',
                        fontSize: 18,
                        padding: [5, 5, 5, 5],
                        formatter: function (param) {
                            return param.data[3]
                        },
                        position: 'top'
                    }
                }
            }
        ]
    };

    // Enable data zoom when user click bar.
    chart.setOption(option);
}
