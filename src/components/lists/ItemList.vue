<template>
  <section>
    <div v-if="errored" class="errors">Could not load items :(</div>
    <div v-if="loading" class="loading">Loading items..</div>
    <section v-if="noItems">I did not log any items this year 😔</section>
    <section v-else class="item-list">
      <book-list
        v-if="items.allBooks"
        :allBooks="items.allBooks"
        :amountOfBooks="items.allBooks.length"
        :isLoggedIn="isLoggedIn"
      />
      <movie-list
        v-if="items.allMovies"
        :allMovies="items.allMovies"
        :amountOfMovies="items.allMovies.length"
        :isLoggedIn="isLoggedIn"
      />
      <show-list
        v-if="items.allShows"
        :allShows="items.allShows"
        :amountOfShows="items.allShows.length"
        :isLoggedIn="isLoggedIn"
      />
      <album-list
        v-if="items.allAlbums"
        :allAlbums="items.allAlbums"
        :amountOfAlbums="items.allAlbums.length"
        :isLoggedIn="isLoggedIn"
      />
      <game-list
        v-if="items.allGames"
        :allGames="items.allGames"
        :amountOfGames="items.allGames.length"
        :isLoggedIn="isLoggedIn"
      />
    </section>
  </section>
</template>

<script>
import { fetchAllItemsByYear } from '../../utils/crudActions';
import BookList from './BookList';
import MovieList from './MovieList';
import ShowList from './ShowList';
import AlbumList from './AlbumList';
import GameList from './GameList';

export default {
  name: 'ItemList',
  components: {
    BookList,
    MovieList,
    ShowList,
    AlbumList,
    GameList,
  },
  props: {
    yearSelection: {
      type: [String, Number],
      default: 2007,
    },
  },
  data() {
    return {
      items: [],
      loading: true,
      errored: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    noBooks() {
      return this.items && this.items.allBooks < 1;
    },
    noMovies() {
      return this.items && this.items.allMovies < 1;
    },
    noShows() {
      return this.items && this.items.allShows < 1;
    },
    noAlbums() {
      return this.items && this.items.allAlbums < 1;
    },
    noGames() {
      return this.items && this.items.allGames < 1;
    },
    noItems() {
      return (
        this.noShows
        && this.noMovies
        && this.noBooks
        && this.noAlbums
        && this.noGames
      );
    },
  },
  watch: {
    '$route.params.year': function (year) {
      this.fetchItems(year);
    },
  },
  created() {
    this.fetchItems(this.yearSelection);
  },
  methods: {
    fetchItems(chosenYear) {
      fetchAllItemsByYear(chosenYear)
        .then(response => (this.items = response))
        .catch((error) => {
          this.$sentry.captureException(
            new Error(`Could not fetch item list: ${error}`),
          );
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/css/main";

.item-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: $mq-tablet) {
    flex-direction: row;
    justify-content: space-between;
  }

  .book-list,
  .movie-list,
  .tvshow-list,
  .album-list,
  .game-list {
    width: calc(100%);
    @media (min-width: $mq-tablet) {
      width: calc(100% / 5.5);
    }

    ul,
    li,
    ol {
      margin: 0;
      padding: 0;
    }

    li {
      counter-increment: list;
      // list-style-type: none;
      list-style-position: inside;
      position: relative;
      // margin-left: 15px;
      margin-bottom: 15px;
      // padding-left: 10px;
      line-height: 2em;
      border-bottom: 1px solid #e8e8e8;
      // border: 1px solid black;

      // &::before {
      //   color: #22113e;
      //   content: counter(list) ".";
      //   position: absolute;
      //   left: -25px;
      //   text-align: right;
      //   width: 20px;
      // }
    }

    li:last-of-type {
      border-bottom: none;
    }
  }

  .edit-item {
    padding: 5px 0 10px 0;
    font-size: 12px;

    a,
    button {
      border-radius: 0;
      background: white;
      color: black;
      border: 0;
      border-bottom: 1px solid #928dcd;
      display: inline-flex;
      padding: 0.2em;
      font-size: 14px;
      margin-right: 10px;
    }
  }
}

.total {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  background: #e7e6f4;
}

.loading {
  background: #e7e6f4;
  padding: 10px;
  border-radius: 5px;
}
</style>
