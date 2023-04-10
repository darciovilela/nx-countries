import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './index.module.css';
import type { Country } from '@nx-countries/shared-types';

const Index = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    fetch(`http://localhost:3333/countries?q=${search}`)
      .then((resp) => resp.json())
      .then((data) => setAllCountries(data));
  }, [search]);

  const onSetSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    []
  );

  return (
    <div className={`${styles.page} flex-container`}>
      <h1>Find your Country</h1>
      <input
        type="text"
        ref={inputRef}
        value={search}
        onChange={onSetSearch}
        placeholder="Search..."
      />

      <hr className="horizontal-line"></hr>

      <ul>
        {allCountries.map(({ country, city }, id) => {
          if (city != null) {
            return (
              <li key={id}>
                {country} -{' '}
                <span className="style-capital">{`capital: ${city}`}</span>
              </li>
            );
          } else {
            return (
              <li key={id}>
                {country} -{' '}
                <span className="style-capital">{`no capital`}</span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Index;
