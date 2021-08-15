<template>
  <div>
    <b-container fluid class="pt-3">
      <b-alert v-if="fetchingError" variant="danger" show
        >Une erreur est survenue au moment de récupérer les données.</b-alert
      >

      <div v-else>
        <div v-if="isFetchingData">
          <div class="d-flex justify-content-center mb-3">
            <b-spinner label="Loading..."></b-spinner>
          </div>
        </div>

        <div v-else>
          <div class="pt-2">
            <DateRangePicker @submit="handleOnSubmit" />
          </div>

          <div class="pt-4">
            <TotalConnectionsCount :tracking-data="rawTrackingData" />
          </div>

          <div v-if="dateArrayRange.length > 0" class="pt-4">
            <ChartTrackingGroup
              :clean-tracking-data="cleanTrackingData"
              :raw-tracking-data="rawTrackingData"
            />
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import ChartTrackingGroup from '@/components/Charts/ChartTrackingGroup';
import DateRangePicker from '@/components/Date/DateRangePicker';
import TotalConnectionsCount from '@/components/TrackingInformation/TotalConnectionsCount';

import {
  createDateArrayRange,
  cleanTrackingData,
  rawTrackingData,
} from '../utils/tracking';

export default {
  name: 'TrackingDashboard',
  components: {
    ChartTrackingGroup,
    DateRangePicker,
    TotalConnectionsCount,
  },
  data() {
    return {
      cleanTrackingData: [],
      dateArrayRange: [],
      fetchingError: false,
      isFetchingData: false,
      rawTrackingData: [],
      totalConnections: 0,
      trackingData: [],
    };
  },
  mounted() {
    this.fetchTackingData();
  },
  methods: {
    fetchTackingData() {
      this.isFetchingData = true;

      this.$axios
        .get('/tracking')
        .then((response) => {
          this.trackingData = response.data;
          this.fetchingError = false;
          this.isFetchingData = false;
        })
        .catch(() => {
          this.fetchingError = true;
          this.isFetchingData = false;
        });
    },
    handleOnSubmit({ from, to }) {
      this.dateArrayRange = createDateArrayRange(new Date(from), new Date(to));
      this.cleanTrackingData = cleanTrackingData(
        this.trackingData,
        this.dateArrayRange
      );
      this.rawTrackingData = rawTrackingData(
        this.trackingData,
        this.dateArrayRange
      );
    },
  },
};
</script>
