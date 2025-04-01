import React from 'react';
import ShowDetails from './ShowDetails';


const HomeContent: React.FC = () => {
  return (
    <div 
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("https://www.si.edu/sites/default/files/newsdesk/press_releases/the-walking-dead-season-8-key-art-rick-lincoln-daryl-reedus-800x600.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <ShowDetails />
      </div>
    </div>
  );
};

export default HomeContent;