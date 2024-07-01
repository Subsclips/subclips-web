import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ jsonData }) => {
    const [currentClip, setCurrentClip] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [playerError, setPlayerError] = useState(null);
    const [debugInfo, setDebugInfo] = useState({});
    const playerRef = useRef(null);

    const clip = jsonData.videoTrack[currentClip];
    const url = clip.url;

    useEffect(() => {
        setPlaying(false);
        setPlayerError(null);
        if (playerRef.current) {
            playerRef.current.seekTo(clip.startTime, 'seconds');
        }
        setTimeout(() => setPlaying(true), 100);
    }, [currentClip, clip.startTime]);

    const handleProgress = (state) => {
        setDebugInfo(prevInfo => ({ ...prevInfo, playedSeconds: state.playedSeconds }));
        if (state.playedSeconds >= clip.startTime + clip.duration) {
            if (currentClip < jsonData.videoTrack.length - 1) {
                setCurrentClip(currentClip + 1);
            } else {
                setPlaying(false);
            }
        }
    };

    const handleReady = () => {
        setDebugInfo(prevInfo => ({ ...prevInfo, playerReady: true }));
        playerRef.current.seekTo(clip.startTime, 'seconds');
        setPlaying(true);
    };

    const handleError = (error) => {
        setPlayerError(error);
        console.error("Player error:", error);
    };

    return (
        <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                onReady={handleReady}
                onProgress={handleProgress}
                onError={handleError}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                    youtube: {
                        playerVars: {
                            start: Math.floor(clip.startTime),
                            controls: 1,  // Temporarily enable controls for debugging
                            disablekb: 1,
                            fs: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                            rel: 0,
                            showinfo: 0
                        }
                    }
                }}
            />
            {playerError && <div style={{ position: 'absolute', top: 0, left: 0, color: 'white' }}>Error: {playerError.toString()}</div>}
            <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', fontSize: '12px' }}>
                Debug: Clip {currentClip + 1}, Time: {debugInfo.playedSeconds?.toFixed(2)}, Ready: {debugInfo.playerReady ? 'Yes' : 'No'}
            </div>
        </div>
    );
};

export default VideoPlayer;