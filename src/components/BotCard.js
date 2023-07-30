import React from 'react';

const BotCard = ({ bot, onEnlistBot, onReleaseBot, onDischargeBot }) => {
  const { name, catchphrase, avatar_url, health, damage, armor } = bot;

  return (
    <div className="bot-card">
      <div className="card__img-container">
        <img className="card__img" src={avatar_url} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>{catchphrase}</p>
      <div className="card__footer">
        <div className="card__stats">
          <div className="card__icon">
            <i className="fa fa-heartbeat" aria-hidden="true"></i>
            <span>{health}</span>
          </div>
          <div className="card__icon">
            <i className="fa fa-bolt" aria-hidden="true"></i>
            <span>{damage}</span>
          </div>
          <div className="card__icon">
            <i className="fa fa-shield" aria-hidden="true"></i>
            <span>{armor}</span>
          </div>
        </div>
        {onEnlistBot && (
          <button onClick={() => onEnlistBot(bot)}>Enlist</button>
        )}
        {onReleaseBot && (
          <button onClick={() => onReleaseBot(bot)}>Release</button>
        )}
        {onDischargeBot && (
          <button onClick={() => onDischargeBot(bot)} className="red-button">
            x
          </button>
        )}
      </div>
    </div>
  );
};

export default BotCard;

