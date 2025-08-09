export type Units = 'metric' | 'imperial';

export interface WeatherResponse {
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
}
