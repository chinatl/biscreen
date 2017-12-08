function pro(arrdata) {
	var len = arrdata.length;
    var data1 = [];
    var data2 = [];
    var data3 = [];
	var xdata = [];
	var leftHtml = [];
    for (var i = 0; i < arrdata.length; i++) {
     	data1[i] = arrdata[i].period3;
     	data2[i] = arrdata[i].period5;
     	data3[i] = arrdata[i].period10;
		xdata[i] = branchCode[arrdata[i].branch];
		var sum = (arrdata[i].period3-0)+(arrdata[i].period5-0)+(arrdata[i].period10-0);
		sum = sum.toFixed(1);
		if(sum > 0){
			leftHtml.push('<li><span>'+branchCode[arrdata[i].branch]+'</span><span>'+sum +'</span></li>')
		}
    } 
	$('#leftToday').html(leftHtml.join(''))

    // 下面的代码是为了兼容熟练少2个的情况
    data1 = data1.reverse();
    data2 = data2.reverse();
    data3 = data3.reverse();
	xdata = xdata.reverse()

	var chart = echarts.init(document.getElementById('pro'));
    let option = {
        grid: {
            left: '0%',
            right: '26%',
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
                barWidth: '18px',
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
	data1 = null;
    data2 = null;
    data3 = null;
	xdata = null;

}