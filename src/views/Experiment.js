import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Transcript from "../components/Transcript";

function Experiment() {
    return (<div style={{
        display: "flex",
        flexDirection: "row",
        margin: 10
    }}>
        <VideoPlayer />
        <Transcript />
    </div>);
}

export default Experiment;