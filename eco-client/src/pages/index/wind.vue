<template>
  <div id="wind" :style="{width:'100%',height:'400px'}"></div>
</template>

<script>
  export default {
    name: "indexWind",
    props: {
      windData: Array
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('wind'));
        let xData = [], yData = [];
        this.windData && this.windData.map(item => {
          xData.push(item.datetime);
          yData.push(item["2minSpeed"]);
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
            name: '风速'
          }],
          series: [
            {
              name: '风速/风向',
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