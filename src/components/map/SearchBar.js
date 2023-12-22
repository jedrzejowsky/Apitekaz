import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBar() {
  const options = ["Opcja 1", "Opcja 2", "Opcja 3"];

  return (
    <div style={{ width: "20vw" }}>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Ustaw przezroczystość tła
          backdropFilter: "blur(10px)", // Dodaj efekt rozmycia dla lepszego wyglądu
        }}
      >
        <Autocomplete
          freeSolo
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Wyszukaj"
              variant="outlined"
              style={{ backgroundColor: "transparent" }} // Ustaw przezroczysty background dla TextField
            />
          )}
        />
      </div>
    </div>
  );
}
