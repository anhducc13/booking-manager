import React from 'react';
import { Col, Divider, Form, Input, InputNumber, Row, TimePicker, Select } from 'antd';
import moment from 'moment';
import { provinces } from '../../../constant/province';
import { transportations } from '../../../constant/tour';

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
};

const TourCommonInfo = (props) => {
  const {
    next,
    stickyBottom,
    info,
    setInfo,
  } = props;
  const [form] = Form.useForm();
  const formInitialValues = {
    name: undefined,
    description: undefined,
    cityOrProvince: undefined,
    address: undefined,
    longitude: undefined,
    latitude: undefined,
    checkin: moment('13:00', 'HH:mm'),
    checkout: moment('12:00', 'HH:mm'),
    utilities: [],
    phoneNumber: undefined,
    email: undefined,
  };
  const rules = {
    name: [{ required: true, message: 'Vui lòng nhập tên' }],
    description: [{ required: true, message: 'Vui lòng nhập mô tả' }],
    cityOrProvince: [{ required: true, message: 'Vui lòng chọn tỉnh / thành' }],
    address: [{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }],
    longitude: [{ required: true, message: 'Vui lòng nhập kink độ' }],
    latitude: [{ required: true, message: 'Vui lòng nhập vĩ độ' }],
    checkin: [{ required: true, message: 'Vui lòng nhập thời gian checkin' }],
    checkout: [{ required: true, message: 'Vui lòng nhập thời gian checkout' }],
    utilities: [{ required: true, message: 'Vui lòng chọn một vài dịch vụ' }],
    phoneNumber: [{ required: true, message: 'Vui lòng nhập SĐT' }],
    email: [{ required: true, message: 'Vui lòng nhập email' }],
  };

  const onFinish = (values) => {
    const {
      checkin,
      checkout,
      utilities,
      ...rest
    } = values;
    rest.checkin = checkin.format('HH:mm');
    rest.checkout = checkout.format('HH:mm');
    rest.utilities = utilities.join(',');
    setInfo({ ...info, ...rest });
    next();
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={formInitialValues}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Tên tour" rules={rules.name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="cityOrProvince" label="Tỉnh / Thành phố" rules={rules.cityOrProvince}>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase().trim()) >= 0
              }
            >
              {provinces.map(el => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Địa chỉ chung" rules={rules.name}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="Thời lượng tour (ngày)" rules={rules.address}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Số khách (tối thiểu)" rules={rules.longitude}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số khách (tối đa)" rules={rules.latitude}>
            <InputNumber className="w-100" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="checkin" label="Thời gian checkin" rules={rules.roomTypes}>
            <TimePicker className="w-100" format="HH:mm" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="checkout" label="Thời gian check out" rules={rules.checkin}>
            <TimePicker className="w-100" format="HH:mm" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="utilities" label="Các phương tiện" rules={rules.utilities}>
            <Select
              mode="multiple"
              allowClear
            >
              {transportations.map(el => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="phoneNumber" label="Số điện thoại liên hệ" rules={rules.phoneNumber}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="email" label="Email" rules={rules.email}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {stickyBottom}
    </Form>
  )



};

export default TourCommonInfo;
