function pic(arrdata) {
    // body...
	console.log(arrdata)
    function compare(property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
        }
    }
    var arrdata = arrdata.sort(compare('data'));
    var chart = echarts.init(document.getElementById('pic'));
    var yMax = 500;
    var dataShadow = [];
    for (var i = 0; i < arrdata.length; i++) {
        dataShadow.push(yMax);
    }
    var data1 = [];
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
            xdata[i] = '';
        } else {
            if (arrdata[i].data === undefined) {
                data1[i] = 0;
            } else {
                data1[i] = arrdata[i].data;
            }
            xdata[i] = json[arrdata[i].branch + ''];
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
    var option = {
        grid: {
            left: '2%',
            right: '2%',
            bottom: '5%',
            top: '5%',
            containLabel: true,
        },
        xAxis: {
			position:'bottom',
            data: newArrData,
            axisLabel: {
                textStyle: {
                    color: '#43BDEB',
                    fontSize: 18,

                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                // show: false
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
            show: true,
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#241669', //21005B
                    width: 2,
                }
            },
            splitNumber:3,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontSize: 14,
                    color: '#43BDEB'
                }
            }
        },
        dataZoom: [
            {
                type: 'inside'
        }
    ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                data: dataShadow,
                animation: false,
                label: {
                    normal: {
                        show: false,
                    }
                },
        },
            {
                type: 'bar',
                barWidth: '40%',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#00e4ef'
                                },
                                {
                                    offset: 0.76,
                                    color: '#0479c3'
                                },
                                {
                                    offset: 1,
                                    color: '#0479c3'
                                }
                        ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#0479c3'
                                },
                                {
                                    offset: 0.24,
                                    color: '#0479c3'
                                },
                                {
                                    offset: 1,
                                    color: '#00e4ef'
                                }
                        ]
                        )
                    }
                },
                label: {
                    normal: {
                        show: true,
                         formatter: function (param) {
                                     var i =param.dataIndex;
                                     var num = data1[i];
                                     num = Math.round(num)
                                     return num 
                                 },
                        position: 'top',
                        color: '#43BDEB',
                        fontSize: 18

                    }
                },
                data: data1
        }
    ]
    };

    var zoomSize = 6;
    chart.setOption(option);
}
