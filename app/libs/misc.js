export const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));

export const parseRoute = (routes, link = "routes") => {
  return routes
    .map((item) => {
      let nnav = Object.assign({}, item);
      if (Array.isArray(nnav[link])) {
        delete nnav[link];
        return [nnav, ...parseRoute(item[link])];
      } else {
        return item;
      }
    })
    .filter((item) =>
      item.hasOwnProperty("accessible") ? item.accessible : true
    );
};

export const formatDate = (dateStr) => {
  if (!dateStr) {
    return "";
  }
  let d =
    Object.prototype.toString.call(dateStr) === "[object Date]"
      ? dateStr
      : new Date(dateStr);
  let year = d.getFullYear(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate();
  let hr = "" + d.getHours(),
    min = "" + d.getMinutes(),
    sec = "" + d.getSeconds();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hr.length < 2) hr = "0" + hr;
  if (min.length < 2) min = "0" + min;
  if (sec.length < 2) sec = "0" + sec;
  return `${year}-${month}-${day} ${hr}:${min}:${sec}`;
};

export const jsonDateToStr = (jsonDate) => {
  let date = new Date(jsonDate);
  let parsed = date.toString().split(" ");
  let day = parsed.slice(1, 3).join(" ");
  let year = parsed[3];
  let time = parsed[4].split(":").slice(0, 2).join(":");
  return `${day}, ${year} - ${time}`;
};

export const jsonDateToStrWithTime = (jsonDate) => {
  let date = new Date(jsonDate);
  let parsed = date.toString().split(" ");
  let day = parsed.slice(1, 3).join(" ");
  let year = parsed[3];
  let time = parsed[4].split(":").slice(0, 3).join(":");
  let timewithval = timeWithAmPM(time);
  return `${day}, ${year} - ${timewithval}`;
};
