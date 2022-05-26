import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
      const [booking, setBooking] = useState([]);
      const [loggedInUser, setLoggedInUser] = useContext(UserContext);


      useEffect(()=>{
            fetch('http://localhost:4000/bookings?email='+loggedInUser.email)
            .then(res =>res.json())
            .then(data =>setBooking(data))
      },[])
      return (
            <div>
            <h3>you have {booking.length} Booking</h3>
            {
                  booking.map(book => <li>{book.name} Your Email:{book.email}</li>)
            }
                  
            </div>
      );
};

export default Bookings;