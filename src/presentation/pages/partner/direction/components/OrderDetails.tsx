import { Button, Card, Drawer, Row, Typography, Modal, Tooltip, Col, Divider, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Order } from '../types';
import _ from 'lodash';
import axiosInstance from '@/config/axios';

function OrderDetails({
  distance,
  duration,
  setDirection,
}: {
  distance: number;
  duration: number;
}) {
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [storeArrived, setStoreArrived] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('orderDetailsAndDirection');
    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setOrderDetails(parsedData?.order || null);
    }
  }, []);

  const totalAmount = useMemo(() => orderDetails?.totalAmount, [orderDetails]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onReached = useCallback(
    _.debounce(() => {
      console.log('Reached Store');
      setStoreArrived(true);
      Modal.success({
        title: 'Reached the Store',
        content: 'Please verify the products before collecting the order.',
      });

      axiosInstance.post('/partner/delivery/store-reached', { orderId: orderDetails?._id });
    }, 500),
    [orderDetails],
  );

  const handleOrderCollected = () => {
    Modal.confirm({
      title: 'Confirm Order Collection',
      content: 'Have you verified that all products are available?',
      onOk: () => {
        console.log('Order collected');
        setOpen(false);
        setStoreArrived(true);
        axiosInstance
          .post('/partner/delivery/collected', { orderId: orderDetails?._id })
          .then(({ data }) => {
            setDirection(data.direction);
            localStorage.setItem('direction', JSON.stringify(data.direction));
          });
      },
    });
  };

  const renderActionButton = () => {
    return storeArrived ? (
      <Tooltip title="Click to confirm order collection after checking all products">
        <Button type="primary" onClick={handleOrderCollected} disabled={!storeArrived}>
          Order Collected
        </Button>
      </Tooltip>
    ) : (
      <Tooltip title="Confirm your arrival at the store">
        <Button type="default" onClick={onReached}>
          Reached Store
        </Button>
      </Tooltip>
    );
  };

  return (
    orderDetails && (
      <>
        <Row gutter={[16, 16]}>
          <Col>{renderActionButton()}</Col>
          <Col>
            <Button type="primary" onClick={showDrawer}>
              View Order Details
            </Button>
          </Col>
        </Row>

        <Drawer
          title={`Order Details - #${orderDetails?._id}`}
          onClose={onClose}
          open={open}
          placement="bottom"
          height={400}
        >
          <Card bordered={false}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Title level={4}>Instructions for Delivery Partner</Title>
              <Typography.Text>
                Please check that all products in the order are available before confirming
                collection.
              </Typography.Text>
              <Divider />

              <Title level={4}>Order Summary</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Typography.Text strong>Distance to Store:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>{distance ? `${distance} m` : 'Not available'}</Typography.Text>
                </Col>

                <Col span={12}>
                  <Typography.Text strong>Estimated Duration:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>
                    {duration ? `${duration} min` : 'Not available'}
                  </Typography.Text>
                </Col>

                <Col span={12}>
                  <Typography.Text strong>Total Amount:</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Text>{totalAmount} Rs</Typography.Text>
                </Col>
              </Row>

              <Divider />

              <Title level={4}>Order Items</Title>
              {orderDetails.items.map((item) => (
                <Row key={item.productId} gutter={[16, 16]}>
                  {orderDetails._id}
                  <Col span={12}>
                    <Typography.Text>{item?.productName || item.productId}</Typography.Text>
                  </Col>
                  <Col span={12}>
                    <Typography.Text>Qty: {item.quantity}</Typography.Text>
                  </Col>
                </Row>
              ))}
            </Space>
          </Card>
        </Drawer>
      </>
    )
  );
}

export default OrderDetails;
