<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to ToDo List App "/>
  <ToDoList></ToDoList>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue';
import ToDoList from './components/Core/ToDoList.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    ToDoList
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
