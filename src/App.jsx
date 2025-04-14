import { useState } from 'react'
import './App.css'
import Gallery from './components/Gallery';

function App() {
  const [tours, setTours] = useState([]);     // store all tours and use state for reactive app

  // remove the specified tour from the tour list
  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  return (
    <main>
      <h1>Tour Selector</h1>
      <Gallery tours={tours} setTours={setTours} onRemove={removeTour} />
    </main>
  )
}

export default App;
