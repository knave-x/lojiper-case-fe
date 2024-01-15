import citiesData from "../cities.json"
import React, { useState, useEffect } from 'react';
import { Form, Select, DatePicker, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


interface City {
  id: number;
  name: string;
}
interface Trip {
  id: number;
  departure: string;
  destination: string;
  date: string;
  availableSeats: number;
  price: number;
}



const SearchPage: React.FC = () => {
  const [form] = Form.useForm();
  const [cities, setCities] = useState<City[]>(citiesData);
  const navigate = useNavigate();
  const [noTripsFound, setNoTripsFound] = useState(false);
  const { Option } = Select;

  const { t } = useTranslation();


  const handleSearch = async () => {
    try {
      const values = await form.validateFields();


      const response = await fetch('/trips.json');
      const trips: Trip[] = await response.json();


      const selectedDate = values.date.format('YYYY-MM-DD');


      const filteredTrips = trips.filter((trip: Trip) => {
        return trip.departure === values.departure && trip.destination === values.destination && trip.date === selectedDate;
      });


      if (filteredTrips.length > 0) {
        navigate('/inquiry', { state: { trips: filteredTrips } });
        setNoTripsFound(false);
      } else {

        setNoTripsFound(true);
        message.error('Uygun sefer bulunamadı.');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };


  return (
    <div>
      <h2>{t("ticket_search")}</h2>
      <Form form={form} onFinish={handleSearch}
        style={{ maxWidth: '300px', margin: 'auto' }}>
        <Form.Item

          label="Kalkış Yeri"
          name="departure"
          rules={[{ required: true, message: 'Lütfen kalkış yerini seçin' }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Kalkış Yeri Seçin">
            {cities.map((city) => (
              <Option key={city.id} value={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Varış Yeri"
          name="destination"
          rules={[{ required: true, message: 'Lütfen varış yerini seçin' }]}
        >
          <Select showSearch placeholder="Varış Yeri Seçin">
            {cities.map((city) => (
              <Option key={city.id} value={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Sefer Tarihi"
          name="date"
          rules={[{ required: true, message: 'Lütfen sefer tarihini seçin' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Ara
          </Button>
        </Form.Item>
        {noTripsFound && <p>Uygun sefer bulunamadı.</p>}
      </Form>
    </div>
  );
};

export default SearchPage;
