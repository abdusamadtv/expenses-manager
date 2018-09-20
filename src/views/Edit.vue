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
        <button @click="editExpense()" class="btn btn-primary">Edit</button>
        <button @click="$router.go(-1)" class="btn btn-info">Back</button>
    </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'Edit',
  components: {
    Datepicker
  },
  computed: {
    expense() {
      let id = this.$route.params.id;
      return this.$store.getters.getExpense(id);
    }
  },
  methods: {
    editExpense() {
      this.$store.commit('edit', this.expense);
      this.$router.push({ name: 'home' });
    }
  }
};
</script>