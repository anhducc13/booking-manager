import { requestServices } from './shared';

const getTourBookings = (params) => {
  return requestServices.mainClient.get(
    '/tour-bookings', { params }
  ).then(res => res.data);
};

const updateTourBooking = (bookingId, params) => {
  return requestServices.mainClient.patch(
    `/tour-bookings/${bookingId}`, params
  ).then(res => res.data);
};

export default {
  getTourBookings,
  updateTourBooking
}
