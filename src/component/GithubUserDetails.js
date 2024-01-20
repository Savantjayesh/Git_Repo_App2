import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GithubUserDetails = ({ user, repositoriesPerRow }) => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch user repositories if not already fetched
    if (repositories.length === 0) {
      const fetchUserRepositories = async () => {
        try {
          const repositoriesResponse = await axios.get(`https://api.github.com/users/${user.login}/repos`);
          setRepositories(repositoriesResponse.data);
        } catch (error) {
          console.error('Error fetching repositories:', error.message);
        }
      };

      fetchUserRepositories();
    }
  }, [user, repositories]);

  return (
    <div>
      {/* Render user details here */}
      <div>
        <img src={user.avatar_url} alt={`${user.login}'s avatar`} style={{ width: 100, borderRadius: '50%' }} />
        <h2>{user.login}</h2>
        {/* ... other user details */}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {repositories.map((repo) => (
          <div key={repo.id} style={{ margin: '10px', width: `${100 / repositoriesPerRow}%` }}>
            <p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubUserDetails;
