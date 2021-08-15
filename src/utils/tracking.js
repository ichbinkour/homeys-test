
/**
 * It will take a date start and a date end and retrieve all the dates in-between
 * @param {string} start 
 * @param {string} end 
 * @returns An array of dates between two dates
 */
export function createDateArrayRange(start, end) {
  for (
    var arr = [], date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    arr.push(date.toISOString().split('T')[0]);
  }
  return arr;
}

/**
 * @param {Array} trackingData The tracking data we want to process
 * @param {Array} dateArrayRange The array of dates
 * @returns An array of tracking data corresponding to specific dates
 */
export function rawTrackingData(trackingData, dateArrayRange) {
  let rawData = [];

  if (trackingData === undefined) {
    return rawData;
  }

  dateArrayRange.forEach((day) => {
    const filtered = trackingData.filter((v) => {
      return v.date === day;
    });
    
    if (filtered.length > 0) {
      filtered.forEach((item) => {
        rawData.push(item);
      })
    }
  });

  return rawData;
}

/**
 * This method is almost the same as the previous one (rawTrackingData) 
 * except this one gives a better organisation in the array for some specific cases
 * @param {Array} trackingData The tracking data we want to process
 * @param {Array} dateArrayRange The array of dates
 * @returns An array of tracking data corresponding to specific dates
 */
export function cleanTrackingData(trackingData, dateArrayRange) {
  let cleanData = [];

  if (trackingData === undefined) {
    return cleanData;
  }

  dateArrayRange.forEach((day) => {
    const filtered = trackingData.filter((v) => {
      return v.date === day;
    });
    
    if (filtered.length > 0) {
      cleanData.push({day: day, content: filtered});
    }
  });

  return cleanData;
}