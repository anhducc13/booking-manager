import { Button, Tag, Tooltip, Dropdown, Menu, Modal } from 'antd';
import React from 'react';
import { status as allStatus } from '../../../../constant/hotel';

const renderStatus = (code) => {
  const stt = allStatus.find(x => x.code === code);
  if (stt)
    return stt.name;
  return null;
};

export const renderColumnsTourBookings = (onChangeStatus) => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 70,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status, item) => {
        const menu = (
          <Menu>
            {allStatus.filter(x => x.code !== status).map(el => (
              <Menu.Item onClick={() => onChangeStatus(item.id, el.code)} key={el.code}>{el.name}</Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Tooltip title="Bấm để sửa">
              <Tag color="red">{renderStatus(status)}</Tag>
            </Tooltip>
          </Dropdown>
        )
      },
      align: 'center',
    },
    {
      title: 'Thanh toán',
      key: 'view',
      render: (text, item) => {
        const handleViewPayment = () => {
          if (!item.imageWitness) {
            Modal.info({
              title: 'Thông báo',
              content: (
                <div>Đơn đặt tour chưa thanh toán</div>
              ),
              onOk() {},
            });
            return;
          }
          Modal.info({
            title: 'Thông tin thanh toán',
            content: (
              <div>
                <img width="100%" height="100%" src={item.imageWitness} />
              </div>
            ),
            onOk() {},
          })
        };
        return (
          <Button type="link" onClick={handleViewPayment}>Xem thanh toán</Button>
        )
      },
      align: 'center',
    },
    {
      title: 'Khách đặt tour',
      render: (text, item) => {
        return (
          <>
            <div>Tên: {item.guestName}</div>
            <div>SĐT: {item.guestPhoneNumber}</div>
            <div>Email: {item.guestEmail}</div>
          </>
        )
      },
      key: 'abc',
      align: 'center',
    },
    {
      title: 'Thông tin tour',
      render: (text, item) => {
        return (
          <>
            <div>Tour: {item.tour.name}</div>
            <div>Ngày bắt đầu: {item.startDate}</div>
            <div>Số khách: {item.guests}</div>
          </>
        )
      },
      key: 'def',
      align: 'center',
    },
    {
      title: 'Thông tin giá',
      render: (text, item) => {
        return (
          <>
            <div>Giá tour / 1 người: {item.pricePerParticipant} VNĐ</div>
          </>
        )
      },
      key: 'ghi',
      align: 'center',
    },
  ];
};
