// InquiryPage.tsx
import React from 'react';
import { List, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

interface Seat {
    no: string;
    isBooked: boolean;
}

interface Trip {
    id: number;
    departure: string;
    destination: string;
    date: string;
    availableSeats: number;
    price: number;
    seats: Seat[];
}

const InquiryPage: React.FC = () => {
    const location = useLocation();
    const { trips } = location.state as { trips: Trip[] } || { trips: [] };
    const { t } = useTranslation();


    return (
        <div>
            <h2>{t("expeditions")}</h2>
            

            {trips.length === 0 ? (
                <p>Uygun sefer bulunamadı.</p>
            ) : (
                <List
                    dataSource={trips}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "300px",
                        margin: "auto",
                      }}
                    renderItem={(trip) => (
                        <List.Item
                            key={trip.id}
                            actions={[
                                <Link
                                    to={`/trip-details/${trip.id}`}
                                    state={{ trips: trips, selectedTrip: trip }}
                                >
                                    <Button type="primary">Detaylar</Button>
                                </Link>,
                            ]}
                        >
                            <List.Item.Meta
                                title={`${trip.departure} - ${trip.destination}`}
                                description={`Tarih: ${trip.date}, Fiyat: ${trip.price} ₺`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};

export default InquiryPage;
