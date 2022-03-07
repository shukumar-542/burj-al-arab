import { Button, IconButton } from '@mui/material';
import React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import HotelIcon from '@mui/icons-material/Hotel';
import WcIcon from '@mui/icons-material/Wc';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useHistory } from 'react-router-dom';



export default function Room({ room }) {
      const history = useHistory();
      const handleBook = (bedType) => {

            history.push(`book/${bedType}`)


      }

      return (
            <div>




                  <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                              component="img"
                              height="140"
                              image={room.imgUrl}
                              title="Paella dish"
                        />
                        <img src={`/images/${room.bedType}.png`} alt="" />
                        <CardContent>
                              <Typography gutterBottom variant="h5" component="div">{room.bedType}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                    {room.description}
                              </Typography>
                        </CardContent>
                        <CardActions>
                              <IconButton aria-label="add to favorites">
                              <HotelIcon/> : {room.bed}

                              </IconButton>
                              <IconButton aria-label="add to favorites">
                                    <WcIcon/> : {room.capacity}
                              </IconButton>
                              <IconButton aria-label="add to favorites">
                                    <AttachMoneyIcon/> : {room.price}
                              </IconButton>

                              <Button onClick={() => handleBook(room.bedType)} variant="contained" color="primary">
                                    Book
                              </Button>
                        </CardActions>
                  </Card>


            </div>
      );
};

