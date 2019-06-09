var NaviComponent = {
  props: {
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      step: 1,
      message: '次へ'
    }
  },
  template: `
    <div class="navi-component">
      <button class="navi-button" 
        v-if="isSelected"
        v-on:click="onClick">
       {{ message }}
      </button>
    </div>
  `,
  methods: {
    onClick: function() {
      this.step++;
      if (this.step === 1) {
        this.$emit('reset-button-clicked');
        this.message = '次へ';
      } else if (this.step === 2) {
        this.$emit('next-button-clicked');
        this.message = 'ドアを開ける';
      } else if (this.step === 3) {
        this.$emit('open-button-clicked');
        this.step = 0;
        this.message = 'リセット';
      }
    }
  }
}
