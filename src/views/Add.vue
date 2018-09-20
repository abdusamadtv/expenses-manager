<template>
    <form @submit.prevent>
        <div class="form-group">
            <label for="sum">Sum</label>
            <input type="number" v-model.number="expense.sum" class="form-control" id="sum" placeholder="Expense sum">
        </div>
        <div class="form-group">
            <label for="date">Date</label>
            <datepicker v-model="expense.date" id="date"></datepicker>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="expense.description" class="form-control"></textarea>
        </div>
        <button @click="addExpense()" class="btn btn-primary">Add</button>
        <button @click="$router.go(-1)" class="btn btn-info">Back</button>
    </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'Add',
  components: {
    Datepicker
  },
  data() {
    return {
      expense: {
        sum: 0,
        date: new Date(),
        description: ''
      }
    };
  },
  methods: {
    addExpense() {
      let expense = this.expense;
      expense.date = expense.date.setHours(0, 0, 0, 0);
      this.$store.commit('add', expense);
      this.$router.push({ name: 'home' });
    }
  }
};
</script>