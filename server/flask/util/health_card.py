import os
import easyocr
import cv2
import uuid
import base64


def health_card_parse(img_data):
    img_data = "/" + img_data.strip("data:image/jpeg;base64,")
    filename = str(uuid.uuid4()) + ".jpg"
    with open(filename, "wb") as f:
        f.write(base64.b64decode(img_data))
    IMAGE_PATH = filename
    reader = easyocr.Reader(['en'])
    result = reader.readtext(IMAGE_PATH, paragraph="False")
    string = result[-1][-1]
    start_index = string.find("Health Sante")
    end_index = string.find("BORNI")
    health_card_num = string[end_index - 16:end_index - 1]
    health_card_num = health_card_num.replace(" ", "-")
    health_card_name = string[start_index + 13:end_index - 17]
    os.remove(filename)
    return [health_card_num, health_card_name]
