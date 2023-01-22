from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
from PIL import Image
import numpy as np
import os

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload():
    # Get the image file from the request
    image = request.files["image"]
    # Open the image file and convert it to RGB
    img = Image.open(image).convert("RGB")
    # Reshape the image to a 2D array of pixels
    pixels = np.array(img).reshape(-1, 3)
    # Apply KMeans clustering to the pixels
    kmeans = KMeans(n_clusters=5)
    kmeans.fit(pixels)
    # Get the dominant colors
    dominant_colors = kmeans.cluster_centers_
    # Save the image to the server
    image.save(os.path.join("static", image.filename))
    # Return the dominant colors in a JSON response
    return jsonify(dominant_colors=dominant_colors)

if __name__ == "__main__":
    app.run(debug=True)
