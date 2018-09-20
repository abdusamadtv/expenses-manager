<template>
    <div>
        <div class="row header">
            <div v-if="filteredExpenses.length" class="col-md-6 sort-block">
                <div class="form-group row">
                    <div class="col-md-12">
                        <label for="sort-by" class="col-form-label form-title">Sort by:</label>
                    </div>
                    <div class="col">
                        <select v-model="sortBy" id="sort-by" class="custom-select">
                            <option v-for="(sortOption, index) in sortOptions" :key="index" :value="sortOption.value">
                                {{sortOption.name}}
                            </option>
                        </select>
                    </div>
                    <div class="col">
                        <button @click="sortExpenses()" class="btn btn-info">{{sortOrder}}</button>
                    </div>
                </div>
            </div>
            <div v-if="filteredExpenses.length" class="col-md-6">
                <div class="row">
                    <div class="col">
                        <p class="form-title">
                            Date from:
                        </p>
                        <datepicker v-model="dateFrom" :disabledDates="disabledDates"></datepicker>
                    </div>
                    <div class="col">
                        <p class="form-title">
                            Date to:
                        </p>
                        <datepicker v-model="dateTo" :disabledDates="disabledDates"></datepicker>
                    </div>
                </div>
            </div>
            <div class="col-md-12 add-block">
                <router-link to="/add" class="btn btn-primary add-button">Add expense</router-link>
            </div>
        </div>
        <div class="row expenses">
            <div v-if="filteredExpenses.length" class="table-responsive">
                <p>
                    <span class="total-sum">Total sum:</span> ${{totalSum}}
                </p>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Sum</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(expense, index) in filteredExpenses" :key="index">
                            <td>${{expense.sum}}</td>
                            <td>{{formatDate(expense.date)}}</td>
                            <td>{{expense.description}}</td>
                            <td class="actions">
                                <button @click="editExpense(expense.id)" class="btn btn-sm btn-warning edit-button">Edit</button>
                                <button @click="deleteExpense(expense)" class="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p v-else>Sorry, but there are no expenses yet</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'Home',
  components: {
    Datepicker
  },
  data() {
    return {
      sortOrder: 'Ascending',
      sortBy: 'sum',
      sortOptions: [{ name: 'Date', value: 'date' }, { name: 'Sum', value: 'sum' }],
      dateFrom: new Date(this.$store.getters.oldestExpenseDate),
      dateTo: new Date(this.$store.getters.newestExpenseDate)
    };
  },
  computed: {
    totalSum() {
      return this.filteredExpenses.reduce((accum, expense) => {
        return accum + expense.sum;
      }, 0);
    },
    disabledDates() {
      return {
        to: new Date(this.$store.getters.oldestExpenseDate),
        from: new Date(this.$store.getters.newestExpenseDate)
      };
    },
    filteredExpenses() {
      let minDate = this.dateFrom;
      let maxDate = this.dateTo;
      return this.expenses.filter(expense => expense.date >= minDate && expense.date <= maxDate);
    },
    expenses() {
      return this.$store.state.expenses;
    }
  },
  watch: {
    sortBy() {
      this.sortExpenses();
    }
  },
  methods: {
    sortExpenses() {
      this.sortOrder = this.sortOrder === 'Ascending' ? 'Descending' : 'Ascending';
      return this.filteredExpenses.sort((curr, prev) => {
        return this.sortOrder === 'Ascending'
          ? curr[this.sortBy] - prev[this.sortBy]
          : prev[this.sortBy] - curr[this.sortBy];
      });
    },
    formatDate(date) {
      return moment(date).format('D MMMM, YYYY');
    },
    editExpense(id) {
      this.$router.push({ name: 'edit', params: { id: id } });
    },
    deleteExpense(expense) {
      this.$store.commit('delete', expense);
    }
  }
};
</script>

<style lang="scss">
.header {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 15px;
  background-color: #f2f2f2;
  .sort-block {
    .form-group {
      margin-bottom: 0;
    }
  }
  .form-title {
    padding: 7px 0;
    font-weight: 600;
    margin-bottom: 0;
  }
  .add-block {
    margin-top: 20px;
    text-align: center;
  }
}

.expenses {
  margin-top: 20px;
  justify-content: center;
  table {
    .actions {
      max-width: 50px;
      .edit-button {
        width: 58px;
        margin-right: 10px;
      }
    }
  }
}

.total-sum {
  font-weight: 600;
}

@media (max-width: 480px) {
  .add-button {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .actions {
    button {
      display: block;
      margin: 0 auto;
    }
    .edit-button {
      margin-right: auto !important;
      margin-bottom: 5px;
    }
  }
}
</style>
