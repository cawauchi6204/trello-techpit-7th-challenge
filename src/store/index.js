import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    lists: savedLists ? JSON.parse(savedLists) : [
      // savedListsが一つでもあればlocalstorageを参照して、なければデフォルトで入っているものを表示する
      {
        title: 'Backlog',
        cards: [
          {
            body: 'English'
          },
          {
            body: 'Mathmatics'
          },
        ]
      },
      {
        title: 'Todo',
        cards: [
          {
            body: 'Science'
          },
        ]
      },
    ]
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] })
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addCardToList(state, payload) {
      state.lists[payload.listIndex].cards.push({ body: payload.body })
      // [listIndex]番目のlistsのcards(配列)にbodyをpushしている
    },
    removeCardFromList(state, payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex, 1)
    }
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addCardToList(context, payload) {
      context.commit('addCardToList', payload)
    },
    removeCardFromList(context, payload) {
      context.commit('removeCardFromList', payload)
    }
  },
  getters: {
    totalCardCount(state) {
      let count = 0;
      state.lists.map(content => count += content.cards.length);
      return count;
    }
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})
// localstorageに格納するにはJSON構造である必要があるのでJSON.strigifyメソッドを使う
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// state.listsに入った後に呼び出される
// firebaseを使う時もこれを使った方が良さそう

export default store
