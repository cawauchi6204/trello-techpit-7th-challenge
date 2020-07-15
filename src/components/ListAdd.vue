<template>
  <form :class="classList" @submit.prevent="addList">
    <input
      type="text"
      class="text-input"
      v-model="title"
      placeholder="Add new list"
      @focusin="startEditing"
      @focusout="finishEditing"
    />
    <button class="add-button" type="submit" v-if="isEditing || titleExists">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      isEditing: false
    };
  },
  methods: {
    addList() {
      this.$store.dispatch("addlist", { title: this.title });
      this.title = "";
    },
    startEditing() {
      this.isEditing = true;
    },
    finishEditing() {
      this.isEditing = false;
    }
  },
  computed: {
    classList() {
      const classList = ["addlist"];
      if (this.isEditing) {
        classList.push("active");
      }

      if (this.titleExists) {
        classList.push("addable");
      }
      return classList;
    },
    titleExists() {
      return this.title.length > 0;
    }
  }
};
</script>

<style>
</style>
