import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';
import DestinationSelector from './DestinationSelector';
import '../styles/styles.css';

const Gallery = ({ tours, setTours, onRemove }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [filterId, setFilterId] = useState(null);

    const fetchTours = async () => {
        try {
            const res = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
            const data = await res.json();
            setTours(data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const filteredTours = filterId ? tours.filter((tour) => tour.id === filterId) : tours;

    const filterTour = (tourId) => {
        console.log('filter id = ' + tourId);
        setFilterId(tourId);
    };

    const removeTour = (tourId)  => {
        console.log('removeTour = ' + tourId);
        onRemove(tourId);
        if (tourId === filterId) setFilterId(null);
        
    };

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>Something went wrong. Please try again later.</h2>;

    if (tours.length === 0)
        return (
            <div>
                <h2>No Tours Left</h2>
                <button onClick={fetchTours}>Refresh</button>
            </div>
        );

    return (
        <>
            <section>
                <DestinationSelector tours={tours} onFilter={filterTour} />
            </section>
            <section className="gallery">
                {
                    filteredTours.map((tour) => (
                        <TourCard key={tour.id} {...tour} onRemove={removeTour} />
                    ))
                }
            </section>
        </>
    );
};

export default Gallery;