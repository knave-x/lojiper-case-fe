import React, { useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Simulate API call for payment processing
      setIsProcessingPayment(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessingPayment(false);

      // Display success message
      message.success('Ödeme Başarılı');

      // Redirect to homepage
      navigate('/');
    } catch (error) {
      setIsProcessingPayment(false);
      message.error('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div>
      <h2>PAYMENT PAGE</h2>
      <Form
        form={form}
        onFinish={handlePayment}
        style={{ maxWidth: '300px', margin: 'auto' }}
      >
        <Form.Item
          label="Kart Numarası"
          name="cardNumber"
          rules={[{ required: true, message: 'Lütfen kart numaranızı girin.' }]}
        >
          <Input placeholder="Kart Numarası" />
        </Form.Item>

        <Form.Item
          label="Son Kullanma Tarihi"
          name="expiryDate"
          rules={[{ required: true, message: 'Lütfen son kullanma tarihini girin.' }]}
        >
          <Input placeholder="MM/YY" />
        </Form.Item>

        <Form.Item
          label="CVV"
          name="cvv"
          rules={[{ required: true, message: 'Lütfen CVV numaranızı girin.' }]}
        >
          <Input placeholder="CVV" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={isProcessingPayment}>
            {isProcessingPayment ? 'Ödeme İşleniyor...' : 'Ödemeyi Tamamla'}
          </Button>
        </Form.Item>
      </Form>

      {isProcessingPayment && <Spin tip="Ödeme İşleniyor..." />}
    </div>
  );
};

export default PaymentPage;
