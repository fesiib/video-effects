import { makeAutoObservable } from "mobx";

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
    }

    updateVideoLink(videoLink) {
        this.videoLink = videoLink;
        this.showPlayer = true;
    }

    updateVideoMetadata(videoMetadata, videoCurrentTime) {
        this.videoMetadata = videoMetadata;
        this.videoPlaying = false;
        this.videoCurrentTime = videoCurrentTime;
    }
}

export default UIStore;