import React from 'react';
import VideoPlayer from './VideoPlayer';

const jsonData = {
  videoTrack: [
    {
      "url": "https://youtu.be/jbajZzh0au4",
      "startTime": 1355,
      "duration": 4.5
    },
    {
      "url": "https://youtu.be/Gky_mTWf_Dg",
      "startTime": 4,
      "duration": 2.5
    },
  ],
  // ... audioTrack (not implemented in this example)
};

const App = () => {
  return (
    <div>
      <h1>My Video Player</h1>
      <VideoPlayer jsonData={jsonData} />
    </div>
  );
};

export default App;