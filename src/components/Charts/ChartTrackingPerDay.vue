<template>
  <div>
    <div v-if="chartCollection !== null">
      <line-chart
        :chart-data="chartCollection"
        :options="chartOptions"
      ></line-chart>
    </div>
  </div>
</template>

<script>
import LineChart from './LineChart.js';

export default {
  name: 'ChartTrackingPerDay',
  components: {
    LineChart,
  },
  props: {
    trackingData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        maintainAspectRatio: false,
      },
      chartCollection: null,
    };
  },
  mounted() {
    this.fillChart();
  },
  computed: {
    getLabels() {
      return this.trackingData.map((data) => data.day);
    },
    getDaysCounts() {
      return this.trackingData.map((data) => {
        return data.content.reduce((acc, curr) => acc + curr.count, 0);
      });
    },
  },
  methods: {
    fillChart() {
      this.chartCollection = {
        labels: this.getLabels,
        datasets: [
          {
            label: 'Nombre de connexions par jour',
            // By default the background is plain, we give a transparent one to only have the borders
            backgroundColor: 'rgba(0, 0, 255, 0)',
            borderColor: '#47b784',
            data: this.getDaysCounts,
          },
        ],
      };
    },
  },
  watch: {
    trackingData() {
      this.fillChart();
    },
  },
};
</script>
