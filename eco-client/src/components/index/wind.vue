<template>
  <div id="wind" :style="{width:'100%',height:'300px'}"></div>
</template>
<script>
  export default {
    props: {
      windInfo: Object
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('wind'))
        myChart.setOption({
          title: {text: ''},
          color: '#409EFF',
          xAxis: [{
            data: [this.windInfo["2minSpeed"], this.windInfo["10minSpeed"]],
            type: 'category',
            name: '风速'
          }],
          yAxis: [{
            type: 'category',
            name: '风向'
          }],
          series: [
            {
              name: '风速/风向',
              type: 'bar',
              barWidth: 10,
              data: [this.windInfo["2minDirection"], this.windInfo["10minDirection"]],
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
