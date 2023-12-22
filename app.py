# from flask import Flask, render_template, Response, redirect, url_for, request
# from flask_sqlalchemy import SQLAlchemy
# import cv2
# from requests import post
#
# app = Flask(__name__)
# app.config['SECRET_KEY'] = "HelloCB"
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
# db = SQLAlchemy(app)
#
#
# def cam():
#     qcd = cv2.QRCodeDetector()
#     cap = cv2.VideoCapture(0)
#     while True:
#         ret, frame = cap.read()
#
#         if ret:
#             ret_qr, decoded_info, points, _ = qcd.detectAndDecodeMulti(frame)
#             if ret_qr:
#                 for s, p in zip(decoded_info, points):
#                     if s:
#                         print(s)
#                         color = (0, 255, 0)
#                         return redirect(url_for('show_prescription'))
#                     else:
#                         color = (0, 0, 255)
#                     frame = cv2.polylines(frame, [p.astype(int)], True, color, 8)
#         _, buffer = cv2.imencode('.jpg', frame)
#         frame_bytes = buffer.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
#
#
# @app.route('/scanner')
# def scanner():
#     a = cam()
#     print(type(a))
#     return Response(a, mimetype='multipart/x-mixed-replace; boundary=frame')
#
#
# @app.route('/')
# def scan():  # put application's code here
#     return render_template('scan.html')
#
#
# @app.route('/showpresciption')
# def show_prescription():
#     # data = request.args.get('data')
#     # server = "http://"
#     # res = post(server, json={"pid": f"{pid}"}).json()
#     # res = request.json
#     # print(res)
#     return render_template('prescription.html')
#
#
# if __name__ == '__main__':
#     app.run(debug=True, port=5000, host='0.0.0.0')

from flask import Flask, render_template, Response, redirect, url_for, current_app
from flask_sqlalchemy import SQLAlchemy
import cv2

app = Flask(__name__)
app.config['SECRET_KEY'] = "HelloCB"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db = SQLAlchemy(app)

# Global variable to signal QR code detection
qr_detected = False


def getQR():
    global qr_detected

    qcd = cv2.QRCodeDetector()
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()

        if ret and not qr_detected:
            ret_qr, decoded_info, points, _ = qcd.detectAndDecodeMulti(frame)
            if ret_qr:
                for s, p in zip(decoded_info, points):
                    if s:
                        print(s)
                        return s
                    else:
                        color = (0, 0, 255)
                        frame = cv2.polylines(frame, [p.astype(int)], True, color, 8)


@app.route('/scanner')
def scanner():
    a = getQR()
    return redirect(url_for('show_prescription'))


@app.route('/')
def scan():
    return render_template('scan.html')


@app.route('/showprescription')
def show_prescription():
    meds = [{"Name": "xyz", "Qty": 3, "Des": "200ml"}]
    return render_template('prescription.html', meds=meds)


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
