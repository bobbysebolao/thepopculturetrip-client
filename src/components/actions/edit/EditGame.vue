<template>
  <section class="content">
    <section class="form-container">
      <h2>Edit Game</h2>
      <form v-if="isLoggedIn" @submit="editGame">
        <game-form :game="game" :errors="errors" />
      </form>
    </section>
  </section>
</template>

<script>
import { fetchSingleItemById, updateItem } from '../../../utils/crudActions';
import GameForm from '../forms/GameForm';

export default {
  name: 'EditGame',
  components: { GameForm },
  data() {
    return {
      errors: [],
      game: {},
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  created() {
    fetchSingleItemById('games', this.$route.params.id)
      .then((response) => {
        this.game = response;
      })
      .catch((error) => {
        this.$sentry.captureException(
          new Error(`Could not fetch game item by id: ${error}`),
        );
      });
  },
  methods: {
    editGame(event) {
      event.preventDefault();
      updateItem('games', this.$route.params.id, this.game, this.$router).catch(
        (error) => {
          this.errors.push(error.message);
          this.$sentry.captureException(
            new Error(`Could not edit game: ${error.message}`),
          );
        },
      );
    },
  },
};
</script>
