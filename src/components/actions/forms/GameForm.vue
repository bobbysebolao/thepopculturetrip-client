<template>
  <div>
    <div class="form-element">
      <label for="title">
        <span class="form-label">Title</span>
        <input id="title" v-model.trim="game.title" class="form-input" type="text" />
      </label>
    </div>

    <div class="form-element">
      <label for="developer">
        <span class="form-label">Developer</span>
        <input id="developer" v-model.trim="game.developer" class="form-input" type="text" />
      </label>
    </div>

    <div class="form-element">
      <label for="published_year">
        <span class="form-label">Publishing date</span>
        <input
          id="published_year"
          v-model.trim="game.published_year"
          class="form-input"
          type="number"
        />
      </label>
    </div>

    <div class="form-element">
      <select-year :item="game" :type="'game'" />
    </div>

    <div class="form-element">
      <label for="redo">
        <input
          id="redo"
          v-model.trim="game.redo"
          class="form-input form-input-inline"
          type="checkbox"
        />
        <span class="form-label form-label-inline">This was a re-play!</span>
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
import SelectYear from './SelectYear';

export default {
  name: 'GameForm',
  components: { SelectYear },
  props: {
    game: Object,
    errors: Array,
  },
};
</script>
