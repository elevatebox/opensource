
"Create a full-stack AI application with the following specifications:

Frontend Requirements:
- Create a modern, responsive UI using vanilla HTML5, CSS3, and JavaScript (no frameworks)
- Include animated transitions and interactive elements
- Implement a dark/light theme toggle
- Add loading states and error handling
- Make it mobile-friendly with a hamburger menu
- Use CSS Grid/Flexbox for layouts
- Include input validation on the client side

Backend Requirements:
- Build a Flask REST API with the following features:
  - Implement user session management using JSON files
  - Create separate routes for different AI functionalities
  - Add error handling and logging
  - Implement rate limiting
  - Add request validation

Data Storage:
- Use JSON files for all data persistence with the following structure:
  - users.json: Store user information
  - conversations.json: Store chat history/AI interactions
  - settings.json: Store application configurations
  - Include file locking mechanism for concurrent access
  - Implement backup/recovery system for JSON files

AI Integration:
- [Specify which AI model/functionality you want to use]
- Include proper error handling for AI responses
- Implement caching for AI responses to reduce API calls
- Add fallback mechanisms for when AI service is unavailable
