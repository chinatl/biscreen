function pic2(arrdata,  str) {
	console.log(arrdata)
	function compare(property) {
		return function (a, b) {
			var value1 = a[property];
			var value2 = b[property];
			return value2 - value1;
		}
	}
	var objPlan = [
		{
			premPPeriod: 91000,
			premPPeriod10: 24000,
			branch: "610100"
		},
		{
			premPPeriod: 5000,
			premPPeriod10: 2400,
			branch: "610200"
		},
		 {
			premPPeriod: 25000,
			premPPeriod10: 13000,
			branch: "610300"
		},{
			premPPeriod: 31400,
			premPPeriod10: 17000,
			branch: "610400"
		},{
			premPPeriod: 27400,
			premPPeriod10: 15000,
			branch: "610500"
		}, {
			premPPeriod: 18600,
			premPPeriod10: 6800,
			branch: "610600"
		},{
			premPPeriod: 10000,
			premPPeriod10: 3500,
			branch: "610700"
		}, {
			premPPeriod: 12750,
			premPPeriod10: 6400,
			branch: "612100"
		},{
			premPPeriod: 11850,
			premPPeriod10: 5600,
			branch: "612200"
		}, {
			premPPeriod: 25000,
			premPPeriod10: 6800,
			branch: "612300"
		}]
	function filter(arrdata) {
		var xdata = [];
		var data1 = []; //seriers东西
		var newArrData = []; //x轴
		var gap = [];
		var progress = []; //进度
		var dataPlanP = [];
		var dataPlanP10 = [];
		var newArrPlan = [];
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
		var codeArr = [];
		var shiArr = ["西安", "铜川", "宝鸡", "咸阳", "渭南", "汉中", "延安", "安康", "商洛", "榆林"];
		for (var i = 0; i < 10; i++) {
			if(arrdata[i]=== undefined){
			}else {
				xdata[i] = json[arrdata[i].branch + ''];
				codeArr[i] = arrdata[i].branch;
				if(str == '期交'){
					data1[i] = arrdata[i].premPPeriod;
				}else {
					data1[i] = arrdata[i].premPPeriod10;
				}
			}
		}
		for (var a = 0; a < objPlan.length; a++) {
			var x = codeArr.indexOf(objPlan[a].branch);
			if (x !== -1) {
				dataPlanP[x] = objPlan[a].premPPeriod;
				dataPlanP10[x] = objPlan[a].premPPeriod10GE;
			}
		}
		if (str == '期交') {
			newArrPlan = dataPlanP;
		} else {
			newArrPlan = dataPlanP10;
		}
		for (var k = 0; k < data1.length; k++) {
			progress.push(Math.round(data1[k] / newArrPlan[k] * 100));
			if (data1[k] > newArrPlan[k]) {
				gap.push(null);
			} else {
				gap.push(newArrPlan[k] - data1[k]);
			}
		}
		return [xdata, data1, gap, progress,newArrPlan]
	}
	var premPPeriod = arrdata.sort(compare('premPPeriod')); //个险期交
	var premPPeriod10GE = arrdata.sort(compare('premPPeriod10GE')); //十年期
	var chart = echarts.init(document.getElementById('pic'));

	var yMax = 500;
	var arr =[];
	if(str == '期交'){
		arr = filter(premPPeriod);
	}else {
		arr = filter(premPPeriod10GE);
	}
	console.log(arr)
	var xData = arr[0];
	var seriesdata = arr[1];
	var gap = arr[2];
	var progress = arr[3];
	var newarrPlan = arr[4];
	var option = {
		grid: {
			left: '1%',
			right: '1%',
			bottom: '1%',
			top: '2%',
			containLabel: true
		},
		xAxis: {
			data: xData,
			axisLabel: {
				//inside: true,
				textStyle: {
					color: '#43BDEB',
					fontSize: 16
				},
				interval: 0,
				formatter: function (params) {
					return params.split("").join("");
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			position: 'bottom',
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,
			},
			axisLabel: {
				textStyle: {
					color: '#43BDEB',
					fontSize: 14,


				},
				margin: 0
			},

			boundaryGap: ['0', '5%'],
		},
		series: [
			{
				type: 'bar',
				stack: 'premium',
				slient: false,
				itemStyle: {
					normal: {
						color: function (params) {
							if (gap[params.dataIndex] === null)
								return new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [
										{
											offset: 0,
											color: '#ECB0A8'
										},
										{
											offset: 1,
											color: '#E16757'
										}
                  ]
								)
							else return new echarts.graphic.LinearGradient(
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
						}
					},
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 2,
						shadowOffsetY: 2,
					}
				},
				animation: false,
				data: seriesdata,
        },
			{
				type: 'bar',
				stack: 'premium',
				itemStyle: {
					normal: {
						color: 'rgba(0,0,0,0)',
						barBorderColor: '#99BDF9',
						barBorderWidth: 1
					}
				},
				animation: false,
				data: gap
        },
			{
				type: 'bar',
				stack: 'premium',
				color: 'rgba(0,0,0,0)',
				barMaxWidth: 30,
				label: {
					normal: {
						show: true,
						position: 'top',
						textStyle: {
							color: '#FFF',
							fontWeight: 'Bold',
							fontSize: 14,
						},
						formatter: function (params) {
							return seriesdata[params.dataIndex] + "万" + "\n" + (seriesdata[params.dataIndex] / newarrPlan[params.dataIndex] * 100).toFixed(2) + "%"
						}
					}
				},
				data: progress
        }
      ]
	};
	chart.setOption(option);
}
