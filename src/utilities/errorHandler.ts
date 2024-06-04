import Cookies from 'js-cookie';

import { logout } from '../services/auth';

// import { logger } from './general';

const errorHandler = (error: any, auth: boolean) => {
  let message = '';

  // logger(error);

  if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') {
    message = 'Network error. Please, check your internet connection.';
  } else if (error?.response) {
    const { response } = error;
    console.log('response', error);
    if (response?.responseCode === 401 || response?.responseCode === 403 || response?.responseCode === 400) {
      message = response?.data?.responseMessage
        || response?.data?.title
        || 'You have not been profiled to use this service.';
      if (auth) {
        Cookies.set('err', message);
        logout();
      }
    } else if (Array.isArray(response?.data?.errors)) {
      message = response?.data?.errors?.join(', ');
    } else if (Array.isArray(response?.data?.Errors)) {
      message = response?.data?.Errors?.join(', ');
    } else {
      message = response.data?.responseMessage
        || response?.responseMessage
        || response?.data?.responseMessage
        || response?.statusText
        || 'Something went wrong. Please, try again';
    }
  } else {
    message = 'Something went wrong. Please, try again.';
  }
  return message.toString();
};

export default errorHandler;
