import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import useRootContext from "../hooks/useRootContext";
import { action } from "mobx";

const Timeline = observer(function Timeline( {videoPlayerRef} ) {

    const { uiStore } = useRootContext();

    const videoTimeline = useRef();

    const setPlaying = action(() => {
        uiStore.videoMetadata.playing = !uiStore.videoMetadata.playing;
    });

    const seekTo = action((event) => {
        const clientRect = videoTimeline.current.getBoundingClientRect();
        const videoTime = (event.clientX - clientRect.x) / clientRect.width;
        videoPlayerRef.current.seekTo(videoTime, "fraction");
    });

    return (<div>
        <input
            id={"video_play_button"}
            type="button"
            onClick={ setPlaying }
            value={uiStore.videoMetadata.playing ? "Pause" : "Play"}
        />
        <div>
            {Math.round(uiStore.videoCurrentTime * 10) / 10} / {uiStore.videoMetadata.duration}
        </div>
        <div
            id={"video_timeline"}
            ref={videoTimeline}
            style={{
                width: uiStore.videoSize.width,
                height: 60,
                backgroundColor: "green"
            }}
            onClick={seekTo}
        >
            <div id="indicator" style={{
                position: "relative",
                height: 60,
                width: 1,
                backgroundColor: "black",
                left: (uiStore.videoMetadata.duration ? 
                    (uiStore.videoCurrentTime / uiStore.videoMetadata.duration) * uiStore.videoSize.width
                    : 0
                )
            }}></div>
            {uiStore.videoMetadata.moments.map((moment, idx) => {
                const curId = "moment" + idx;
                const curLeft = (uiStore.videoMetadata.duration ? 
                    (moment.start / uiStore.videoMetadata.duration) * uiStore.videoSize.width
                    : 0
                );
                return (
                    <div key={curId} id={curId} style={{
                        position: "relative",
                        height: 60,
                        width: 1,
                        backgroundColor: "red",
                        left: curLeft,
                    }}> 
                        <span style={ { fontSize: 15, color: "red"} }> {moment.type} </span>
                        <span style={ { fontSize: 15} }> {moment.start} </span>
                    </div>                    
                );
            })}
        </div>
    </div>);
});

export default Timeline;