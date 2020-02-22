<template>
  <div>
    <pie-chart v-if="loaded" :chartdata="chartdata" />
  </div>
</template>

<script>
import PieChart from "./types/PieChart.vue";
import { fetchAllTimeItems } from "../../../utils/statsActions";

export default {
  components: { PieChart },
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted() {
    this.loaded = false;
    try {
      await fetchAllTimeItems()
        .then(response => {
          const { books, movies, shows, albums, games } = response;
          this.chartdata = {
            labels: ["books", "movies", "shows", "albums", "games"],
            datasets: [
              {
                data: [books, movies, shows, albums, games],
                backgroundColor: [
                  "#9656a1",
                  "#ffc0ad",
                  "#e78fb3",
                  "#e7d78f",
                  "#DF943A"
                ]
              }
            ]
          };
        })
        .catch(error => {
          this.$sentry.captureException(
            new Error(`Could not fetch all time items for stats: ${error}`)
          );
        });
      this.loaded = true;
    } catch (error) {
      this.$sentry.captureException(
        new Error(`Could not render total items chart: ${error}`)
      );
    }
  }
};
</script>
