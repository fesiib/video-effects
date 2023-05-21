from flask import Flask
from flask_cors import CORS
from flask import request, send_file

from pathlib import Path

import json

from processor import process_video

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])

app.config["UPLOAD_EXTENSIONS"] = [".mp4", ".jpg", ".png", "webm"]

FILE = Path(__file__).resolve()
ROOT = FILE.parents[0]

def fail_with(msg):
    return {
        "status": "failed",
        "message": msg,
    }

@app.route("/process_youtube_link", methods=["POST"])
def process_youtube_link():
    decoded = request.data.decode('utf-8')
    request_json = json.loads(decoded)
    video_link = request_json["videoLink"]
    
    print(request_json)

    # Extract transcript
    # Extract OCR results per frame
    # Group OCR results based on similarity
    # Map transcript to OCR
    # moment: {
    #   "start": 0,
    #   "finish": 0,
    #   "transcriptStart": 0,
    #   "transcriptFinish": 0,
    #   "title": "text caption",
    # }

    # result = {
    #   "moments": list[moments]
    #   "transcript": list[transcript]
    # }

    video_path = download_youtube_video(video_link)
    transcript, moments = process_video(video_path)

    responseJSON = {
        "request": {
            "videoLink": video_link,
        },
        "moments": moments,
        "transcript": transcript,
        "status": "success"
    }
    return json.dumps(responseJSON)

def test_video(video_link):
    transcript, moments, metadata = process_video(video_link)
    #print(transcript)
    #print(moments)


def launch_server():
    app.run(host="0.0.0.0", port=7777)

if __name__ == "__main__":
    #test_video("https://www.ssyoutube.com/watch?v=XqdDMNExvA0")
    #test_video("https://youtu.be/XqdDMNExvA0")
    test_video("https://youtu.be/pZ3HQaGs3uc")
    #launch_server()