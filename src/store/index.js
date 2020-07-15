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
          {
            body: 'Doing'
          },
        ]
      },
    ]
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards: [] })
    },
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    }
  },
  getters: {},
});

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})
// localstorageに格納するにはJSON構造である必要があるのでJSON.strigifyメソッドを使う
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// state.listsに入った後に呼び出される

export default store
