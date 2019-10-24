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
    <button class="btn btn-primary" @click="editExpense()">Edit</button>
    <button class="btn btn-info" @click="$router.go(-1)">Back</button>
  </form>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'Edit',
  components: {
    Datepicker,
  },
  computed: {
    expense() {
      let id = this.$route.params.id
      return this.$store.getters.getExpense(id)
    },
  },
  methods: {
    editExpense() {
      this.$store.commit('edit', this.expense)
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
