Project Title: Cooking Coach

**Introduction and Motivation**

Our project addresses the growing need for personalized and convenient cooking solutions. As culinary enthusiasts explore diverse cuisines and ingredients, identifying items in the kitchen and discovering suitable recipes can become challenging. Traditional methods of recipe discovery are often time-consuming, requiring extensive manual input and searching.

**Project Description**

Introducing our innovative image recognition app, designed to transform the culinary experience. By leveraging advanced object recognition technology and a sophisticated recipe generator, our app simplifies the cooking process for users of all skill levels. Here's what makes our app stand out:

Advanced Image Recognition: Users can capture images of their ingredients, and our pre-trained image recognition model swiftly identifies them. The model, trained on a diverse dataset of foods, ensures accurate identification across various cuisines and ingredients.

Personalized Recipe Suggestions: Once the ingredients are identified, our app offers personalized recipe suggestions tailored to the captured ingredients, fostering creativity and resourcefulness in the kitchen.

User-Friendly Interface: Our intuitive interface is designed for effortless navigation and accessibility, ensuring a seamless user experience.

Culinary Exploration: Beyond convenience, our app encourages users to discover new dishes based on available ingredients, promoting resourcefulness and reducing food waste.

**Technologies Used:**

Python: Utilized as the primary programming language for backend development.
Flask: Chosen as the web framework for building the backend due to its simplicity and flexibility.
OpenAI API: Integrated to leverage its advanced natural language processing capabilities for chat completion.
Inception V3 Model: Employed for image recognition tasks, specifically for identifying ingredients from images.
ImageNet Dataset: Used to train the Inception V3 model for recognizing a wide range of objects and ingredients in images.


**Workflow:**

a. Image Processing: The user uploads an image containing ingredients through the front-end interface. - The Flask backend receives the image data and passes it to the Inception V3 model for processing. - The Inception V3 model identifies objects and ingredients present in the image.

b. Chat Prompt Generation: - The identified objects are formatted into a coherent prompt for the OpenAI API. - This prompt is constructed to ask the chatbot for recipes based on the recognized ingredients.

c. Chat Completion with OpenAI: - The constructed prompt is sent to the OpenAI API for chat completion. - OpenAI's language model generates a response suggesting recipes based on the provided ingredients.

d. Recipe Presentation: - The completed recipe suggestion along with the identified ingredients and corresponding images are presented to the user through the front-end interface. Users can view the suggested recipes, along with relevant images, for further exploration.

![image](https://github.com/gunjankumar141/CookingCoach/assets/60428715/e4e63eb3-dc2d-4d6c-a0b8-f5cc6855a970)

![image](https://github.com/gunjankumar141/CookingCoach/assets/60428715/7429f364-9eac-4cc7-bb72-767db6d1ff7b)

![image](https://github.com/gunjankumar141/CookingCoach/assets/60428715/d7d6ab1d-ad3e-453e-85f0-5f7d8a7358cb)



