<template>
  <div>
    <div class="form-element">
      <label for="title">
        <span class="form-label">Title</span>
        <input id="title" v-model.trim="album.title" class="form-input" type="text" />
      </label>
    </div>

    <div class="form-element">
      <label for="artist">
        <span class="form-label">Artist</span>
        <input id="artist" v-model.trim="album.artist" class="form-input" type="text" />
      </label>
    </div>

    <div class="form-element">
      <label for="release_year">
        <span class="form-label">Release date</span>
        <input id="release_year" v-model.trim="album.release_year" class="form-input" type="number" />
      </label>
    </div>

    <div class="form-element">
      <select-year :item="album" :type="'album'" />
    </div>

    <div class="form-element">
      <label for="redo">
        <input
          id="redo"
          v-model.trim="album.redo"
          class="form-input form-input-inline"
          type="checkbox"
        />
        <span class="form-label form-label-inline">This was a re-listen!</span>
      </label>
    </div>

    <div class="form-element">
      <button type="submit">Save</button>
    </div>

    <div v-if="errors">
      <div v-for="error of errors" :key="error.index" class="errors">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import SelectYear from "./SelectYear";

export default {
  name: "AlbumForm",
  components: { SelectYear },
  props: {
    album: Object,
    errors: Array
  }
};
</script>
