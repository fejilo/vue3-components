import useFetch from '@/composables/useFetch';

const getRequestData = (token, data = {}, files = []) => {
  if (files && files.length > 0) {
    const formData = new FormData();
    files.forEach(file => formData.append('--uploadedFiles--', file));
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    return formData;
  }
  return data;
};

const useApiCalls = userSessionToken => {
  const { fetchData } = useFetch();

  const callToList = async (listURL, { filters = {}, pagination = { currentPage: 0, pageSize: 99999 }, sort = null }) => {
    try {
      const response = await fetchData({
        url: listURL,
        method: 'GET',
        body: {
          ...filters,
          limit: pagination.pageSize,
          sort: sort,
          skip: pagination.pageSize * (pagination.currentPage - 1),
        },
        headers: userSessionToken ? { 'x-access-token': userSessionToken } : {},
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const callToRead = async (readURL, { filters = {} }) => {
    try {
      const response = await fetchData({
        url: readURL,
        method: 'POST',
        body: filters,
        headers: userSessionToken ? { 'x-access-token': userSessionToken } : {},
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const callToCreate = async (createURL, { record = {}, files = [] }) => {
    try {
      const response = await fetchData({
        url: createURL,
        method: 'POST',
        body: getRequestData(record, files),
        headers: userSessionToken ? { 'x-access-token': userSessionToken } : {},
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const callToUpdate = async (updateURL, { record = {}, files = [] }) => {
    try {
      const response = await fetchData({
        url: updateURL,
        method: 'POST',
        body: getRequestData(record, files),
        headers: userSessionToken ? { 'x-access-token': userSessionToken } : {},
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const callToDelete = async (deleteURL, { filters = {} }) => {
    try {
      const response = await fetchData({
        url: deleteURL,
        method: 'POST',
        body: filters,
        headers: userSessionToken ? { 'x-access-token': userSessionToken } : {},
      });

      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    callToList,
    callToRead,
    callToCreate,
    callToUpdate,
    callToDelete,
  };
};

export default useApiCalls;
