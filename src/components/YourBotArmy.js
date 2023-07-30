import React from 'react';
import BotCard from './BotCard';

const YourBotArmy = ({ bots, onReleaseBot, onDischargeBot }) => {
  return (
    <div className="your-bot-army">
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} onReleaseBot={onReleaseBot} onDischargeBot={onDischargeBot} />
      ))}
    </div>
  );
};

export default YourBotArmy;

