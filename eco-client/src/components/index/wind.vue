<style>
    #wind{
        /* margin-top: -20px; */
    }
</style>
<template>
    <div id="wind" :style="{width:'100%',height:'300px'}">
        
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
            let myChart = this.$echarts.init(document.getElementById('wind'))
            // 绘制图表
            myChart.setOption({
                title: { text: '' },
                color:'#409EFF',
                xAxis: {
                    data: [200,211,236,242,245],
                    type:'category',
                    name:'风向',
                    boundaryGap:['5%','5%'],
                    splitNumber:5,
                    nameGap:5
                    // gridIndex:200
                    // min:200
                },
                yAxis: {
                    // data: [8,10,10,10,19],
                    type:'category',
                    name:'风速',
                    nameGap:5
                },
                series: [{
                    name: '风速/风向',
                    type: 'bar',
                    barWidth:10,
                    data: [8,10,10,10,19],
                    itemStyle:{//#409EFF
                        color:'#409EFF',
                        barBorderRadius:[10, 10, 0, 0],
                    }
                }],
                tooltip:{
                    formatter:`风速：{c} <br /> 风向：{b}`
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
