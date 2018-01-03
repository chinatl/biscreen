function pic(arrdata) {
	function compare(property) {
		return function (a, b) {
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
	var arrdata = arrdata.sort(compare('data'));
	var chart = echarts.init(document.getElementById('pic'));
	var len = arrdata.length;

	var yMax = 500;
	var dataShadow = [];

	var data = [];
	var xdata = [];
	var newHtml = [];

	for (var i = 0; i < arrdata.length; i++) {
		xdata[i] = branchCode[arrdata[i].branch];
		data[i] = arrdata[i].data;
		if (arrdata[i].data > 0) {
			newHtml.push('<li><span>' + branchCode[arrdata[i].branch] + '</span><span>' + arrdata[i].data + '</span></li>')
		}
	}
	$('#shownum').html(newHtml.join(''))
	// 下面的代码是为了兼容熟练少2个的情况
	var option = {
		grid: {
			left: '1%',
			right: '2%',
			bottom: '5%',
			top: '7%',
			containLabel: true,
		},
		xAxis: {
			position: 'bottom',
			data: xdata,
			axisLabel: {
				textStyle: {
					color: '#43BDEB',
					fontSize: 18,

				},
				interval: 0,
				//				formatter: function (params) {
				//					return params.split("").join("\n");
				//				}
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
			nameGap: 15,
			show: true,
			splitLine: {
				show: false,
				lineStyle: {
					color: '#241669', //21005B
					width: 2,
				}
			},
			splitNumber: 3,
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
							var i = param.dataIndex;
							var num = data[i];
							num = Math.round(num)
							return num
						},
						position: 'top',
						color: '#43BDEB',
						fontSize: 18

					}
				},
				data: data
        }
    ]
	};
	chart.setOption(option);
}
