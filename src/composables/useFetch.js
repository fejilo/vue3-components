import { ref } from "vue";
import axios from "axios";

class FetchError extends Error {
  constructor(message, errorStatus, error) {
    super(message);
    this.name = "FetchError";
    this.status = errorStatus;
    this.error = error;
  }
}

const useFetch = () => {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);
  const status = ref(null);

  const fetchData = async ({
    url,
    method = "GET", //default get method
    headers = {},
    params = {},
    body = null,
    timeout = 10000, // 10 seconds by default
    delay = 0, // delay
    responseType = "json", // Response type by default json
    onBefore = () => {}, // Hook before request
    onAfter = () => {}, // Hook after request
    onError = () => {}, // Hook on error
  }) => {
    isLoading.value = true;
    error.value = null;
    status.value = null;

    try {
      // run before hook
      onBefore();

      // optional Delay
      if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));

      //make the request with axios
      const response = await axios({
        url,
        method,
        headers,
        params,
        data: body,
        timeout,
        responseType,
      });

      data.value = response.data;
      status.value = response.status;

      // run after hook;
      onAfter(response);

      isLoading.value = false;

      return {
        response: response,
        data: data.value,
        status: status.value,
      };
    } catch (err) {
      error.value = err.response?.data || err.message;
      status.value = err.response?.status || null;
      onError(err);

      isLoading.value = false;

      throw new FetchError(error.value, status.value, error);
    }
  };

  return { data, error, isLoading, status, fetchData };
};

export default useFetch;
