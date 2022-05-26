import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom'
import { UserContext } from '../../App';


import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { TextField } from '@mui/material';

import Button from '@mui/material/Button';
import Bookings from '../Bookings/Bookings';



const Book = () => {
      const [loggedInUser, setLoggedInUser] = useContext(UserContext);
      const [value, setValue] = React.useState([null, null]);


      const handleBooking =()=>{
            const newBooking ={...loggedInUser,...value};
            fetch('http://localhost:4000/addBooking',{
                  method:'POST',
                  headers:{'Content-type':'application/json'},
                  body: JSON.stringify(newBooking)
            })
            .then(res => res.json())
            .then(data =>{
                  console.log(data);
            })
            
      }



      const { bedType } = useParams()
      return (
            <div style={{ textAlign: 'center' }}>
                  <h1>Hello {loggedInUser.name}!  Let's Book a {bedType} Room</h1>
                  <p>Want a <Link to='/home'>Diffrent Room</Link></p>


                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                              startText="Check-in"
                              endText="Check-out"
                              value={value}
                              onChange={(newValue) => {
                                    setValue(newValue);
                              }}
                              renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                          <TextField {...startProps} />
                                          <Box sx={{ mx: 2 }}> to </Box>
                                          <TextField {...endProps} />
                                    </React.Fragment>
                              )}
                        />
                              <Button onClick={handleBooking} variant="contained">Contained</Button>

                  </LocalizationProvider>
                  <Bookings/>
            </div>
      );
};

export default Book;