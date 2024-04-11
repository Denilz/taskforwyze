import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('/api/stores.json');
        setBranches(response.data);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    let filtered = branches;
    if (selectedCity !== '') {
      filtered = filtered.filter(branch => branch.city === selectedCity);
    }
    if (selectedRegion !== '') {
      filtered = filtered.filter(branch => branch.store_region === selectedRegion);
    }
    if (searchTerm !== '') {
      filtered = filtered.filter(branch =>
        Object.values(branch).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredBranches(filtered);
  }, [selectedCity, selectedRegion, searchTerm, branches]);

  return (
    <div className="container py-4">
<h1 className="text-center mb-4" style={{ animation: 'glow 2s linear infinite' }}>Mcdonald's - I'm Lovin' It! 🍔</h1>

      <div className="row mb-4 align-items-end">
        <CitiesFilter
          branches={branches}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
        <RegionsFilter
          branches={branches}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
        <div className="col">
          <input
            type="text"
            id="search"
            name="search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="table-responsive">
        <div style={{ maxHeight: '400px', overflowY: 'auto', borderRadius: '4px 4px 4px 4px'}}> {/* Add a max height and overflow property */}
          <table className="table table-bordered"> {/* Add table-bordered class for border */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Region</th>
                <th>Title</th>
                <th>Address</th>
                <th>Phone</th>
                <th>City</th>
                <th>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map(branch => (
                <tr key={branch.id}>
                  <td>{branch.store_id}</td>
                  <td>{branch.store_region}</td>
                  <td>{branch.store_title}</td>
                  <td>{branch.store_address}</td>
                  <td>{branch.store_phone}</td>
                  <td>{branch.city}</td>
                  <td>{branch.zip_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const CitiesFilter = ({ branches, selectedCity, setSelectedCity }) => {
  const cities = branches.map(branch => branch.city);
  const uniqueCities = [...new Set(cities)];

  const handleChange = e => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="col">
      <label htmlFor="city" className="form-label">
        Filter by City:
      </label>
      <select
        id="city"
        name="city"
        value={selectedCity}
        onChange={handleChange}
        className="form-select"
      >
        <option value="">All</option>
        {uniqueCities.map(city => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

const RegionsFilter = ({ branches, selectedRegion, setSelectedRegion }) => {
  const regions = branches.map(branch => branch.store_region);
  const uniqueRegions = [...new Set(regions)];

  const handleChange = e => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="col">
      <label htmlFor="region" className="form-label">
        Filter by Region:
      </label>
      <select
        id="region"
        name="region"
        value={selectedRegion}
        onChange={handleChange}
        className="form-select"
      >
        <option value="">All</option>
        {uniqueRegions.map(region => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Branches;
