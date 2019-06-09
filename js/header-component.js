var HeaderComponent = {
  template: `
    <div class="header-component">
      正解数: {{ correctCount }},
      不正解数: {{ incorrectCount }}, 
      正解率: {{ correctRate }} %
    </div>
  `,
  computed: {
    correctCount: function() {
      return this.$store.state.correctCount;
    },
    incorrectCount: function() {
      return this.$store.state.incorrectCount;
    },
    total: function() {
      return this.correctCount + this.incorrectCount;
    },
    correctRate: function() {
      if (this.correctCount + this.incorrectCount === 0) {
        return 0;
      }
      return Math.round((this.correctCount / this.total) * 1000) / 10;
    }
  }
}
