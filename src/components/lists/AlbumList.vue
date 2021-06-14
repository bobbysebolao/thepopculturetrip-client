<template>
  <section class="album-list">
    <h1>Albums</h1>
    <ol v-if="allAlbums">
      <li v-for="album in allAlbums" :key="album._id">
        <span :class="$style.artist">{{ album.artist }}</span>,
        <span :class="$style.title">{{ album.title }}</span>

        <span v-if="album.redo" :class="$style.redo">relisten</span>

        <div v-if="isLoggedIn" class="edit-item">
          <RouterLink :to="{ name: 'EditAlbum', params: { id: album._id} }">Edit</RouterLink>
          <button @click.stop="deleteAlbum(album)">Delete</button>
        </div>
      </li>
    </ol>
    <div class="total" v-if="allAlbums.length > 0">Total: {{ amountOfAlbums }}</div>
    <div class="total" v-else>No albums logged this year.</div>
  </section>
</template>

<script>
import { confirmDialog } from '../../utils/helpers';
import { deleteItem } from '../../utils/crudActions';

export default {
  name: 'AlbumList',
  props: {
    isLoggedIn: Boolean,
    allAlbums: {
      type: Array,
      default: () => [],
    },
    amountOfAlbums: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    deleteAlbum(album) {
      confirmDialog('Do you really want to delete this album?')
        .then(() => deleteItem('albums', album._id, this.$router))
        .catch((message) => {
          this.$sentry.captureMessage(`Did not delete album: ${message}`);
        });
    },
  },
};
</script>

<style lang="scss" module>
.artist {
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
