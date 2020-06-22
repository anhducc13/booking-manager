import { requestServices } from './shared';


const createTour = (params) => {
  return requestServices.mainClient.post(
    '/tours',
    params,
  ).then(res => res.data);
};

export default {
    createTour,
}
