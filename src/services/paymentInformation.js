import { requestServices } from './shared';


const createPaymentInformation = (params) => {
  return requestServices.mainClient.post(
    '/payment-informations',
    params,
  ).then(res => res.data);
};

export default {
  createPaymentInformation,
}
