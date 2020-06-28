import React from 'react';
import { browserHistory, objectHelpers } from '../../../../helpers';
import { useBookingToursData} from '../../../../hooks/booking';
import { Card, notification, Table } from 'antd';
import { renderColumnsTourBookings } from './helper';
import { tourBookingService } from '../../../../services';

const { getObjFromQueryString } = objectHelpers;

const BookingTourList = () => {
  const { location } = browserHistory;
  const defaultParams = location.search
    ? getObjFromQueryString(location.search)
    : { page: 1, pageSize: 10 };

  const {
    bookings,
    pagination,
    handleTableChange,
    queryParams,
    setQueryParams,
    fetchingBooking,
  } = useBookingToursData(defaultParams);

  const onChangeStatus = (bookingId, newStatus) => {
    tourBookingService.updateTourBooking(bookingId, { status: newStatus })
      .then(() => {
        notification.success({
          message: 'Thay đổi trạng thái thành công',
        });
        const newQueryParams = { ...queryParams };
        setQueryParams(newQueryParams)
      });
  };

  return (
    <div className="seller-block">
      {/*<Card*/}
        {/*title="Tìm kiếm đặt phòng"*/}
        {/*bodyStyle={{*/}
          {/*padding: 0,*/}
        {/*}}*/}
      {/*>*/}
       {/*Ductt*/}
      {/*</Card>*/}
      <Card
        className="mt-3"
        title="Danh sách đặt phòng"
        extra={
          <span className="total">
            Tổng số đơn đặt tour: {pagination.total || 0}
          </span>
        }
        bodyStyle={{
          padding: '1rem',
        }}
      >
        <Table
          bordered
          columns={renderColumnsTourBookings(onChangeStatus)}
          rowKey="id"
          dataSource={bookings}
          pagination={pagination}
          loading={fetchingBooking}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default BookingTourList;
