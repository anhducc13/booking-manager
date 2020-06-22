import React, { useState } from 'react';
import { Card, Button, Steps } from 'antd';
import TourCommonInfo from './TourCommonInfo';

const { Step } = Steps;

const TourAdd = () => {
  const [info, setInfo] = useState({});
  const [step, setStep] = useState(0);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const stickyBottom = (buttonText) => {
    return (
      <div className="sticky-bottom">
        <Button type="primary" htmlType="submit">
          {buttonText || 'Tiếp tục'}
        </Button>
      </div>
    );
  };

  const steps = [
    {
      title: 'Thông tin cơ bản',
      content: (
        <TourCommonInfo
          next={next}
          stickyBottom={stickyBottom()}
          info={info}
          setInfo={setInfo}
        />
      ),
    },
    {
      title: 'Thông tin phòng',
      content: (
        <div>
          ductt
          {stickyBottom()}
        </div>
      ),
    },
  ];

  return (
    <Card
      title="Tạo mới tour"
    >
      <Steps className="mb-base px-base" current={step}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ paddingBottom: 72 }}>
        {steps[step] && steps[step].content}
      </div>
    </Card>
  )
};

export default TourAdd;