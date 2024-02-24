import React, { useState } from 'react';
import './login.css';

import 'tailwindcss/tailwind.css';

function FlipCard() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input
            className="toggle"
            type="checkbox"
            onChange={handleToggle}
            checked={isSignUp}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div className="flip-card__front">
              <div className="title">{isSignUp ? 'Sign up' : 'Log in'}</div>
              <form action="" className="flip-card__form">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="flip-card__input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="flip-card__input"
                />
                <button className="flip-card__btn">
                  {isSignUp ? 'Confirm!' : 'Let`s go!'}
                </button>
              </form>
            </div>
            <div className="flip-card__back">
              <div className="title">{isSignUp ? 'Log in' : 'Sign up'}</div>
              <form action="" className="flip-card__form">
                {isSignUp && (
                  <input
                    type="text"
                    placeholder="Name"
                    className="flip-card__input"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="flip-card__input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="flip-card__input"
                />
                <button className="flip-card__btn">
                  {isSignUp ? 'Let`s go!' : 'Confirm!'}
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default FlipCard;
