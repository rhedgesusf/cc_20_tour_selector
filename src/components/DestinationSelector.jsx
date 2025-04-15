import React from 'react';
import '../styles/styles.css';

const DestinationSelector = ({ tours, onFilter }) => {

    const handleChange = (event) => {
        onFilter(event.target.value);
    };

    return (
        <div>
            <label htmlFor="tour-select">Choose a tour:</label>

            <select name="tours" id="tour-select" onChange={handleChange} className='space-left'>
                <option value="">--All Destinations--</option>
                {tours.map((tour) => (
                    <option key={tour.id} value={tour.id}>{tour.name}</option>
                ))}
               
            </select>
        </div>
    );
};

export default DestinationSelector;