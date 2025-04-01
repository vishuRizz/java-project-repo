import React from 'react';

const TrendsSection: React.FC = () => {
  return (
    <div className="bg-black text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Trends Now</h2>
      <div className="flex space-x-4">
        <div className="flex-1">
          <span className="text-lg font-semibold">Popular</span>
        </div>
        <div className="flex-1">
          <span className="text-lg font-semibold">Premieres</span>
        </div>
        <div className="flex-1">
          <span className="text-lg font-semibold">Recently Added</span>
        </div>
      </div>
    </div>
  );
};

export default TrendsSection;