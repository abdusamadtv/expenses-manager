import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lastID: 0,
    expenses: [],
  },
  getters: {
    latestExpenseDate: state => {
      let dates = state.expenses.map(expense => expense.date)
      return Math.max(...dates)
    },
    oldestExpenseDate: state => {
      let dates = state.expenses.map(expense => expense.date)
      return Math.min(...dates)
    },
    expense: state => id => {
      return state.expenses.find(expense => expense.id === id)
    },
  },
  actions: {
    addExpense({state, commit}, expense) {
      state.expenses.push({...expense, id: state.lastID})
      commit('incrementLastID')
    }
  },
  mutations: {
    editExpense(state, expense) {
      let index = state.expenses.indexOf(expense)
      state.expenses[index] = expense
    },
    deleteExpense(state, expense) {
      let index = state.expenses.indexOf(expense)
      state.expenses.splice(index, 1)
    },
    incrementLastID(state) {
      state.lastID++
    }
  },
  plugins: [createPersistedState()],
})
