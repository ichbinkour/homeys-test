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

import { createRandomRgb } from '../../utils/charts';

export default {
  name: 'ChartTrackingPerPath',
  components: {
    LineChart,
  },
  props: {
    trackingData: {
      type: Array,
      default: () => [],
    },
    trackingDataClean: {
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
      uniquePaths: [],
    };
  },
  mounted() {
    this.fillChart();
  },
  computed: {
    getDatasets() {
      return this.uniquePaths.map((path) => {
        return {
          label: path,
          data: this.getDataFromPath(path),
          // By default the background is plain, we give a transparent one to only have the borders
          backgroundColor: 'rgba(0, 0, 255, 0)',
          borderColor: createRandomRgb(),
        };
      });
    },
    getLabels() {
      return this.trackingDataClean.map((data) => data.day);
    },
  },
  methods: {
    fillChart() {
      this.uniquePaths = [
        // This will give us the unique paths of the array
        ...new Set(this.trackingData.map((item) => item.path)),
      ];

      this.chartCollection = {
        labels: this.getLabels,
        datasets: this.getDatasets,
      };
    },
    getDataFromPath(path) {
      let result = [];

      result = this.trackingData.filter((data) => {
        return data.path === path;
      });

      return result.map((res) => res.count);
    },
  },
  watch: {
    trackingData() {
      this.fillChart();
    },
  },
};
</script>
