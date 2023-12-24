import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const SearchLocation = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const map = useMap();

  const provider = new OpenStreetMapProvider();

  const handleSearch = async (e) => {
    e.preventDefault();

    const results = await provider.search({ query: search });
    setResults(results);
    if (results.length > 0) {
      const { x, y } = results[0];
      map.flyTo([y, x], 14);
    }
  };

  const handleSelect = (x, y) => {
    map.flyTo([y, x], 14);
    setResults([]);
  };

  return (
    <div
      style={{ position: "absolute", top: "10px", left: "50px", zIndex: 400 }}
    >
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Wyszukaj miejscowość..."
        />
        <button type="submit">Szukaj</button>
      </form>
      <div
        style={{
          backgroundColor: "white",
          maxHeight: "200px",
          overflow: "auto",
          width: "300px",
        }}
      >
        {results.map((result, index) => (
          <div
            key={index}
            onClick={() => handleSelect(result.x, result.y)}
            style={{
              cursor: "pointer",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            {result.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchLocation;
