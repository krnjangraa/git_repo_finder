import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepos = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setRepos([]);

    try {
      const response = await fetch(`/repos/${username}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const data = await response.json();

      setRepos(data);
    } catch (err) {
      setError("User Not Found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>GitHub Repository Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={fetchRepos}>
          Search
        </button>
      </div>

      {loading && <p>Loading repositories...</p>}

      {error && <p className="error">{error}</p>}

      <div className="repo-container">
        {repos.map((repo) => (
          <div className="card" key={repo.id}>
            <h3>{repo.name}</h3>

            <p>
              {repo.description || "No description available"}
            </p>

            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
            >
              View Repository
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;