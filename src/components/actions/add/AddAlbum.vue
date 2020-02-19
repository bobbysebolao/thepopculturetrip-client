<template>
  <section class="form-container">
    <h2>Add Album</h2>
    <form v-if="isLoggedIn" @submit="addAlbum">
      <album-form :album="album" :errors="errors" />
    </form>
  </section>
</template>

<script>
import { createItem } from "../../../utils/crudActions";
import AlbumForm from "../forms/AlbumForm";

export default {
  name: "AddAlbum",
  components: { AlbumForm },
  data() {
    return {
      album: {},
      errors: []
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    addAlbum(evt) {
      evt.preventDefault();
      createItem("albums", this.album, this.$router).catch(error =>
        this.errors.push(error.message)
      );
    }
  }
};
</script>
