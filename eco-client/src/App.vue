<template>
	<div id="app">
		
		<Navbar></Navbar>
		<Menubar></Menubar>
		<div class="container">
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

	  }
  },
  components:{
	  Navbar,
	  Menubar
  }
}
</script>

<style>
#app{
  	width: 100%;
    height: auto;
    min-height: 100%;
    min-height: 100vh;
	overflow: hidden;
	background-color: #fafbfc;
}
.container{
	max-width: calc( 100% - 180px);
	width:85%;
	padding: 60px 0 0 0;
	
	float: right;
}
</style>
