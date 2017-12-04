function pro(arrdata) {
	var len = arrdata.length;
	if(len>10){
		len = Math.floor(len/2);
	}
	var leftArr = arrdata.slice(0,len)
	var rightArr = arrdata.slice(len);
	if(leftArr.length !== rightArr.length){
		rightArr.pop()
	}
    var data1 = [];
    var data2 = [];
    var data3 = [];
	var xdata = [];

	var rightData1 = [];
	var rightData2 = [];
	var rightData3 = [];
	var rightxData = [];
    for (var i = 0; i < leftArr.length; i++) {
     	data1[i] = leftArr[i].period3;
     	data2[i] = leftArr[i].period5;
     	data3[i] = leftArr[i].period10;
		xdata[i] = branchCode[leftArr[i].branch];
    }   
	for (var i = 0; i < rightArr.length; i++) {
     	rightData1[i] = rightArr[i].period3;
     	rightData2[i] = rightArr[i].period5;
     	rightData3[i] = rightArr[i].period10;
		rightxData[i] = branchCode[rightArr[i].branch];
    }
    // 下面的代码是为了兼容熟练少2个的情况
    data1 = data1.reverse();
    data2 = data2.reverse();
    data3 = data3.reverse();
	xdata = xdata.reverse()
	
	rightData1 = rightData1.reverse();
    rightData2 = rightData2.reverse();
    rightData3 = rightData3.reverse();
	rightxData = rightxData.reverse()

	
	var chart = echarts.init(document.getElementById('pro'));
	var chart1 = echarts.init(document.getElementById('pro1'));
	
    let option = {
        grid: {
            left: '0%',
            right: '22%',
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
            splitNumber:2,
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
            data: xdata
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
	let option1 = {
        grid: {
            left: '20%',
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
            splitNumber:2,
            axisTick: {
                show: false
            },
            axisLine: {
                 show: false
            },
            label:{
				normal:{
					formatter:function(data){
						console.log(data);
					}
				}
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
            data: rightxData
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
                data: rightData1
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
                data: rightData2
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
                            var num = Number(rightData1[i]) + Number(rightData2[i]) + Number(rightData3[i]); 
                            num = num.toFixed(1)
                            return num
                        },
                        position: 'right',
                        fontSize: 18,
                        marginLeft:5,
                        fontWeight: 'bold'
                    }
                },
                data: rightData3
                }
            ]
    };
    chart.setOption(option);
    chart1.setOption(option1);
	data1 = null;
    data2 = null;
    data3 = null;
	xdata = null;
	rightData1 = null;
	rightData2 = null;
	rightData3 = null;
	rightxData = null;
}