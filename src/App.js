import React, { useEffect, useState } from "react";
import SelectLocation from "./components/SelectLocation";

const App = () => {
  const [dataCountry, setDataCountry] = useState([]);
  const [dataState, setDataState] = useState([]);
  const [dataCity, setDataCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setDataCountry(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setSelectedCity("");
    setSelectedState("");
    if (selectedCountry) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      )
        .then((res) => res.json())
        .then((data) => setDataState(data))
        .catch((err) => console.error(err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity("");
    if (selectedState && !selectedCity) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      )
        .then((res) => res.json())
        .then((data) => setDataCity(data))
        .catch((err) => console.error(err));
    }
  }, [selectedCountry, selectedState]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p style={{ fontSize: 50, fontWeight: "bold" }}>Select Location</p>

      <div>
        <SelectLocation
          data={dataCountry}
          placeHolder={"Select Country"}
          isDisaled={false}
          selected={selectedCountry}
          setSelected={setSelectedCountry}
        />
        <SelectLocation
          data={dataState}
          placeHolder={"Select State"}
          isDisaled={!selectedCountry}
          selected={selectedState}
          setSelected={setSelectedState}
        />
        <SelectLocation
          data={dataCity}
          placeHolder={"Select City"}
          isDisaled={!selectedState}
          selected={selectedCity}
          setSelected={setSelectedCity}
        />
      </div>
      {selectedCity && (
        <p style={{ fontSize: 30, fontWeight: "bold" }}>
          You selected{" "}
          <span style={{ fontSize: 35, fontWeight: "bolder" }}>
            {selectedCity}
          </span>
          ,{" "}
          <span style={{ fontSize: 30, color: "grey", fontWeight: "bold" }}>
            {selectedState}, {selectedCountry}
          </span>
        </p>
      )}
    </div>
  );
};

export default App;
