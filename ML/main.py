from cv2 import cv2
import face_recognition
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
# import base64
from flask import jsonify
import requests
import boto3
from botocore.config import Config
import moviepy.editor as moviepy
import os
# import subprocess

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

s3Config = Config(
    region_name = 'ap-south-1',
    signature_version = 'v4',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

def convert_avi_to_mp4(avi_file_path, output_name):
    os.popen("ffmpeg -i '{input}' -ac 2 -b:v 2000k -c:a aac -c:v libx264 -b:a 160k -vprofile high -bf 0 -strict experimental -f mp4 '{output}.mp4'".format(input = avi_file_path, output = output_name)).read()
    return True

def create_names_arr(dataJson):
    namesArr = []
    for index in range(0, len(dataJson["data"])):
        namesArr.append(dataJson["data"][index]["name"])
    return namesArr

def save_student_images(dataJson):
    for index in range(0, len(dataJson["data"])):
        # b64_str = dataJson["data"][index]["2"]
        # b64_data = base64.b64decode(b64_str)
        url = dataJson["data"][index]["imageUrl"]
        r = requests.get(url) 
        filename = "./input/dataset/image{}.png".format(index + 1)
        with open(filename, 'wb') as f:
            f.write(r.content)

def save_video(url):
    r = requests.get(url) 
    with open("./input/video/video.mp4",'wb') as f: 
        f.write(r.content)
    return True

def upload_video_s3(videoPath):
    s3 = boto3.client('s3')
    with open(videoPath, 'rb') as data:
        s3.upload_fileobj(data, 'facialr', 'python.avi', ExtraArgs={'ACL': 'public-read'})
    print('uploaded to s3')
    return "https://facialr.s3.ap-south-1.amazonaws.com/python.avi"


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == "POST":
        dataJson = request.get_json()
        save_student_images(dataJson)
        namesArr = create_names_arr(dataJson)
        save_video(dataJson['videoUrl'])
        # Open the input movie file
        input_movie = cv2.VideoCapture("./input/video/video.mp4")
        length = int(input_movie.get(cv2.CAP_PROP_FRAME_COUNT))

        # Create an output movie file (make sure resolution/frame rate matches input video!)
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        output_movie = cv2.VideoWriter(
            # for hamilton:
            # './output/output.avi', fourcc, 29.97, (640, 360))
            # for laptop:
            './output/output.avi', fourcc, 15.09, (1280, 720))

        # Initialize some variables for recognizing faces
        images = {}
        faceEncodings = {}
        known_faces = []
        totalImages = 3
        imageCount = 0
        # Load the face pictures and learn how to recognize them.
        for imageCount in range(1, (totalImages + 1)):
            images["image{0}".format(imageCount)] = face_recognition.load_image_file(
                "./input/dataset/image{0}.png".format(imageCount))
            faceEncodings["image{0}".format(imageCount)] = face_recognition.face_encodings(
                images["image{0}".format(imageCount)])[0]
            known_faces.append(faceEncodings["image{0}".format(imageCount)])

        # Initialize some variables
        face_locations = []
        face_encodings = []
        face_names = []
        frame_number = 0
        peopleFound = []

        while True:
            # Grab a single frame of video
            ret, frame = input_movie.read()
            frame_number += 1

            # Quit when the input video file ends
            if not ret:
                break

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_frame = frame[:, :, ::-1]

            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_frame)
            face_encodings = face_recognition.face_encodings(
                rgb_frame, face_locations)

            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                match = face_recognition.compare_faces(
                    known_faces, face_encoding, tolerance=0.50)

                # Search for the associated name
                count = 0
                while count < len(namesArr):
                    name = None
                    if not match[count]:
                        count += 1
                        continue
                    name = namesArr[count]
                    face_names.append(name)
                    if namesArr[count] not in peopleFound:
                        peopleFound.append(namesArr[count])
                    count += 1

            # Label the results
            for (top, right, bottom, left), name in zip(face_locations, face_names):
                if not name:
                    continue

                # Draw a box around the face
                cv2.rectangle(frame, (left, top),
                              (right, bottom), (0, 0, 255), 2)

                # Draw a label with a name below the face
                cv2.rectangle(frame, (left, bottom - 25),
                              (right, bottom), (0, 0, 255), cv2.FILLED)
                font = cv2.FONT_HERSHEY_DUPLEX
                cv2.putText(frame, name, (left + 6, bottom - 6),
                            font, 0.5, (255, 255, 255), 1)

            # Write the resulting image to the output video file
            print("Writing frame {} / {}".format(frame_number, length))
            print("found:", name)
            output_movie.write(frame)
            

        # All done!
        input_movie.release()
        cv2.destroyAllWindows()
        convert_avi_to_mp4('./output/output.avi','./output/output' )
        uploaded_url = upload_video_s3('./output/output.mp4')
        return jsonify(found=peopleFound, s3_url=uploaded_url)
        
        


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
