<template>
  <section class="form-container">
    <h2>Add Game</h2>
    <form v-if="isLoggedIn" @submit="addGame">
      <game-form :game="game" :errors="errors" />
    </form>
  </section>
</template>

<script>
import { createItem } from "../../../utils/crudActions";
import GameForm from "../forms/GameForm";

export default {
  name: "AddGame",
  components: { GameForm },
  data() {
    return {
      game: {},
      errors: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    addGame(evt) {
      evt.preventDefault();
      createItem("games", this.game, this.$router).catch(error =>
        this.errors.push(error.message)
      );
    }
  }
};
</script>
