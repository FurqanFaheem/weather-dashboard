import type { Units, WeatherResponse } from './types';

export async function fetchWeather(city: string, units: Units): Promise<WeatherResponse> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY as string;
  if (!apiKey) {
    throw new Error('OpenWeather key is missing');
  }

  const base = 'https://api.openweathermap.org/data/2.5/weather';
  const query = `q=${encodeURIComponent(city)}&units=${units}&appid=${apiKey}`;
  const endpoint = `${base}?${query}`;

  let response: Response;
  try {
    response = await fetch(endpoint, { method: 'GET' });
  } catch {
    throw new Error('Network error. Please check your connection.');
  }

  if (response.status === 404) {
    throw new Error('City not found');
  }
  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  const data = (await response.json()) as WeatherResponse;
  return data;
}
