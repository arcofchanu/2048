import React from 'react';
import InteractiveStartObject from './InteractiveStartObject';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const titleChars = ['2', '0', '4', '8'];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-7xl md:text-9xl text-neutral-100 text-glow mb-8 font-bold flex space-x-2 md:space-x-4">
        {titleChars.map((char, index) => (
          <span
            key={index}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
          >
            {char}
          </span>
        ))}
      </h1>

      <p
        className="text-lg text-neutral-300 mb-12 max-w-sm animate-fade-in-up"
        style={{ animationDelay: '620ms', opacity: 0 }}
      >
        Join the numbers to reach the ultimate{' '}
      <p>
        <span className="text-yellow-300 font-bold">2048 tile!</span> 
      </p>
      </p>

      <InteractiveStartObject onStart={onStart} />
    </div>
  );
};

export default StartPage;