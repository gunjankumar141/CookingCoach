import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.inception_v3 import InceptionV3, preprocess_input, decode_predictions
import numpy as np
import ssl

# Disable SSL certificate verification (use with caution)
ssl._create_default_https_context = ssl._create_unverified_context


# Load the pre-trained InceptionV3 model



def detect(filepath='sample_food.jpg'):
    model = InceptionV3(weights='imagenet')
    # Function to preprocess the image
    def preprocess_image(img_path):
        img = image.load_img(img_path, target_size=(299, 299))  # InceptionV3's input size
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        return preprocess_input(img_array)

    # Function to get predictions
    def predict_image(image_path, top_k=5):
        preprocessed_img = preprocess_image(image_path)
        predictions = model.predict(preprocessed_img)
        decoded_predictions = decode_predictions(predictions, top=top_k)[0]

        results = []
        for prediction in decoded_predictions:
            class_name = prediction[1]
            probability = prediction[2]
            results.append((class_name, probability))

        return results

    # Example usage
    image_path = './static/images/'+filepath
    results = predict_image(image_path)

    # Print the top predictions
    # for class_name, probability in results:
    #     print(f"Class: {class_name}, Probability: {probability:.4f}")
    
    # print(results)
    ingredient_list = [i[0] for i in results]
    # print(ingredient_list)
    
    return ingredient_list
        

