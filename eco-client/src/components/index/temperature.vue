<style>
    #temperature{
        /* margin-top: -20px; */
    }
</style>
<template>
    <div id="temperature" :style="{width:'100%',height:'300px'}">
        
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){
        this.drawLine();
    },
    methods: {
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('temperature'))
            // 绘制图表
            myChart.setOption({
                title: { text: '' },
                // color:['#ffcd31','#93d587','#8e71c7','#CDDB49','#F56C6C','#409EFF'],
                xAxis: {
                    data: [0,5,10,15,20],
                    type:'category',
                    name:'高度',
                    boundaryGap:['5%','5%'],
                    splitNumber:5,
                    nameGap:5
                },
                yAxis: {
                    type:'value',
                    name:'温度',
                    nameGap:15
                },
                series: [{
                    name: '温度',   
                    type: 'line',
                    smooth:true,
                    symbol:'circle',
                    symbolSize:10,
                    data: [-16,24,73,117,88],
                    itemStyle:{
                        color:'#409EFF',
                        barBorderRadius:[10, 10, 10, 10],
                    },
                    areaStyle:{
                        color:{
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
                tooltip:{
                    formatter:`温度：{c} ℃ <br /> 高度：{b} cm`
                },
                legend:{
                    top:30,
                    right:0
                }
            });
        }
    }
}
</script>
