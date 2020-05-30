import { lazy } from 'react';
import { t } from 'helpers/i18n';

import { HomeOutlined, EditOutlined, FieldBinaryOutlined, ScheduleOutlined } from '@ant-design/icons';

// Home page
const Home = lazy(() => import('views/Home'));

const Page404 = lazy(() => import('views/Page404'));
const HotelAdd = lazy(() => import('views/Hotel/HotelAdd'));
const HotelView = lazy(() => import('views/Hotel/HotelView'));
const HotelList = lazy(() => import('views/Hotel/HotelList'));
const BookingHotelList = lazy(() => import('views/Booking/BookingHotel/BookingHotelList'));

/*
 * If route has children => it's a parent menu
 */
const routes = [
  {
    exact: true,
    path: '/',
    name: t('Home'),
    component: Home,
    icon: HomeOutlined,
  },
  {
    path: '/hotels',
    name: 'Khách sạn',
    icon: FieldBinaryOutlined,
    children: ['/hotels', '/hotels/add'],
  },
  {
    exact: true,
    path: '/hotels',
    name: 'Danh sách khách sạn',
    component: HotelList,
  },
  {
    exact: true,
    path: '/hotels/:id',
    name: 'Chi tiết khách sạn',
    component: HotelView,
  },
  {
    exact: true,
    path: '/hotels/add',
    name: 'Thêm mới khách sạn',
    component: HotelAdd,
  },
  {
    name: 'Booking',
    icon: ScheduleOutlined,
    children: ['/booking-hotels', '/booking-tours'],
  },
  {
    exact: true,
    path: '/booking-hotels',
    name: 'Danh sách đặt khách sạn',
    component: BookingHotelList,
  },
  {
    exact: true,
    path: '/booking-tours',
    name: 'Danh sách đặt tours',
    component: Home,
  },
  {
    exact: true,
    path: '*',
    name: t('404'),
    component: Page404,
  },
];

export default routes;
