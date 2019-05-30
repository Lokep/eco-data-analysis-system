<template>
  <div id="temperature" :style="{width:'100%',height:'400px'}"></div>
</template>

<script>
  export default {
    name: "temperature",
    props: {
      airData: Array
    },
    mounted() {
      this.drawLine()
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('temperature'));
        let xData = [], yData = [];
        this.airData && this.airData.map(item => {
          xData.push(item.datetime);
          yData.push(item["maxTemperature"]);
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
            name: '气温'
          }],
          series: [
            {
              name: '气温/时间',
              type: 'bar',
              barWidth: 10,
              data: [...yData],
              itemStyle: {//#409EFF
                color: '#f56000',
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