import React from 'react';
import {useParams, Link} from 'react-router-dom'

const Book = () => {
      const {bedType}=useParams()
      return (
            <div style={{textAlign: 'center'}}>
                  <h1>Let's Book a {bedType} Room</h1>
                  <p>Want a <Link to='/home'>Diffrent Room</Link></p>
                  
            </div>
      );
};

export default Book;