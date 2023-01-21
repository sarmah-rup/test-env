# Import necessary libraries
from flask import Flask, jsonify, request
from sklearn.cluster import KMeans
from collections import Counter
from PIL import Image
import numpy as np
import io
import base64
import os

app = Flask(__name__)


# Get the current working directory
base_dir = os.getcwd()

# Construct the full path to the images directory
images_dir = os.path.join(base_dir, "images")

# Create the images directory if it doesn't exist
if not os.path.exists(images_dir):
    os.makedirs(images_dir)

# Construct the full path to the image file
image_path = os.path.join(images_dir, "image.jpg")

# Save the image to the server at the specified path
with open(image_path, "wb") as f:
    f.write(image_data)


@app.route('/process-image', methods=['POST'])
def process_image():
    image_file = request.files['image']
    image_path = os.path.join(images_dir, image_file.filename)
    image_file.save(image_path)

def process_image():
    # Get the image data from the request
    image_data = request.get_data()
    # Decode the image data
    image_data = base64.b64decode(image_data)
    # Open the image using PIL
    image = Image.open(io.BytesIO(image_data))
    # Convert the image to a numpy array
    image = np.array(image)
    # Perform k-means clustering
    kmeans = KMeans(n_clusters=5)
    kmeans.fit(image.reshape(-1, 3))
    # Get the frequency of each color
    color_freq = Counter(kmeans.labels_)
    # sort the colors by frequency
    dominant_colors = sorted(color_freq, key=color_freq.get, reverse=True)
    # Convert the cluster centers to a list of tuples (RGB values)
    dominant_colors = kmeans.cluster_centers_[dominant_colors].tolist()
    # Return the dominant colors as a JSON response
    return jsonify(dominant_colors)

if __name__ == '__main__':
    app.run(debug=True)
