var DoorComponent = {

  props: ['params'],

  template: `
    <div :id="doorId" 
      v-bind:class="doorClass"
      v-on:click="onDoorClicked">
      <span>
        {{ message }}
      </span>
    </div>
  `,
  computed: {
    doorId: function() {
      return 'door-' + this.params.id; 
    },
    doorClass: function() {
      return {
        door: true,
        selected: this.params.selected,
        yagi: this.params.yagi,
        car: this.params.car
      }
    },
    message: function() {
      if (!this.params.yagi && !this.params.car) {
        return '?';
      } else {
        return '';
      }
    }
  },

  methods: {
    onDoorClicked: function() {
      if (this.params.yagi) return;
      if (!this.params.selected) {
        this.params.selected = true;
      }
      this.$emit('door-clicked', this.params.id)
    }
  }
  
}