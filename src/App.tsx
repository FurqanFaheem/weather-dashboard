import { useState } from 'react';
import SearchBar from './components/SearchBar';
import UnitsToggle from './components/UnitsToggle';
import WeatherCard from './components/WeatherCard';
import { fetchWeather } from './api';
import type { Units, WeatherResponse } from './types';

export default function App() {
  const [units, setUnits] = useState<Units>('metric');
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSearch(city: string) {
    try {
      setLoading(true);
      setErrorMsg('');
      const data = await fetchWeather(city, units);
      setWeatherData(data);
    } catch (err: any) {
      setWeatherData(null);
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  function handleUnitsChange(newUnits: Units) {
    setUnits(newUnits);
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: '0 16px' }}>
      <h1>Weather Dashboard</h1>

      <UnitsToggle units={units} onChange={handleUnitsChange} />
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      {weatherData && !loading && <WeatherCard data={weatherData} units={units} />}
    </main>
  );
}
