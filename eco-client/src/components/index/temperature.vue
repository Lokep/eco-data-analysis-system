<template>
  <div id="earth" :style="{width:'100%',height:'300px'}"></div>
</template>
<script>
  export default {
    props: {
      earthInfo: Object
    },
    data() {
      return {}
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('earth'))
        myChart.setOption({
          title: {text: ''},
          xAxis: {
            data: [0, 5, 10, 15, 20],
            type: 'category',
            name: '高度',
            boundaryGap: ['5%', '5%'],
            splitNumber: 5,
            nameGap: 5
          },
          yAxis: {
            type: 'value',
            name: '温度',
            nameGap: 15
          },
          series: [{
            name: '温度',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10,
            data: [this.earthInfo["surfaceGroundTemperature"], this.earthInfo["5cmGroundTemperature"], this.earthInfo["10cmGroundTemperature"], this.earthInfo["15cmGroundTemperature"], this.earthInfo["20cmGroundTemperature"], ],
            itemStyle: {
              color: '#409EFF',
              barBorderRadius: [10, 10, 10, 10],
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#409EFF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }],
          tooltip: {
            formatter: `温度：{c} ℃ <br /> 高度：{b} cm`
          },
          legend: {
            top: 30,
            right: 0
          }
        });
      }
    }
  }
</script>
