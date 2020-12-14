<template>
  <div id="app">
    <button @click="openModal">Open Form</button>
    <Modal :close="closeModal" :show="showModal">
      <AppForm :closeModal="closeModal" />
    </Modal>
  </div>
</template>

<script>

import Modal from './components/Modal';
import AppForm from './components/AppForm';

export default {
  name: 'App',
  data: () => ({
    showModal: true,
  }),
  methods: {
    openModal () {
      this.showModal = true;
    },
    closeModal () {
      this.showModal = false;
    }
  },
  components: {
    Modal,
    AppForm
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
