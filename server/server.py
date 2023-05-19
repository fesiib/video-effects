from flask import Flask
from flask_cors import CORS
from flask import request, send_file

from pathlib import Path

import json

app = Flask(__name__)

CORS(app, origins=["http://localhost:3000/"])

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
    if 'video_link' not in request.form:
        return json.dumps(fail_with("No Video Link"))
    video_link = request.form["video_link"]

    # Extract transcript
    # Extract OCR results per frame
    # Group OCR results based on similarity
    # Map transcript to OCR
    # moment: {
    #   "start": 0,
    #   "finish": 0,
    #   "transcript_start": 0,
    #   "transcript_finish": 0,
    #   "title": "text caption",
    # }

    # result = {
    #   "moments": list[moments]
    #   "transcript": list[transcript]
    # }


    responseJSON = {
        "request": {
            "video_link": video_link,
        },
        "result": None,
        "status": "success"
    }
    return json.dumps(responseJSON)

def launch_server():
    app.run(host="0.0.0.0", port=7777)

if __name__ == "__main__":
    launch_server()