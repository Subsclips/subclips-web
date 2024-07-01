import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ jsonData }) => {
    const [currentClip, setCurrentClip] = useState(0);
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);

    const clip = jsonData.videoTrack[currentClip];

    useEffect(() => {
        setPlaying(false);
        if (playerRef.current) {
            playerRef.current.seekTo(clip.startTime, 'seconds');
        }
        setTimeout(() => setPlaying(true), 100);
    }, [currentClip, clip.startTime]);

    const handleProgress = ({ playedSeconds }) => {
        const clipEndTime = clip.startTime + clip.duration;
        if (playedSeconds >= clipEndTime) {
            if (currentClip < jsonData.videoTrack.length - 1) {
                setCurrentClip(prevClip => prevClip + 1);
            } else {
                setPlaying(false);
            }
        }
    };

    const handleReady = () => {
        playerRef.current.seekTo(clip.startTime, 'seconds');
        setPlaying(true);
    };

    return (
        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
            <ReactPlayer
                ref={playerRef}
                url={clip.url}
                playing={playing}
                onReady={handleReady}
                onProgress={handleProgress}
                progressInterval={100}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                    youtube: {
                        playerVars: {
                            start: Math.floor(clip.startTime),
                            controls: 0,
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
            <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                Current Clip: {currentClip + 1} / {jsonData.videoTrack.length}
            </div>
        </div>
    );
};

export default VideoPlayer;