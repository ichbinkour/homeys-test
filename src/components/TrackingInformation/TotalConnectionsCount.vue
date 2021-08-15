<template>
  <p>
    Nombre total de connexions sur la période donné :
    <b>{{ getTotalConnectionsCount }}</b>
  </p>
</template>

<script>
export default {
  name: 'TotalConnectionsCount',
  props: {
    trackingData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    getTotalConnectionsCount() {
      return this.trackingData.reduce(
        (accumulator, current) => accumulator + current.count,
        0
      );
    },
  },
};
</script>
