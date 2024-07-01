import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ jsonData }) => {
    const [currentClip, setCurrentClip] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [restart, setRestart] = useState(false);
    const playerRefs = useRef(jsonData.videoTrack.map(() => React.createRef()));
    const [initialPlay, setInitialPlay] = useState(true);

    const handleReady = (index) => () => {
        const clipData = jsonData.videoTrack[index];
        playerRefs.current[index].current.seekTo(clipData.startTime, 'seconds');
    };

    const handleProgress = ({ playedSeconds }) => {
        const currentClipData = jsonData.videoTrack[currentClip];
        if (playedSeconds >= currentClipData.startTime + currentClipData.duration) {
            if (currentClip < jsonData.videoTrack.length - 1) {
                setCurrentClip(prevClip => prevClip + 1);
            } else {
                resetPlayer();
            }
        }
    };

    const handleStart = () => {
        if (!playing) {
            if (currentClip === 0 && initialPlay) {
                setPlaying(true);
                setTimeout(() => {
                    setPlaying(false);
                    setRestart(true);
                    setTimeout(() => {
                        setPlaying(true);
                        setRestart(false);
                    }, 50); // Quick restart to fix Chrome issue
                }, 50);
                setInitialPlay(false);
            } else {
                setPlaying(true);
            }
        }
    };

    const resetPlayer = () => {
        setPlaying(false);
        setCurrentClip(0);
        setInitialPlay(true);
        playerRefs.current.forEach((ref, index) => {
            const clipData = jsonData.videoTrack[index];
            ref.current.seekTo(clipData.startTime, 'seconds');
        });
    };

    useEffect(() => {
        if (playing && !restart) {
            const clipData = jsonData.videoTrack[currentClip];
            playerRefs.current[currentClip].current.seekTo(clipData.startTime, 'seconds');
        }
    }, [currentClip, playing, restart, jsonData.videoTrack]);

    return (
        <div
            style={{ position: 'relative', paddingTop: '56.25%' }}
            onTouchStart={handleStart}
            onClick={handleStart}
        >
            {jsonData.videoTrack.map((clip, index) => (
                <ReactPlayer
                    key={index}
                    ref={playerRefs.current[index]}
                    url={clip.url}
                    playing={playing && index === currentClip}
                    onReady={handleReady(index)}
                    onProgress={index === currentClip ? handleProgress : undefined}
                    progressInterval={100}
                    width="100%"
                    height="100%"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        opacity: index === currentClip ? 1 : 0,
                        pointerEvents: index === currentClip ? 'auto' : 'none',
                        transition: 'opacity 0.5s ease'
                    }}
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
            ))}
            {!playing && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer'
                }}>
                    Touch to Play
                </div>
            )}
        </div>
    );
};

export default VideoPlayer;