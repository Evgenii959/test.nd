<template>
  <div v-if="notes.length">
    <ul class="list">
      <NoteCard
        v-for="(note, index) in notes"
        :key="index"
        :note="note"
        @delete-note="$emit('delete-note', note.id)"
      />
    </ul>
  </div>
</template>

<script>
import NoteCard from './NoteCard.vue';

export default {
  components: {
    NoteCard,
  },
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 40px 0 0;
  gap: 40px;
}
@media (max-width: 1366px) {
  .list {
    gap: 20px;
  }
}
@media (max-width: 360px) {
  .list {
    margin-top: 12px;
  }
}
</style>
