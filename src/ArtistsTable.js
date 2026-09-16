import { useState, useEffect } from 'react';
 
function artistsTable() {
  const [artists, setartists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch('http://localhost:5000/api/artists')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setartists(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
 
  if (loading) return <p>Loading artists...</p>;
  if (error) return <p>Error: {error}</p>;
 
  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
        </tr>
      </thead>
      <tbody>
        {artists.map((artists) => (
          <tr key={artists.artistId}>
            <td>{artists.artistId}</td>
            <td>{artists.name}</td>
            <td>{artists.email}</td>
            <td>{artists.genre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
 
export default artistsTable;