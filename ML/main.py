from cv2 import cv2
import face_recognition
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin
import base64
from flask import jsonify

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


def load_images_from_b64(dataJson):
    for index in range(0, len(dataJson["data"])):
        b64_str = dataJson["data"][index]["2"]
        b64_data = base64.b64decode(b64_str)
        filename = "./input/dataset/image{}.png".format(index + 1)
        with open(filename, 'wb') as f:
            f.write(b64_data)


def create_names_arr(dataJson):
    namesArr = []
    for index in range(0, len(dataJson["data"])):
        namesArr.append(dataJson["data"][index]["1"])
    return namesArr


@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == "POST":
        dataJson = request.get_json()
        load_images_from_b64(dataJson)
        namesArr = create_names_arr(dataJson)

        # Open the input movie file
        input_movie = cv2.VideoCapture("./input/video/laptop.mp4")
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
            # return jsonify(found=peopleFound)

        # All done!
        input_movie.release()
        cv2.destroyAllWindows()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
