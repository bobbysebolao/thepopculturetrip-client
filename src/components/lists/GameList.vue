<template>
  <section class="game-list">
    <h1>Games</h1>
    <ol v-if="allGames">
      <li v-for="game in allGames" :key="game._id">
        <span :class="$style.developer">{{ game.developer }}</span>,
        <span :class="$style.title">{{ game.title }}</span>

        <span v-if="game.redo" :class="$style.redo">reread</span>

        <div v-if="isLoggedIn" class="edit-item">
          <RouterLink :to="{ name: 'EditGame', params: { id: game._id} }">Edit</RouterLink>
          <button @click.stop="deleteGame(game)">Delete</button>
        </div>
      </li>
    </ol>
    <div class="total" v-if="allGames.length > 0">Total: {{ amountOfGames }}</div>
    <div class="total" v-else>No games logged this year.</div>
  </section>
</template>

<script>
import { confirmDialog } from "../../utils/helpers";
import { deleteItem } from "../../utils/crudActions";

export default {
  name: "GameList",
  props: {
    isLoggedIn: Boolean,
    allGames: {
      type: Array,
      default: () => []
    },
    amountOfGames: {
      type: Number,
      default: 0
    }
  },
  methods: {
    deleteGame(game) {
      confirmDialog("Do you really want to delete this game?")
        .then(() => deleteItem("games", game._id, this.$router))
        .catch(message => {
          this.$sentry.captureMessage(`Did not delete game: ${message}`);
        });
    }
  }
};
</script>

<style lang="scss" module>
.developer {
  color: #505050;
}

.title {
  color: #352f6a;
}

.redo {
  font-size: 8px;
  text-transform: uppercase;
  font-weight: 500;
  background: #352f6a;
  color: white;
  border-radius: 12px;
  padding: 3px 5px;
  opacity: 0.5;
  margin-left: 5px;
  vertical-align: middle;
}

.editItem {
  line-height: 1;
}
</style>
