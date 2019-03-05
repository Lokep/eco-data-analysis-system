<template>
	<div id="app">
		
		<Navbar v-if="hasDefaultComponent"></Navbar>
		<Menubar v-if="hasDefaultComponent"></Menubar>
		<div :class="hasDefaultComponent?'container':'containerWithoutDefault'">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navbar from './components/layout/navbar'
import Menubar from './components/layout/menubar'
export default {
	name: 'App',
	data(){
		return{
			hasDefaultComponent:!this.$route.meta.noDefaultComponent
		}
	},
	components:{
		Navbar,
		Menubar
	}
}
</script>

<style>
#app,.containerWithoutDefault{
	height: auto;
    min-height: 100%;
	min-height: 100vh;
	width: 100%;
	overflow: hidden;
}
#app{
	background-color: #fafbfc;
}
.container{
	max-width: calc( 100% - 180px);
	width:85%;
	padding: 60px 0 0 0;
	float: right;
}
.containerWithoutDefault{
	padding: 0;
}

</style>
