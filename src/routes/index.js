import { lazy } from 'react';
import { t } from 'helpers/i18n';

import { HomeOutlined, EditOutlined, FieldBinaryOutlined, ScheduleOutlined } from '@ant-design/icons';

// Home page
const Home = lazy(() => import('views/Home'));

const TodoList = lazy(() => import('views/Home'));
const TodoAdd = lazy(() => import('views/Home'));
const Page404 = lazy(() => import('views/Page404'));
const HotelAdd = lazy(() => import('views/Hotel/HotelAdd'));

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
    path: '/todos',
    name: t('Todos'),
    icon: EditOutlined,
    children: ['/todos', '/todos/add'],
  },
  {
    exact: true,
    path: '/todos',
    name: t('ListTodos'),
    component: TodoList,
  },
  {
    exact: true,
    path: '/todos/add',
    name: t('AddTodo'),
    component: TodoAdd,
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
    component: TodoList,
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
    component: TodoList,
  },
  {
    exact: true,
    path: '/booking-tours',
    name: 'Danh sách đặt tours',
    component: TodoAdd,
  },
  {
    exact: true,
    path: '*',
    name: t('404'),
    component: Page404,
  },
];

export default routes;
