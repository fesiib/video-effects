import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import Transcript from "../components/Transcript";
import CommentWall from "../components/CommentWall";

function Experiment() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            margin: 10 
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                margin: 10
            }}>
                <VideoPlayer />
                <Transcript />
            
            </div>
            <CommentWall />
        </div>
    );
}

export default Experiment;