function pro(arrdata) {
    var data1 = [];
    var data2 = [];
    var data3 = [];
    var json = {
        "610100": "西安",
        "610200": "铜川",
        "610300": "宝鸡",
        "610400": "咸阳",
        "610500": "渭南",
        "610600": "汉中",
        "610700": "延安",
        "612100": "安康",
        "612200": "商洛",
        "612300": "榆林",
    };
    var shiArr = ["西安", "铜川", "宝鸡", "咸阳", "渭南", "汉中", "延安", "安康", "商洛", "榆林"];
    var xdata = [];
    for (var i = 0; i < 10; i++) {
        if (arrdata[i] === undefined) {
            data1[i] = 0;
            data2[i] = 0;
            data3[i] = 0;
            xdata[i] = '';
        } else {
            if (arrdata[i].period3 === undefined) {
                data1[i] = 0;
            } else {
                data1[i] = arrdata[i].period3;
            }
            if (arrdata[i].period5 === undefined) {
                data2[i] = 0;
            } else {
                data2[i] = arrdata[i].period5;
            }
            if (arrdata[i].period10 === undefined) {
                data3[i] = 0;
            } else {
                data3[i] = arrdata[i].period10;
            }
            xdata[i] = json[arrdata[i].branch + '']; //兼容3年数据没有的bug  
        }
    }
    // 下面的代码是为了兼容熟练少2个的情况
    for (var i = 0; i < 10; i++) {
        var index = shiArr.indexOf(xdata[i]);
        if (index !== -1) {
            shiArr.splice(index, 1);
        }
    }
    var newArrData = [];
    for (var i = 0; i < xdata.length; i++) {
        if (xdata[i] !== '') {
            newArrData[newArrData.length] = xdata[i]
        }
    }
    newArrData = newArrData.concat(shiArr);
    data1 = data1.reverse();
    data2 = data2.reverse();
    data3 = data3.reverse();
    newArrData = newArrData.reverse();
    var chart = echarts.init(document.getElementById('pro'));
    let option = {
        grid: {
            left: '0%',
            right: '20%',
            bottom: '8%',
            top: '8%',
            containLabel: true
        },
        xAxis: {
            position:'top',
            axisLabel: {
                textStyle: {
                    color: '#43BDEB',
                    fontSize: 14,

                }
            },
            splitNumber:3,
            axisTick: {
                show: false
            },
            axisLine: {
                 show: false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#241669', //21005B
                    width: 2,
                }
            },
        },
        yAxis: {
            type: 'category',
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#43BDEB',
                    fontSize: 18
                }
            },
            data: newArrData
        },
        series: [{
                barWidth: '35%',
                type: 'bar',
                stack: '总量',
                z: 3,
                itemStyle: {
                    normal: {
                        position: 'right',
                        color: '#0479c3',
                        barBorderRadius: [0, 0, 0, 0],
                    }
                },
                data: data1
                },
            {
                name: '',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        position: 'right',
                        color: '#42b6e6',
                        barBorderRadius: [0, 0, 0, 0],
                    }
                },
                data: data2
                },
            {
                name: '',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        position: 'right',
                        color: '#00e4ef',
                        barBorderRadius: [0, 0, 0, 0],
                    }
                },
                label: {
                    normal: {
                        show: true,
                        formatter: function (param) {
                            var i = param.dataIndex;
                            var num = Number(data1[i]) + Number(data2[i]) + Number(data3[i]); 
                            num = num.toFixed(1)
                            return num
                        },
                        position: 'right',
                        fontSize: 18,
                        marginLeft:5,
                        fontWeight: 'bold'
                    }
                },
                data: data3
                }
            ]
    };
    chart.setOption(option);
}