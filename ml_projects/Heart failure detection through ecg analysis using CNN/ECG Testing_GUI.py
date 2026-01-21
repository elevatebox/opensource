
import tkinter as tk
from tkinter import filedialog
from tkinter import *
from PIL import Image, ImageTk
import numpy as np
from keras.models import load_model

# Initialising GUI
top = tk.Tk()
top.geometry('800x600')
top.title('Heart Disease Detection')
top.configure(background='#F0E68C')  # Set background color to a soothing yellow

# Loading the model
model = load_model('model_vgg19.h5')

# Function to detect heart disease
def detect(file_path):
    try:
        img = Image.open(file_path)
        img = img.resize((224, 224))  # Resize the image to the required size
        img_array = np.array(img)  # Convert image to numpy array

        # Ensure image has 3 channels (RGB)
        if img_array.shape[-1] == 4:
            img_array = img_array[..., :3]  # Keep only the first 3 channels

        # Preprocess the image data (normalize pixel values)
        img_array = img_array.astype('float32') / 255.0

        # Expand the dimensions of the image array to match the model input shape
        img_array = np.expand_dims(img_array, axis=0)

        # Predict using the model
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction) + 1  # Adjust index to start from 1


        if predicted_class == 1:
            label1.configure(foreground='#011638', text="Uninfected")
        else:
            predicted_class = np.where(prediction ==np.max(prediction))
            reverse_mapping = ['F','M','N','Q','S','V']
            prediction_name = reverse_mapping[predicted_class[1][0]]
            label1.configure(foreground='#011638', text="Infected" + " " + "Final Diagnosis-" + prediction_name)
    except Exception as e:
        print("Error:", e)
        label1.configure(foreground='#011638', text="Error occurred!")

# Function to show detect image button
def show_detect_buttons(file_path):
    Detect_b = Button(top, text="Detect Image", command=lambda: detect(file_path), padx=10, pady=5)
    Detect_b.configure(background="#008080", foreground='white', font=('Arial', 10, 'bold'))  # Set button color to teal
    Detect_b.place(relx=0.76, rely=0.49)

# Function to upload image
def upload_image():
    try: 
        file_path = filedialog.askopenfilename()
        uploaded = Image.open(file_path)
        uploaded.thumbnail(((top.winfo_width() / 2.25), (top.winfo_height() / 2.25)))
        im = ImageTk.PhotoImage(uploaded)
        sign_image.configure(image=im)
        sign_image.image = im
        label1.configure(text='')
        show_detect_buttons(file_path)
    except Exception as e:
        print("Error:", e)

# GUI components
sign_image = Label(top)
upload = Button(top, text="Upload Image", command=upload_image, padx=10, pady=5)
upload.configure(background="#008080", foreground='white', font=('Arial', 10, 'bold'))  # Set button color to teal
upload.pack(side='bottom', pady=20)
sign_image.pack(side='bottom', expand=True)
label1 = Label(top, background='#F0E68C', font=('Arial', 15, 'bold'))  # Set label background to the same yellow color
label1.pack(side='bottom', expand=True)
heading = Label(top, text="Heart Disease Detection", font=('Arial', 20, 'bold'), bg='#F0E68C', pady=10)  # Set heading background to the same yellow color
heading.pack()

top.mainloop()

