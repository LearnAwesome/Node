var panel = {
    init: function(datas) {
        var chartGroup = [];
        datas.forEach(function(data) {
            chartGroup.push( this.createChart(data) );
        }, this);
        return chartGroup;
    },
    createChart: function(data) {
        var cn = data.des;
        var en = data.name;
        var chartData = data.data;
        var dataX = (function() {
            return chartData.map(function(item, index) {
                return index;
            });
        })();
        var dataY = (function() {
            return chartData.map(function(item, index) {
                return item[index];
            });
        })();


        var tickYData = {
            laV1: [0, 1, 1.3, 2],
            lg1v2: [0, 1.7, 2.1, 3],
            lg2v2: [0, 3.5, 4.3, 9],
            laV2: [0, 37, 42, 58],
            VAV2: [0, 13.5, 14, 15],
            APD: [0, 20, 110, 200],
            VSWR: [1, 1, 1.75, 3],
            Pfwd: [0, 485, 510, 600]
        };

        var tickY = tickYData[en];

        var chartDom = $('#'+en).find('.chart');
        var myChart = echarts.init( chartDom.get(0) );
        var option = {
            visualMap: {
                show: false,
                type: 'continuous',
                dimension: 0,
                min: 0,
                max: chartData.length - 1,
                inRange: {
                    color: ['#01c178', '#0bbcd3']
                }
            },
            grid: {
                left: "15%",
                right: 0,
                top: "10%",
                bottom: "20%"
            },
            // tooltip: {
            //     trigger: 'axis'
            // },
            xAxis: [
                {
                    data: dataX,
                    axisTick: {show: true},
                    axisLine: {
                        lineStyle: {
                            color: '#4b8eb8'
                        }
                    },
                    axisLabel: {show: true}
                }
            ],
            yAxis: {
                min: tickY[0],
                max: tickY[3],
                splitNumber: 3,
                splitLine: {show: false},
                splitArea : {show : false},
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#4b8eb8'
                    }
                }
            },
            series: [{
                name: '销量',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: dataY
            }]
        };
        myChart.setOption(option);
        chartDom.parent().append('<span class="topLine">');
        this.resize(myChart);
        return {
            name: en,
            chart: myChart,
            data: {
                x: dataX,
                y: chartData
            }
        };
    },
    update: function(chart, data) {
        var dataX = data.x;
        var dataY = data.y;

        var fakeDataX = Math.round( Math.random() * 12 );
        
        if ( dataY.length > 60 ) {
            dataX.shift();
            dataY.shift();
        }
        dataX.push( dataX[dataX.length - 1] + 1 );
        dataY.push( fakeDataX );

        // console.log(dataX, dataY);

        // console.log(dataX, dataY);

        chart.setOption({
            visualMap: {
                show: false,
                type: 'continuous',
                dimension: 0,
                min: 0,
                max: dataY.length - 1,
                inRange: {
                    color: ['#01c178', '#0bbcd3']
                }
            },
            xAxis: {
                data: dataX
            },
            series: [{
                name:'销量',
                data: dataY
            }]
        });

        function addData(shift) {
            now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
            date.push(now);
            data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
        
            if (shift) {
                date.shift();
                data.shift();
            }
        
            now = new Date(+new Date(now) + oneDay);
        }
    },
    resize: function(chart) {
        window.addEventListener('resize', function() {
            chart.resize();
        }, false);
    }
}