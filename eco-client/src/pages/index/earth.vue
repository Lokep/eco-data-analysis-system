<template>
  <div id="earth" :style="{width:'100%',height:'400px'}"></div>
</template>

<script>
  export default {
    props: {
      earthData: Array
    },
    data() {
      return {}
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('earth'));
        let xData = [], yData = [];
        this.earthData && this.earthData.map(item => {
          xData.push(item.datetime);
          yData.push(item.surfaceGroundTemperature);
        });
        myChart.setOption({
          title: {text: ''},
          xAxis: {
            data: [...xData],
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
            data: [...yData],
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

<style scoped>

</style>