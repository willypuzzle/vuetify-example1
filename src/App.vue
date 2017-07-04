<templatex>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</templatex>

<template>
  <main-app></main-app>
</template>

<script>
  import MainApp from './components/Main.vue';
  export default {
    name: 'app',
    components: {
      MainApps
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
