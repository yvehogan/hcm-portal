import Cookies from 'js-cookie';

import { logger } from '../utilities/general';
import errorHandler from '../utilities/errorHandler';

import endpoints from './endpoints';

import axiosInstance from './api/index';

const handleFetch = async ({
  endpoint = '', extra = null, method = 'GET', auth = false,
  body = null, pQuery = null, param = null, multipart = false,
  responseType = null
}:any = {}) => {
  const headers: any = {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
  };
  let url = endpoints[endpoint] || endpoint;

  if (extra) {
    url += `/${extra}`;
  }

  if (param) {
    url += `/${param}`;
  }

  if (pQuery) {
    let paramsArray = Object.keys(pQuery)
      .map((key) => pQuery[key] && `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`);

    paramsArray = paramsArray.filter((item) => item);
    url += `?${paramsArray.join('&')}`;
  }

  if (auth) {
    const storedData = Cookies.get('data');
    headers.authorization = `bearer ${storedData}`;
  }

  const options: any = {
    url, method, headers
  };

  if (responseType) {
    options.responseType = responseType;
  }

  if (body) {
    options.data = body;
  }

  logger(options);
  return axiosInstance(options)
    .then((response: any) => (responseType === 'blob'
      ? response
      : ({ ...response.data, method, status: response.status })))
    .catch((error: any) => {
      throw new Error(errorHandler(error, auth));
    });
};

export default handleFetch;
