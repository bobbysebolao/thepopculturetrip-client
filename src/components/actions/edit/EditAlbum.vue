<template>
  <section class="content">
    <section class="form-container">
      <h2>Edit Album</h2>
      <form v-if="isLoggedIn" @submit="editAlbum">
        <album-form :album="album" :errors="errors" />
      </form>
    </section>
  </section>
</template>

<script>
import { fetchSingleItemById, updateItem } from "../../../utils/crudActions";
import AlbumForm from "../forms/AlbumForm";

export default {
  name: "EditAlbum",
  components: { AlbumForm },
  data() {
    return {
      errors: [],
      album: {}
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  created() {
    fetchSingleItemById("albums", this.$route.params.id)
      .then(response => {
        this.album = response;
      })
      .catch(error => {
        this.$sentry.captureException(
          new Error(`Could not fetch album item by id: ${error}`)
        );
      });
  },
  methods: {
    editAlbum(event) {
      event.preventDefault();
      updateItem(
        "albums",
        this.$route.params.id,
        this.album,
        this.$router
      ).catch(error => {
        this.errors.push(error.message);
        this.$sentry.captureException(
          new Error(`Could not edit album: ${error.message}`)
        );
      });
    }
  }
};
</script>
