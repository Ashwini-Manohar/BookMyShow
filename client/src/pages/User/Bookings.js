
// src/pages/User/Booking.js
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getAllBookings } from "../../api/bookings";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      setLoading(true);

      const response = await getAllBookings();

      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }

      setLoading(false);
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message || "Failed to fetch bookings");
      setLoading(false);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Your Bookings</h2>

      <Row gutter={[24, 24]}>
        {bookings.map((booking) => (
          <Col key={booking._id} xs={24} sm={24} md={12} lg={12}>
            <Card className="mb-3 shadow-sm">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  src={booking.show.movie.poster}
                  alt={booking.show.movie.title}
                  width={100}
                  className="mr-4 mb-2 md:mb-0 rounded"
                />
                <div className="flex-1">
                  <h3 className="mb-1">{booking.show.movie.title}</h3>
                  <p className="mb-1">
                    Theatre: <b>{booking.show.theatre.name}</b>
                  </p>
                  <p className="mb-1">Seats: {booking.seats.join(", ")}</p>
                  <p className="mb-1">
                    Date & Time:{" "}
                    {moment(booking.show.date).format("DD-MM-YYYY")}{" "}
                    {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                  </p>
                  <p className="mb-1">
                    Amount: Rs. {booking.seats.length * booking.show.ticketPrice}
                  </p>
                  <p className="mb-0">
                    Booking ID: <b>{booking.transactionId}</b>
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {bookings.length === 0 && !loading && (
        <div className="text-center pt-5">
          <h3 className="mb-3">You have not booked any show yet!</h3>
          <Link to="/">
            <Button type="primary">Start Booking</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Bookings;
