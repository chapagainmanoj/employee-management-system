import axios from "axios";
import { URLS } from "./constants";

export const getURL = (name, idx, slug) => {
  let url = URLS[name];
  if (!url) throw Error(`URL with name '${name}' does not exist.`);

  if (idx) {
    url = url.replace(":idx", idx);
  }
  if (slug) {
    url = url.replace(":slug", slug);
  }
  return url;
};

export const request = (config) => {
  return axios({
    url: config.url || getURL(config.name, config.idx, config.slug),
    method: config.method,
    params: config.params,
    data: config.data,
    xsrfCookieName: "csrftoken",
    headers: config.headers,
    xsrfHeaderName: "X-CSRFToken",
    onUploadProgress: config.onUploadProgress,
    onDownloadProgress: config.onDownloadProgress,
  });
};
