<template>
  <form @submit.prevent>
    <div class="form-group">
      <label for="sum">Sum</label>
      <input id="sum" v-model.number="expense.sum" type="number" class="form-control" placeholder="Expense sum" />
    </div>
    <div class="form-group">
      <label for="date">Date</label>
      <datepicker id="date" v-model="expense.date"></datepicker>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea id="description" v-model="expense.description" class="form-control"></textarea>
    </div>
    <button class="btn btn-primary" @click="addExpense()">Add</button>
    <button class="btn btn-info" @click="$router.go(-1)">Back</button>
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'Add',
  components: {
    Datepicker,
  },
  data() {
    return {
      expense: {
        sum: 0,
        date: new Date(),
        description: '',
      },
    }
  },
  methods: {
    addExpense() {
      let expense = this.expense
      expense.date = expense.date.setHours(0, 0, 0, 0)
      this.$store.dispatch('addExpense', expense)
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
