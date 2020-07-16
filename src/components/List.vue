<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">✖︎</div>
    </div>
    <card
      v-for="(item,index) in cards"
      :body="item.body"
      :key="item.id"
      :cardIndex="index"
      :listIndex="listIndex"
    />
    <card-add :listIndex="listIndex" />
  </div>
</template>

<script>
import CardAdd from "./CardAdd";
import Card from "./Card";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    listIndex: {
      type: Number,
      required: true
    },
    cards: {
      type: Array,
      required: true
    }
  },
  // listIndexをBoardから持ってきて、それをさらにCardAddに送っている(紐つけしている)
  components: {
    CardAdd,
    Card
  },
  computed: {
    totalCardInList() {
      return this.cards.length
    }
  },
  methods: {
    removeList() {
      // popupを表示して、YESならstoreにdispatchするメソッド
      if (confirm("本当にこのリストを削除しますか?")) {
        this.$store.dispatch("removelist", { listIndex: this.listIndex });
        // 第二引数がactionsに渡される
      }
    }
  }
};
</script>
