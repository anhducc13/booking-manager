import { Button, Tag, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';

export const renderColumnsHotels = () => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 70,
    },
    {
      title: 'Tên khách sạn',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      render: (image) => {
        return (
          <Avatar src={image} size={100} />
        )
      },
      dataIndex: 'image',
      align: 'center',
    },
    {
      title: 'Trạng thái',
      render: (text, item) =>
        item.isActive ? (
          <Tag color="green">Hiệu lực</Tag>
        ) : (
          <Tag color="red">Vô hiệu</Tag>
        ),
      key: 'isActive',
      align: 'center',
    },
    {
      title: 'Phòng tiêu chuẩn',
      render: (text, item) => {
        if (item.roomTypes.includes('standard')) {
          return (
            <>
              <div>Giá phòng: {item.priceStandard} VNĐ</div>
              <div>Số lượng phòng: {item.availableRoomStandard}</div>
              <div>Thuế: {item.taxStandard} %</div>
            </>
          )
        }
        return null;
      },
      key: 'isActive',
      align: 'center',
    },
    {
      title: 'Phòng sang trọng',
      render: (text, item) => {
        if (item.roomTypes.includes('deluxe')) {
          return (
            <>
              <div>Giá phòng: {item.priceDeluxe} VNĐ</div>
              <div>Số lượng phòng: {item.availableRoomDeluxe}</div>
              <div>Thuế: {item.taxDeluxe} %</div>
            </>
          )
        }
        return null;
      },
      key: 'isActive',
      align: 'center',
    },
    {
      render: (text, item) => (
        <>
          <Link to={`/hotels/${item.id}`}>
            <Button
              type="primary"
              title="Chi tiết"
            >
              <ZoomInOutlined />
            </Button>
          </Link>
        </>
      ),
      key: 'action',
      align: 'center',
    },
  ];
};
