import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function SearchBar() {

  const options = ['Opcja 1', 'Opcja 2', 'Opcja 3'];

  return (
    <div style={{ width: "50vw", height: "100vh" }}>
      <div style={{ border: "2px solid red", width: "100%", height: "100%" }} >
        <Autocomplete
            freeSolo
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Wyszukaj" variant="outlined" />
            )}
          />
      </div>
    </div>
  );
}

