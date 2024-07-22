'use client';

import { useState } from 'react';
import Image from 'next/image'; // For optimized image handling
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [cards, setCards] = useState([
    { id: 1, name: 'John Doe', age: 25, city: 'New York', image: '/path-to-profile-image1.jpg' },
    { id: 2, name: 'Jane Smith', age: 28, city: 'Los Angeles', image: '/path-to-profile-image2.jpg' },
    // Add more cards as needed
  ]);
  const router = useRouter();

  const handleLike = (id: number) => {
    // Handle like action
    console.log(`Liked user with id ${id}`);
  };

  const handleDislike = (id: number) => {
    // Handle dislike action
    console.log(`Disliked user with id ${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="relative w-full max-w-lg p-4">
        {/* Cards Container */}
        <div className="relative flex flex-col items-center space-y-4">
          {cards.map((card) => (
            <div key={card.id} className="relative w-full max-w-xs bg-gray-800 p-4 rounded-lg shadow-lg">
              <div className="relative w-full h-60">
                <Image
                  src={card.image}
                  alt={card.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">{card.name}</h2>
                <p className="text-gray-400">{card.age}, {card.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-8 flex space-x-4 w-full px-4">
          <button
            onClick={() => handleDislike(cards[0]?.id)}
            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center transition-colors duration-150 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="text-3xl">👎</span>
          </button>
          <button
            onClick={() => handleLike(cards[0]?.id)}
            className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center transition-colors duration-150 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-3xl">👍</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
