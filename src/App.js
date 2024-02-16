import './App.css';
import React, { useState, useEffect } from 'react';
import lichessimage from './lichess.jpg'

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://lichess.org/api/user/${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        setUserData(null);
      }
    };

    fetchUserData();
  }, [username]);

  const handleSearch = () => {
    setUserData(null);
    setError(null);
  };

  return (
    <>
    <div className='image-lichess' style={{ backgroundImage: `url(${lichessimage})` }}>
    <div className='text-info' >
      <h1>Lichess User Information</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="search-bar"
      />
      <button className='button-style'onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {userData && (
        <div>
          <h2>User Information:</h2>
          <p>Username: {userData.username}</p>
          <p>Profile URL: <a href={`https://lichess.org/@/${userData.username}`}>Link</a></p>
          <p>Games count: {userData.count?.all}</p>
          <p>Games won: {userData.count?.win}</p>
          <p>Games lost: {userData.count?.loss}</p>
          <p>Games drawn: {userData.count?.draw}</p>
        </div>
      )}
    </div>
    </div>
    </>
  );
};

export default App;
