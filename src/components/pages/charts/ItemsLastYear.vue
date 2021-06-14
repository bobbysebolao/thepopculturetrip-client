<template>
  <div>
    <bar-chart v-if="loaded" :chartdata="chartdata" />
  </div>
</template>

<script>
import BarChart from './types/BarChart.vue';
import { fetchAllItemsByYear } from '../../../utils/statsActions';
import { getCurrentYear } from '../../../utils/helpers';

export default {
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
  }),
  async mounted() {
    this.loaded = false;
    try {
      await fetchAllItemsByYear(getCurrentYear() - 1)
        .then((response) => {
          const {
            books, movies, shows, albums, games,
          } = response;
          this.chartdata = {
            labels: [`${getCurrentYear() - 1}`],
            datasets: [
              {
                label: 'books',
                backgroundColor: '#9656a1',
                data: [books],
              },
              {
                label: 'movies',
                backgroundColor: '#ffc0ad',
                data: [movies],
              },
              {
                label: 'tvshows',
                backgroundColor: '#e78fb3',
                data: [shows],
              },
              {
                label: 'albums',
                backgroundColor: '#e7d78f',
                data: [albums],
              },
              {
                label: 'games',
                backgroundColor: '#DF943A',
                data: [games],
              },
            ],
          };
        })
        .catch((error) => {
          this.$sentry.captureException(
            new Error(`Could not fetch all items by year for stats: ${error}`),
          );
        });
      this.loaded = true;
    } catch (error) {
      this.$sentry.captureException(
        new Error(`Could not render items in last year chart: ${error}`),
      );
    }
  },
};
</script>
