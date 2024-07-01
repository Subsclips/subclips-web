import React from 'react';
import VideoPlayer from './VideoPlayer';

const jsonData = {
  videoTrack: [
    {
      "url": "https://youtu.be/jbajZzh0au4",
      "startTime": 1354.3,
      "duration": 5.3
    },
    {
      "url": "https://youtu.be/eWakq9qQ6Ik",
      "startTime": 65.5,
      "duration": 6.5
    },
    {
      "url": "https://youtu.be/jbujtShQbAk",
      "startTime": 103.4,
      "duration": 6
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
      <h1>Subclips</h1>
      <VideoPlayer jsonData={jsonData} />
    </div>
  );
};

export default App;