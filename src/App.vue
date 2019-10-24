<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.vdp-datepicker input {
  height: 38px;
  border: none;
  border-radius: 4px;
  padding: 0px 0 3px 15px;
}

form {
  padding: 15px;
  background-color: #c7c7c7;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  max-width: 400px;
  margin: 0 auto;
  button {
    width: 100%;
    &:first-of-type {
      margin-bottom: 10px;
    }
  }
  .vdp-datepicker input {
    width: 100%;
  }
}
</style>
