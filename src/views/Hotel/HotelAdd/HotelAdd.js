import React from 'react';
import { Form, Card, Input } from 'antd';
import moment from 'moment';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const HotelAdd = () => {
  const [form] = Form.useForm();
  const formInitialValues = {
    cityOrProvince: undefined,
    checkin: moment('13:00', 'HH:mm'),
    checkout: moment('12:08', 'HH:mm'),
    roomTypes: ['standard', 'deluxe'],
    utilities: [],
    status: true,
  }

  return (
    <Card
      title="Tạo mới khách sạn"
    >
      <Form
        {...formItemLayout}
        form={form}
        initialValues={formInitialValues}
      >
        <Form.Item name="name" label="Tên khách sạn">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả khách sạn">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Card>
  )
};

export default HotelAdd;