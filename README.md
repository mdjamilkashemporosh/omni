# Omni
This is a Personal AI Assistant that utilizes the flexibility of open-source Ollama models.

## Features

- AI assistant powered by Ollama models
- Streaming support
- Frontend integration with easy-to-use HTML templates (index.html and load-tester.html)

## Prerequisites
Ensure the following are installed on your machine:

- Ollama (used for AI model serving)
- Node.js (for running the backend)
- Bun (for building and running the project)

## Installation
Clone the Repository
```bash
git clone https://github.com/mdjamilkashemporosh/omni.git
```
> Before running the project, both the `backend` and `frontend` need to be configured.

### Backend
#### 1. Install Dependencies
   
Navigate to the `backend` folder and run: 
```bash
bun install 
```
#### 2. Set up environment variables
Create a `.env` file under the `backeend` directory and add the following properties:
```bash
BASE_URL= # Ollama URL (e.g., http://localhost:1134)
MODEL= # Model name (e.g., phi4)
PORT= # Port number (e.g., 8000)
```
#### 3. Running the Backend
To run the backend in development mode:
```bash
npm run dev
```
To build the backend:
```bash
npm run build
```
To run the backend in production mode (ensure to build first):
```bash
npm run start
```

### Frontend

In your frontend code, you need to update the API URL to match your backend configuration. Navigate to the frontend folder and open the config/config.js file. Then, update the following line accordingly:

```js
export const API_URL = '';  // (e.g., http://localhost:8000/chat)
```

# 🚀  Once your backend is running and the frontend is set up, open the HTML file in your browser to interact with the application. 🚀 
## Contribution

We welcome contributions to improve this project! Here are some ways you can contribute:

- **Bug Fixes**: If you find a bug, please submit an issue on GitHub and, if possible, provide a fix in a pull request.
- **Feature Requests**: Have an idea for a new feature? Open an issue with a description of the feature, and we can discuss it.
- **Code Improvements**: Feel free to suggest or submit code improvements for better performance, cleaner code, etc.

### Steps to Contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes.
4. Run tests (if applicable) and ensure everything works as expected.
5. Create a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.

## Issues

If you encounter any issues or have questions, please feel free to open an issue on GitHub. Make sure to include relevant information such as error messages, system environment, and steps to reproduce the issue.
