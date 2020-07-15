<template>
  <div>
    <header>my Trello</header>
    <main>
      <p class="info-line">All: 0 tasks</p>
      <div class="list-index">
        <list
          v-for="(item , index) in lists"
          :key="item.id"
          :title="item.title"
          :listIndex="index"
        />
        <list-add />
      </div>
    </main>
  </div>
</template>

<script>
import ListAdd from "./ListAdd";
import List from "./List";
import { mapState } from "vuex";
export default {
  components: {
    ListAdd,
    List
  },
  computed: {
    ...mapState(["lists"])
    // stateの値が変わるごとに算出される
    //mapStateをすることでstoreにあるlistsを呼び出せるようにしている
    // このようにオブジェクトスプレッド演算子（...の部分です）を使っているのは、computedのローカルのオブジェクトと一緒に定義できるようにするためです。
    //そもそも、computedにはオブジェクトを渡さないといけないルールがあります。 mapStateはこのオブジェクトスプレッド演算子を使わないと、オブジェクトを持ったオブジェクト（ネストされた状態）を返してしまい、computedはmapStateに定義された値を参照できないのです。
  }
};
</script>

<style>
</style>
