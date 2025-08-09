import { useState } from 'react';

type Props = {
  onSearch: (city: string) => void;
  defaultCity?: string;
};

export default function SearchBar({ onSearch, defaultCity = '' }: Props) {
  const [inputValue, setInputValue] = useState(defaultCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed.length > 0) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
      <input
        type="text"
        value={inputValue}
        placeholder="Enter a city..."
        onChange={(e) => setInputValue(e.target.value)}
        style={{ flexGrow: 1, padding: '6px 10px' }}
      />
      <button type="submit">Go</button>
    </form>
  );
}
