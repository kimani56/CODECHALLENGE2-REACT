import React, { useState, useEffect } from 'react';
import './App.css';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import SortBar from './components/SortBar';
import BotFilter from './components/BotFilter';
import axios from 'axios';

const App = () => {
  const [allBots, setAllBots] = useState([]);
  const [yourBotArmy, setYourBotArmy] = useState([]);
  const [sortedBy, setSortedBy] = useState('health'); // State for sorting
  const [selectedClasses, setSelectedClasses] = useState([]); // State for selected bot classes

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    try {
      const response = await axios.get('https://bot-battlr-rzj4.onrender.com/bots');
      setAllBots(response.data);
    } catch (error) {
      console.error('Error fetching bots:', error);
    }
  };

  const handleEnlistBot = (bot) => {
    if (!yourBotArmy.includes(bot)) {
      setYourBotArmy([...yourBotArmy, bot]);
    }
  };

  const handleReleaseBot = (bot) => {
    setYourBotArmy(yourBotArmy.filter((b) => b !== bot));
  };

  const handleDischargeBot = async (bot) => {
    try {
      await axios.delete(`http://localhost:8001/bots/${bot.id}`);
      setAllBots(allBots.filter((b) => b !== bot));
      setYourBotArmy(yourBotArmy.filter((b) => b !== bot));
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  const handleFilterAndSort = () => {
    const filteredBots = allBots.filter((bot) => {
     
      if (selectedClasses.length === 0) {
        return true;
      }
      
      return selectedClasses.includes(bot.bot_class);
    });

    return filteredBots.sort((a, b) => b[sortedBy] - a[sortedBy]);
  };

  const handleSortChange = (value) => {
    setSortedBy(value);
  };

  const handleFilterChange = (checked, botClass) => {
    if (checked) {
      setSelectedClasses([...selectedClasses, botClass]);
    } else {
      setSelectedClasses(selectedClasses.filter((cls) => cls !== botClass));
    }
  };


  const sortedAndFilteredBots = handleFilterAndSort();

  return (
    <div className="App">
      <h1>Available Bots</h1>
      <SortBar onSortChange={handleSortChange} />
      <BotFilter botClasses={['Support', 'Medic', 'Assault', 'Defender', 'Captain', 'Witch']} onFilterChange={handleFilterChange} />
      <BotCollection bots={sortedAndFilteredBots} onEnlistBot={handleEnlistBot} />
      <h1>Your Bot Army</h1>
      <YourBotArmy bots={yourBotArmy} onReleaseBot={handleReleaseBot} onDischargeBot={handleDischargeBot} />
    </div>
  );  
};

export default App;
