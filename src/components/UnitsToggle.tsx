import type { Units } from '../types';

interface Props {
  units: Units;
  onChange: (units: Units) => void;
}

export default function UnitsToggle({ units, onChange }: Props) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label>
        Units:{' '}
        <select value={units} onChange={(e) => onChange(e.target.value as Units)}>
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </label>
    </div>
  );
}
