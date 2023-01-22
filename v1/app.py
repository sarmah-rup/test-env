from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
from PIL import Image
import numpy as np

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    # Get the image file from the request
    image_file = request.files['image']
    image_file.save('image.jpg')
    
    # Open the image file and convert it to a numpy array
    img = Image.open('image.jpg')
    img = np.array(img)

    # Reshape the image array
    img = img.reshape(-1, 3)

    # Perform KMeans clustering on the image array
    kmeans = KMeans(n_clusters=5, random_state=0).fit(img)

    # Get the dominant 5 colors
    dominant_colors = kmeans.cluster_centers_

    # Convert the colors to hex format
    dominant_colors = ['#%02x%02x%02x' % tuple(color) for color in dominant_colors]

    return jsonify(dominant_colors)

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=80)
