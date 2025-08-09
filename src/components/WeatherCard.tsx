import type { WeatherResponse, Units } from '../types';

type Props = {
  data: WeatherResponse;
  units: Units;
};

export default function WeatherCard({ data, units }: Props) {
  const weatherInfo = data.weather[0];
  const iconUrl = weatherInfo?.icon
    ? `https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`
    : '';

  const tempSymbol = units === 'metric' ? '°C' : '°F';
  const windSymbol = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, maxWidth: 400, background: '#fff' }}>
      <h2 style={{ marginTop: 0 }}>{data.name}</h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {iconUrl && <img src={iconUrl} alt={weatherInfo?.description} />}
        <div>
          <div style={{ fontSize: 26 }}>
            {Math.round(data.main.temp)}{tempSymbol}
          </div>
          <small style={{ color: '#666' }}>{weatherInfo?.description}</small>
        </div>
      </div>

      <div style={{ marginTop: 10 }}>
        <div>Feels like: {Math.round(data.main.feels_like)}{tempSymbol}</div>
        <div>Humidity: {data.main.humidity}%</div>
        <div>Wind: {data.wind.speed} {windSymbol}</div>
      </div>
    </div>
  );
}
