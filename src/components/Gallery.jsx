import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';
import DestinationSelector from './DestinationSelector';
import '../styles/styles.css';
import loadingImage from '../assets/loading.gif';

const Gallery = ({ tours, setTours, onRemove }) => {

    const [loading, setLoading] = useState(true);    // app loading state, default will show loading status
    const [error, setError] = useState(false);       // app error state; show error if true
    const [filterId, setFilterId] = useState(null);  // the id of the tour to filter on (based on drop down selector)

    // retrieve all tours from the API URL location; response will be JSON text
    const fetchTours = async () => {
        try {
            const res = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
            const data = await res.json();

            // set tour date once get API response and parse JSON
            setTours(data);

            // turn off loading indicator
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    // retrieve the tours data via API call
    useEffect(() => {
        // only used this 1 second timer to show spinning loader; would not be there for production code
        setTimeout(() => {
          fetchTours();
        }, 1000);
    }, []);

    // use this to show filtered list of tours if drop down is selected; else just show all tours
    const filteredTours = filterId ? tours.filter((tour) => tour.id === filterId) : tours;

    // filter tour to a specific id based on drop down selector
    const filterTour = (tourId) => {
        console.log('filter id = ' + tourId);
        setFilterId(tourId);
    };

    // handle remote tour buton press
    const removeTour = (tourId)  => {
        console.log('removeTour = ' + tourId);
        onRemove(tourId);

        // if user removed the current filtered tour, then clear the tour filter id
        if (tourId === filterId) setFilterId(null);
    };

    // show loading message or indicator if in loading status
    if (loading) return <img src={loadingImage} width="200"></img>;

    // show an error message if error flag set
    if (error) return <h2>Something went wrong. Please try again later.</h2>;

    // if tours list if empty, show appropriate message
    if (tours.length === 0)
        return (
            <div>
                <h2>No Tours Left</h2>
                <button onClick={fetchTours}>Refresh</button>
            </div>
        );

    // if pass all above conditions, show the tour gallery
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