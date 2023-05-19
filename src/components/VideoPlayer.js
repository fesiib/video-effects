import React, { useRef, useState } from "react";

import { observer } from "mobx-react-lite";
import { action } from "mobx";


import ReactPlayer from "react-player";

import useRootContext from "../hooks/useRootContext";
import Timeline from "./Timeline";

const VideoPlayer = observer(function VideoPlayer() {

    const { uiStore } = useRootContext();

    const videoPlayerRef = useRef();

    const [ inputVideoLink, setInputVideoLink ] = useState(uiStore.videoLink);

    const updateVideoLink = action(() => {
        if (ReactPlayer.canPlay(inputVideoLink) === false) {
            alert("Can't play the video at url: " + inputVideoLink);
            return;
        }
        uiStore.updateVideoLink(inputVideoLink);
    });

    const inputVideoLinkChange = (event) => {
        console.log(event);
        setInputVideoLink(event.target.value)
    }

    const updateVideoMetadata = action((event) => {
        console.log(event);
        uiStore.updateVideoMetadata({
            duration: event.getDuration(),
            moments: [{
                time: 5,
                title: "text caption"
            }],
        }, event.getCurrentTime());
    });

    const updateCurrentTimeVideo = action((event) => {
        uiStore.videoCurrentTime = event.playedSeconds; 
    });

    return <div style={{
    }}>
        <div>
            <label htmlFor={"video_player"} > Youtube Video Link </label>
            <input 
                id={"video_player"}
                type="url" 
                placeholder={"video URL"} 
                onChange={ inputVideoLinkChange }
                value={inputVideoLink}
            />
            <input
                id={"load_button"}
                type="button"
                onClick={ updateVideoLink }
                value={"Load"}
            />    
        </div>
        <ReactPlayer 
            ref={videoPlayerRef}
            url={uiStore.videoLink}
            playing={uiStore.videoMetadata.playing}
            progressInterval={300}
            width={uiStore.videoSize.width}
            height={uiStore.videoSize.height}
            config={{
                youtube: {
                    playerVars: {controls: 0}
                }
            }}
            onReady={updateVideoMetadata}
            onProgress={updateCurrentTimeVideo}
        />
        <Timeline 
            videoPlayerRef={videoPlayerRef}
        />
    </div>
});

export default VideoPlayer