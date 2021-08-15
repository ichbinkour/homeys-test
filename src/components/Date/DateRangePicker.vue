<template>
  <b-row>
    <b-col>
      <label for="date-from">Date de début</label>
      <b-form-datepicker
        id="date-from"
        v-model="dateRange.from"
        class="mb-2"
        :max="fromMax"
        @input="(event) => (toMin = event)"
      ></b-form-datepicker>
    </b-col>

    <b-col>
      <label for="date-to">Date de fin</label>
      <b-form-datepicker
        id="date-to"
        v-model="dateRange.to"
        class="mb-2"
        :min="toMin"
        @input="(event) => (fromMax = event)"
      ></b-form-datepicker>
    </b-col>

    <b-col cols="2">
      <b-button
        class="submit-button"
        :disabled="!canSearch"
        @click.prevent="$emit('submit', dateRange)"
        >Rechercher</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'DateRangePicker',
  data() {
    return {
      dateRange: {
        from: null,
        to: null,
      },
      toMin: '',
      fromMax: '',
    };
  },
  computed: {
    canSearch() {
      return !!this.dateRange.from && !!this.dateRange.to;
    },
  },
};
</script>

<style scoped>
.submit-button {
  height: 100%;
  width: 100%;
}
</style>
