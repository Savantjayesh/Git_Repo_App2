// App.js

import React, { useState, useEffect } from 'react';
import GithubUserDetails from './component/GithubUserDetails';
import axios from 'axios';

function App() {
  const [randomUser, setRandomUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch a random GitHub user
        const randomUserResponse = await axios.get('http://localhost:3001/api/randomUser');
        const user = randomUserResponse.data;
        setRandomUser(user);

        // Fetch user repositories
        const repositoriesResponse = await axios.get(`http://localhost:3001/api/userRepositories/${user.login}`);
        setRepositories(repositoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>GitHub User Details</h1>
      {randomUser && (
        <GithubUserDetails key={randomUser.id} user={randomUser} repositories={repositories} repositoriesPerRow={2} />
      )}
    </div>
  );
}

export default App;
