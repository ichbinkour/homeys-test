<template>
  <div>
    <div>
      <p>
        <b>Nombre de connexions par jour</b>
      </p>
      <ChartTrackingPerDay :tracking-data="cleanTrackingData" />
    </div>

    <div class="pt-2">
      <p>
        <b>Nombre de connexions par jour et par route</b>
      </p>
      <ChartTrackingPerPath
        :tracking-data="rawTrackingData"
        :tracking-data-clean="cleanTrackingData"
      />
    </div>
  </div>
</template>

<script>
import ChartTrackingPerDay from '@/components/Charts/ChartTrackingPerDay';
import ChartTrackingPerPath from '@/components/Charts/ChartTrackingPerPath';

export default {
  name: 'ChartTrackingGroup',
  components: {
    ChartTrackingPerDay,
    ChartTrackingPerPath,
  },
  props: {
    cleanTrackingData: {
      type: Array,
      default: () => [],
    },
    rawTrackingData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
