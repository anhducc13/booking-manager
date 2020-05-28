// @flow
import { localizationHelper, notificationHelper } from 'helpers';
import i18n from 'i18n';

const STATUS_SUCCESS = 'success';
const CONFIRM_EXCEPTION_CODE = 409;

class LogicError extends Error {
  constructor(code, message, extra) {
    super(code);
    this.code = code;
    this.message = message;
    this.extra = extra;
  }
}

const normalizeParams = (params) =>
  Object.entries(params).reduce((accum, param) => {
    const [key, value] = param;
    if (value && value !== 'all') {
      const obj = { ...accum };
      obj[key] = value;
      return obj;
    }
    if (key === 'channel') return { ...accum, channels: value };
    if (typeof value === 'boolean') return { ...accum, [key]: value };
    return accum;
  }, {});

const handleRequestError = (error) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    case 401:
      // logout
      break;
    case 403:
      // access deny
      break;
    case CONFIRM_EXCEPTION_CODE: {
      break;
    }
    default: {
      if (error.response && error.response.data && error.response.data.code) {
        const { data } = error.response;
        const { message, code } = data;
        const title = localizationHelper.localize(code);

        notificationHelper.error(title, message);
      } else {
        notificationHelper.error(
          i18n.t('Error'),
          error.response && error.response.data.message
            ? error.response.data.message
            : i18n.t('ErrorTryAgain'),
        );
      }
    }
  }
};

const handleRequestSuccess = (data) => {
  if (data.code && data.code !== STATUS_SUCCESS) {
    const title = localizationHelper.localize(data.code);
    const { message } = data;
    notificationHelper.error(title, message);
    throw new LogicError(data.code, message, data.extra);
  }
};

export const result = (res) => res.data.result;

export default {
  normalizeParams,
  handleRequestError,
  handleRequestSuccess,
};
