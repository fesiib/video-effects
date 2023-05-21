import { makeAutoObservable } from "mobx";

import axios from 'axios'

const ADDR = "http://localhost:7777/"

const REQUEST_TYPES = {
    youtubeLink: {
        serverAddr: ADDR,
        route: "process_youtube_link"
    }
};

class UIStore {
    // Session Info
    accountId = "test";
    projectId = "test";

    // showPlayer = false;
    // videoLink = null;

    showPlayer = true;
    videoLink = "https://youtu.be/XqdDMNExvA0";
    videoMetadata = {
        duration: 0,
        moments: [],
        transcript: [],
    };
    videoPlaying = false;
    videoCurrentTime = 0;
    videoSize = {
        width: 640,
        height: 320,
    };
        

    constructor(rootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.rootStore = rootStore;
        this.processYoutubeLink();
    }

    updateVideoLink(videoLink) {
        this.videoLink = videoLink;
        this.showPlayer = true;
        this.processYoutubeLink();
    }

    updateVideoMetadata(duration, videoCurrentTime) {
        this.videoMetadata = {
            ...this.videoMetadata,
            duration: duration,
        };
        this.videoPlaying = false;
        this.videoCurrentTime = videoCurrentTime;
    }

    processYoutubeLink() {
        const requestCfg = REQUEST_TYPES.youtubeLink;
        axios.post(requestCfg.serverAddr + requestCfg.route, {
            videoLink: this.videoLink,
        }).then( (response) => {
            console.log(response);
            if (response.data.status === "error") {
                alert("Could not process the youtube link")
                return;
            }
            const moments = response.data.moments;
            const transcript = response.data.transcript;
            this.videoMetadata = {
                ...this.videoMetadata,
                moments,
                transcript
            };
        });
    }
}

export default UIStore;