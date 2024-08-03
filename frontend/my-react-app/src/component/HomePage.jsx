import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { AuthContext } from '../App';
 import '../homepage.css'

export function HomePage() {
  const [currencyCode, setCurrencyCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [history, setHistory] = useState([]);
  const { auth } = useContext(AuthContext);
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      if (auth) {
        try {
          const response = await axios.get('http://localhost:8080/api/history', {
            headers: { Authorization: `Bearer ${auth.token}` }
          });
          setHistory(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchHistory();
  }, [auth]);

  const fetchCountries = async (code) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/countries/currency/${code}`);
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        setCountries(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
      }
      if (auth) {
        await axios.post('http://localhost:8080/api/history', { search: code }, {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchCountries = debounce(fetchCountries, 500);

  const handleSearch = (e) => {
    setCurrencyCode(e.target.value);
    debouncedFetchCountries(e.target.value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedCountries = [...countries].sort((a, b) => {
      if (order === 'asc') {
        return a.name.common.localeCompare(b.name.common);
      } else {
        return b.name.common.localeCompare(a.name.common);
      }
    });
    setCountries(sortedCountries);
  };

  return (
    <div className="home-page">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          ref={searchInputRef}
          value={currencyCode}
          onChange={handleSearch}
          placeholder="Enter currency code"
          required
        />
      </form>
      <button onClick={() => handleSort('asc')}>Sort Ascending</button>
      <button onClick={() => handleSort('desc')}>Sort Descending</button>
      <div className="countries-list">
        {countries.map(country => (
          <div className="country-card" key={country.cca2}>
            <h3>{country.name.common}</h3>
            <img src={`https://flagsapi.com/${country.cca2}/shiny/64.png`} alt={country.name.common} />
            <p>Capital: {country.capital}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
