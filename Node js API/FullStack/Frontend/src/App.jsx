import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'


function App() {

  const [joke, setJoke] = useState()

  const fetchJoke = () => {
    axios.get("/api/jokes") // Assuming the server is running locally on port 3000
      .then((response) => {
        setJoke(response.data.joke);
      })
      .catch((error) => {
        console.log('Error fetching joke:', error);
      });
  };

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <>
      <div>
        <button onClick={fetchJoke}>
          Get Joke
        </button>
        <p>{joke}</p>
      </div>
    </>
  )
}

export default App