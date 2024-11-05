// client/src/components/AddressInput.js
import React, { useState } from 'react';
import axios from 'axios';

const AddressInput = () => {
  const [address, setAddress] = useState('');
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [estimate, setEstimate] = useState(null);

  const handleAreaChange = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/estimate', {
        address,
        areas: selectedAreas,
      });
      setEstimate(response.data.estimated_cost);
    } catch (error) {
      console.error('Failed to get estimate', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <div>
          {['driveway', 'curb', 'walkway', 'pool_area', 'deck'].map((area) => (
            <label key={area}>
              <input
                type="checkbox"
                value={area}
                onChange={() => handleAreaChange(area)}
              />
              {area}
            </label>
          ))}
        </div>
        <button type="submit">Get Estimate</button>
      </form>
      {estimate !== null && <p>Estimated Cost: ${estimate.toFixed(2)}</p>}
    </div>
  );
};

export default AddressInput;
