from flask import Flask, request
from sklearn.cluster import KMeans
from PIL import Image

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload():
    image = request.files["image"]
    image = Image.open(image)
    image = image.resize((150, 150))
    pixels = image.load()
    width, height = image.size
    pixels = [pixels[i, j] for i in range(width) for j in range(height)]
    kmeans = KMeans(n_clusters=5).fit(pixels)
    return kmeans.cluster_centers_
