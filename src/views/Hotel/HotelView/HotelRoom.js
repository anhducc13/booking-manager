import React, { useState } from 'react';
import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  TimePicker,
  Select,
  Upload,
  Button,
  Switch,
  Card,
  notification,
} from 'antd';
import { roomTypes as roomTypeSelect } from '../../../constant/hotel';
import { uploadImage } from '../../../services/imgur';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { hotelService } from '../../../services';

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  },
};

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const HotelRoom = (props) => {
  const {
    hotel,
    onFetchHotel,
  } = props;

  const {
    roomTypes,
    isActive,
    image,
    priceStandard,
    availableRoomStandard,
    taxStandard,
    imageStandard,
    priceDeluxe,
    availableRoomDeluxe,
    taxDeluxe,
    imageDeluxe,
  } = hotel;

  const [form] = Form.useForm();
  const [showStandard, setShowStandard] = useState(roomTypes.includes('standard'));
  const [showDeluxe, setShowDeluxe] = useState(roomTypes.includes('deluxe'));
  const [countImage, setCountImage] = useState(1);
  const [countImageStandard, setCountImageStandard] = useState(imageStandard ? 1 : 0);
  const [countImageDeluxe, setCountImageDeluxe] = useState(imageDeluxe ? 1 : 0);

  const formInitialValues = {
    roomTypes,
    isActive,
    priceStandard,
    availableRoomStandard,
    taxStandard,
    priceDeluxe,
    availableRoomDeluxe,
    taxDeluxe,
    image: [
      {
        uid: image,
        url: image,
        name: image,
        status: 'done',
        thumbUrl: image,
      }
    ],
    imageStandard: imageStandard ? ([
      {
        uid: imageStandard,
        url: imageStandard,
        name: imageStandard,
        status: 'done',
        thumbUrl: imageStandard,
      }
    ]) : undefined,
    imageDeluxe: imageDeluxe ? ([
      {
        uid: imageStandard,
        url: imageStandard,
        name: imageStandard,
        status: 'done',
        thumbUrl: imageStandard,
      }
    ]) : undefined,
  };
  const rules = {
    roomTypes: [{ required: true, message: 'Vui lòng chọn các loại phòng' }],
    image: [{ required: true, message: 'Vui lòng chọn 1 ảnh' }],
    priceStandard: [{ required: showStandard, message: 'Vui lòng nhập giá' }],
    availableRoomStandard: [{ required: showStandard, message: 'Vui lòng nhập số lượng phòng' }],
    taxStandard: [{ required: showStandard, message: 'Vui lòng nhập thuế' }],
    imageStandard: [{ required: showStandard, message: 'Vui lòng chọn 1 ảnh' }],
    priceDeluxe: [{ required: showDeluxe, message: 'Vui lòng nhập giá' }],
    availableRoomDeluxe: [{ required: showDeluxe, message: 'Vui lòng nhập số lượng phòng' }],
    taxDeluxe: [{ required: showDeluxe, message: 'Vui lòng nhập thuế' }],
    imageDeluxe: [{ required: showDeluxe, message: 'Vui lòng chọn 1 ảnh' }],
  };

  const onFinish = (values) => {
    const {
      image,
      roomTypes,
      priceStandard,
      availableRoomStandard,
      taxStandard,
      imageStandard,
      priceDeluxe,
      availableRoomDeluxe,
      taxDeluxe,
      imageDeluxe,
      ...rest
    } = values;
    rest.roomTypes = roomTypes.join(',');
    rest.image = image[0].response ? image[0].response.url : image[0].url;
    if (roomTypes.includes('standard')) {
      rest.priceStandard = priceStandard;
      rest.availableRoomStandard = availableRoomStandard;
      rest.taxStandard = taxStandard;
      rest.imageStandard = imageStandard[0].response ? imageStandard[0].response.url : imageStandard[0].url;
    }
    if (roomTypes.includes('deluxe')) {
      rest.priceDeluxe = priceDeluxe;
      rest.availableRoomDeluxe = availableRoomDeluxe;
      rest.taxDeluxe = taxDeluxe;
      rest.imageDeluxe = imageDeluxe[0].response ? imageDeluxe[0].response.url : imageDeluxe[0].url;
    }
    if (!roomTypes.includes('standard')) {
      rest.priceStandard = null;
      rest.availableRoomStandard = null;
      rest.taxStandard = null;
      rest.imageStandard = null;
    }
    if (!roomTypes.includes('deluxe')) {
      rest.priceDeluxe = null;
      rest.availableRoomDeluxe = null;
      rest.taxDeluxe = null;
      rest.imageDeluxe = null;
    }
    hotelService.updateHotel(hotel.id, rest)
      .then(() => {
        notification.success({
          message: 'Chỉnh sửa thành công',
        });
        onFetchHotel();
      })
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
        <Col span={24}>
          <Form.Item
            name="image"
            label="Hình ảnh khách sạn"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={rules.image}
          >
            <Upload
              onRemove={() => setCountImage(0)}
              customRequest={options => {
                uploadImage(options.file)
                  .then(res => {
                    setCountImage(1);
                    options.onSuccess(res, res);
                  })
                  .catch((err) => {
                    notification.error({
                      message: 'Tải lỗi, vui lòng thử lại',
                    });
                    setCountImage(0);
                    form.setFieldsValue({
                      image: [],
                    });
                    options.onError(err);
                  });
              }}
              listType="picture"
            >
              {countImage === 0 && (
                <Button>
                  <UploadOutlined /> Tải ảnh lên
                </Button>
              )}
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="roomTypes" label="Các loại phòng">
            <Select
              mode="multiple"
              onChange={(val) => {
                setShowStandard(val.includes('standard'));
                setShowDeluxe(val.includes('deluxe'));
              }}
            >
              {roomTypeSelect.map(el => (
                <Select.Option key={el.code} value={el.code}>
                  {el.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isActive" label="Hiệu lực" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      {showStandard && (
        <>
          <Divider orientation="left">Phòng tiêu chuẩn</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="priceStandard" label="Giá phòng" rules={rules.priceStandard}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="availableRoomStandard" label="Số lượng phòng" rules={rules.availableRoomStandard}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="taxStandard" label="Thuế (%)" rules={rules.taxStandard}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="imageStandard"
                label="Hình ảnh phòng"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={rules.imageStandard}
              >
                <Upload
                  onRemove={() => setCountImageStandard(0)}
                  customRequest={options => {
                    uploadImage(options.file)
                      .then(res => {
                        setCountImageStandard(1);
                        options.onSuccess(res, res);
                      })
                      .catch((err) => {
                        notification.error({
                          message: 'Tải lỗi, vui lòng thử lại',
                        });
                        setCountImageStandard(0);
                        form.setFieldsValue({
                          imageStandard: [],
                        });
                        options.onError(err);
                      });
                  }}
                  listType="picture"
                >
                  {countImageStandard === 0 && (
                    <Button>
                      <UploadOutlined /> Tải ảnh lên
                    </Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      {showDeluxe && (
        <>
          <Divider orientation="left">Phòng sang trọng</Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="priceDeluxe" label="Giá phòng" rules={rules.priceDeluxe}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="availableRoomDeluxe" label="Số lượng phòng" rules={rules.availableRoomDeluxe}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="taxDeluxe" label="Thuế (%)" rules={rules.taxDeluxe}>
                <InputNumber className="w-100" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="imageDeluxe"
                label="Hình ảnh phòng"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={rules.imageDeluxe}
              >
                <Upload
                  customRequest={options => {
                    uploadImage(options.file)
                      .then(res => {
                        setCountImageDeluxe(1);
                        options.onSuccess(res, res);
                      })
                      .catch((err) => {
                        notification.error({
                          message: 'Tải lỗi, vui lòng thử lại',
                        });
                        setCountImageDeluxe(0);
                        form.setFieldsValue({
                          imageDeluxe: [],
                        });
                        options.onError(err);
                      });
                  }}
                  listType="picture"
                >
                  {countImageDeluxe === 0 && (
                    <Button>
                      <UploadOutlined /> Tải ảnh lên
                    </Button>
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <SaveOutlined />
          Lưu
        </Button>
      </Form.Item>
    </Form>
  )



};

export default HotelRoom;
