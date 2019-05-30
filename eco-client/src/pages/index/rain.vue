<template>
  <div id="rain" :style="{width:'100%',height:'400px'}"></div>
</template>

<script>
  export default {
    name: "rain",
    props: {
      rainData: Array
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('rain'));
        let xData = [], yData = [];
        this.rainData && this.rainData.map(item => {
          xData.push(item.datetime);
          yData.push(item["1hourRainFall"]);
        });
        myChart.setOption({
          title: {text: ''},
          color: '#409EFF',
          xAxis: [{
            data: [...xData],
            type: 'category',
            name: '时间'
          }],
          yAxis: [{
            type: 'category',
            name: '1h雨量'
          }],
          series: [
            {
              name: '1h雨量/时间',
              type: 'bar',
              barWidth: 10,
              data: [...yData],
              itemStyle: {//#409EFF
                color: '#409EFF',
                barBorderRadius: [10, 10, 0, 0],
              }
            }
          ],
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