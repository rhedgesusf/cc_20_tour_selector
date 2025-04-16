import React, { useState } from 'react';
import '../styles/styles.css';

const TourCard = ({ id, image, info, price, name, onRemove }) => {

    const [readMore, setReadMore] = useState(false);    // state to show more tour details
  
    return (
      <article className="tour-card">
        
        <img src={image} alt={name} />

        <footer>

          <div className="tour-info">
            <h3>{name}</h3>
            <h3 className="tour-price">${price}</h3>
          </div>

          {/* create toggle to hide/show tour details */}
          <p>
            {readMore ? info : `${info.substring(0, 150)}...`}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Show Less' : 'Read More'}
            </button>
          </p>

          {/* create button to remove item from tour list */}
          <button className="btn" onClick={() => onRemove(id)}>
            Not Interested
          </button>
          
        </footer>
      </article>
    );
};

export default TourCard;