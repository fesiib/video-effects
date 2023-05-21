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
                border: "1px solid black"
            }}
        >
            {uiStore.videoMetadata.transcript.map((piece, idx) => {
                return (<div 
                    key={idx}
                    style={{
                        borderBottom: "2px solid black",
                        paddingBottom: 5,
                        paddingTop: 5,
                    }}
                > 
                    <span> ({piece.start} : {piece.finish}) </span>
                    <span> {piece.text} </span>
                </div>);
            })}
        </div>
    </div>
});

export default Transcript;