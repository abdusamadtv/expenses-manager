import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const nextId = localStorage.getItem('nextId');
const expenses = localStorage.getItem('expenses');

export default new Vuex.Store({
  state: {
    nextId: nextId ? Number(nextId) : 1,
    expenses: expenses ? JSON.parse(expenses) : []
  },
  getters: {
    newestExpenseDate: state => {
      let dates = state.expenses.map(expense => expense.date);
      return Math.max(...dates);
    },
    oldestExpenseDate: state => {
      let dates = state.expenses.map(expense => expense.date);
      return Math.min(...dates);
    },
    getExpense: state => id => {
      return state.expenses.find(expense => expense.id === id);
    }
  },
  mutations: {
    add(state, expense) {
      expense.id = state.nextId;
      state.expenses.push(expense);
      state.nextId++;
      localStorage.setItem('nextId', state.nextId);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    edit(state, expense) {
      let index = state.expenses.indexOf(expense);
      state.expenses[index] = expense;
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    delete(state, expense) {
      let index = state.expenses.indexOf(expense);
      state.expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }
  }
});
