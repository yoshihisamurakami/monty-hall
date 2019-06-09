
var MainComponent = {
  data: function() {
    return {
      comment: '',
      selectedDoorNo: 0,  // ユーザーが選んだドアNo
      doors: []
    }
  },

  template: `
  <div>
    <header-component></header-component>
    <div class="main-component">
      <door-component v-for="door in doors"
        v-bind:key="door.id"
        v-bind:params="door"
        v-on:door-clicked="doorClicked"
      ></door-component>
    </div>
    <br />
    
    <navi-component v-bind:isSelected="isSelected"
       v-on:next-button-clicked="onNextButtonClicked"
       v-on:open-button-clicked="onOpenButtonClicked"
       v-on:reset-button-clicked="onResetButtonClicked">
    </navi-component>

    <div style='text-align: center'>
      {{ comment }}
    </div>
  </div>
  `,
  
  components: {
    'header-component': HeaderComponent,
    'navi-component': NaviComponent,
    'door-component': DoorComponent
  },

  created: function() {
    this.init();
  },

  computed: {
    isSelected: function() {
      return this.selectedDoorNo > 0; 
    }
  },

  methods: {
    init: function() {
      this.initDoors();
      var rightNo = this.getRandomDoorNo();  // 1,2,3
      this.doors[rightNo - 1].right = true;  // 0,1,2
      this.comment = 'どれかドアを選んでください。';
    },

    initDoors: function() {
      this.doors = [
        { id: '1', yagi: false, car: false, selected: false, right: false },
        { id: '2', yagi: false, car: false, selected: false, right: false },
        { id: '3', yagi: false, car: false, selected: false, right: false }
      ];
    },

    getRandomDoorNo: function() {
      return Math.floor( Math.random() * 3 ) + 1;
    },
    
    /**
     * 「次へ」ボタンが押されたときのアクション
     */
    onNextButtonClicked: function() {
      var incorrect = this.getIncorrectNo();
      this.doors[incorrect - 1].yagi = true;
    },

    /**
     * 「次へ」ボタンが押されたタイミングで不正解のドアのドアNoを返す
     * 
     */
    getIncorrectNo: function() {
      while (true) {
        var tmp = this.getRandomDoorNo();
        if (Number(tmp) !== Number(this.selectedDoorNo) && !this.doors[tmp - 1].right){
          return tmp;
        }
      }
    },

    /**
     * 「ドアを開ける」ボタンが押されたときのアクション
     */
    onOpenButtonClicked: function() {
      this.openAllDoors();
      var right = false;
      this.doors.forEach(function(door) {
        if (Number(door.id) === Number(this.selectedDoorNo) && door.right) {
          this.comment = 'おめでとうございます、正解です！';
          this.$store.commit('incrementCorrect');
          right = true;
        }
      }, this);
      if (!right) {
        this.comment = '残念でした！ 不正解です！';
        this.$store.commit('incrementIncorrect');
      }
    },

    openAllDoors: function() {
      this.doors.forEach(function(door) {
        if (door.right) {
          door.car = true;
        } else {
          door.yagi = true;
        }
      });
    },

    onResetButtonClicked: function() {
      this.init();
    },

    doorClicked: function(clickedId) {
      this.comment = '';
      this.doors.forEach(function(door) {
        if (door.id !== clickedId) {
          door.selected = false;
        }
      });
      this.selectedDoorNo = clickedId;
    }
  }
}

new Vue({ 
  el: '#app',
  store,
  components: {
    'main-component': MainComponent
  }
})
