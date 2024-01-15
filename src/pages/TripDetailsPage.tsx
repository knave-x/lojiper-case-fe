import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, message, Checkbox } from 'antd';
import { useTranslation } from "react-i18next";


interface Seat {
  no: string;
  isBooked: boolean;
}

interface TripDetails {
  id: number;
  departure: string;
  destination: string;
  date: string;
  price: number;
  seats: Seat[];
}

interface TripDetailsPageProps {}

const TripDetailsPage: React.FC<TripDetailsPageProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { t } = useTranslation();
  const { state } = useLocation();
  const tripDetails = state as {
    trips: TripDetails[];
    selectedTrip: TripDetails;
  };

  if (!tripDetails || !tripDetails.selectedTrip) {
    return <div>Trip not found</div>;
  }

  const { selectedTrip, trips } = tripDetails;

  const handleSeatSelection = (seatNo: string) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNo)) {
        // Koltuk zaten seçiliyse kaldır
        return prevSeats.filter((seat) => seat !== seatNo);
      } else if (prevSeats.length < 5) {
        // Koltuk seçili değilse ve seçili koltuk sayısı 5'ten azsa ekle
        return [...prevSeats, seatNo];
      } else {
        // Koltuk seçili değilse ve seçili koltuk sayısı 5 ise uyarı ver ve mevcut koltukları döndür
        message.warning('En fazla 5 koltuk seçebilirsiniz!');
        return prevSeats;
      }
    });
  };

  const handleContinue = () => {
    navigate('/payments', {
      state: {
        tripDetails: { ...selectedTrip, selectedSeats },
        trips: trips,
      },
    });
  };
  const seatGroups = Array.from({ length: Math.ceil(selectedTrip.seats.length / 10) }, (_, index) =>
    selectedTrip.seats.slice(index * 10, (index + 1) * 10)
  );

  return (
    <div>
      <h2>{t("trip_details_page")}</h2>
      <h3>{t("trip_details")}</h3>
      <p>Kalkış: {selectedTrip.departure}</p>
      <p>Varış: {selectedTrip.destination}</p>
      <p>Tarih: {selectedTrip.date}</p>
      <p>Fiyat: {selectedTrip.price ? `${selectedTrip.price} TL` : 'Bilgi Yok'}</p>

      <h3>Koltuk Seçimi</h3>
      <div className="seat-container">
        {seatGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="seat-group">
            {group.map((seat) => (
              <Checkbox
                key={seat.no}
                disabled={seat.isBooked}
                checked={selectedSeats.includes(seat.no)}
                onChange={() => handleSeatSelection(seat.no)}
                style={{margin:"5px"}}
              >
                {seat.no}
              </Checkbox>
            ))}
          </div>
        ))}
      </div>

      <div>
        <h3>Seçilen Koltuklar</h3>
        <p>{selectedSeats.join(', ')}</p>
      </div>

      <Button type="primary" onClick={handleContinue}>
        Devam
      </Button>

      <div>
        <Link to="/inquiry">Geri Dön</Link>
      </div>
    </div>
  );
};

export default TripDetailsPage;
