import React, { useState } from 'react';
import '../styles/styles.css';

const TourCard = ({ id, image, info, price, name, onRemove }) => {
    const [readMore, setReadMore] = useState(false);
  
    return (
      <article className="tour-card">
        
        <img src={image} alt={name} />
        <footer>
          <div className="tour-info">
            <h3>{name}</h3>
            <h3 className="tour-price">${price}</h3>
          </div>
          <p>
            {readMore ? info : `${info.substring(0, 150)}...`}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button className="btn" onClick={() => onRemove(id)}>
            Not Interested
          </button>
        </footer>
      </article>
    );
};

export default TourCard;