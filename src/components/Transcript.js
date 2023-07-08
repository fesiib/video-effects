import React from "react";

import { observer } from "mobx-react-lite";

import useRootContext from "../hooks/useRootContext";

const Transcript = observer(function Transcript() {
    const { uiStore } = useRootContext();
    return <div style={{
        display: "flex",
        flexDirection: "column",
        margin: 10
    }}>
        <h2
            style={{
            }}
        > Transcript: </h2>
        <div
            style={{
                overflow: "scroll",
                height: uiStore.videoSize.height,
                border: "1px solid black"
            }}
        >
            {uiStore.videoMetadata.transcript.map((piece, idx) => {
                let timeParts = piece.start.split(":");
                let startDate = timeParts[1] + ":" + timeParts[2].split(".")[0];
                console.log(startDate);
                return (<div 
                    key={idx}
                    style={{
                        textAlign: "justify",
                        borderBottom: "2px solid black",
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                > 
                    <span> ({startDate}) </span>
                    <span> {piece.text} </span>
                </div>);
            })}
        </div>
    </div>
});

export default Transcript;