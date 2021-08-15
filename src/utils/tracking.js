export function createDateArrayRange(start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(dt.toISOString().split('T')[0]);
  }
  return arr;
}

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