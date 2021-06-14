<template>
<div class="content">
  <nav>
    <button class="disabled" id="fl-prev">←</button>
    <button id="fl-next" class="">→</button>
  </nav>
  <div id="yearInReviewStory"></div>
</div>
</template>

<script>
import { loadStory } from '../../utils/storyActions';

export default {
  async mounted() {
    try {
      loadStory();
    } catch (e) {
      this.$sentry.captureException(
        new Error(`Could not render the story: ${e}`),
      );
    }
  },
};
</script>
