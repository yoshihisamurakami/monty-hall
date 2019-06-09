const store = new Vuex.Store({
  state: {
    correctCount: 0,
    incorrectCount: 0
  },
  mutations: {
    incrementCorrect (state) {
      state.correctCount++;
    },
    incrementIncorrect (state) {
      state.incorrectCount++;
    }
  }
});