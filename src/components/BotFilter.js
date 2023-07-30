import React, { useState } from 'react';

const BotFilter = ({ botClasses, onFilterChange }) => {
  const [selectedClasses, setSelectedClasses] = useState([]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedClasses([...selectedClasses, value]);
    } else {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== value));
    }

    onFilterChange(selectedClasses, value);
  };

  return (
    <div className="bot-filter">
      <label>Filter By Class:</label>
      {botClasses.map((botClass) => (
        <div key={botClass}>
          <input
            type="checkbox"
            id={botClass}
            value={botClass}
            checked={selectedClasses.includes(botClass)}
            onChange={handleFilterChange}
          />
          <label htmlFor={botClass}>{botClass}</label>
        </div>
      ))}
    </div>
  );
};

export default BotFilter;



