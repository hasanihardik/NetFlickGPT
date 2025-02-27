# NetFlickGPT

NetFlickGPT is a smart movie recommendation platform that integrates GPT-based suggestions with Netflix. Just describe what you're in the mood for, and NetFlickGPT will find the perfect movie for you! With a seamless authentication system and instant Netflix redirection, discovering and watching movies has never been easier.

## Features
- **AI-Powered Recommendations**: Uses the Gemini API to understand user prompts and suggest relevant movies.
- **Netflix Integration**: Instantly redirects users to Netflix to start watching recommended movies.
- **TMDB API Support**: Fetches detailed movie information, trailers, ratings, and descriptions.
- **User Authentication**: Firebase authentication for secure login and personalized recommendations.
- **Modern UI**: Built with React and styled using Tailwind CSS for a clean, responsive experience.

## Tech Stack
- **Frontend**: React, JavaScript, Tailwind CSS
- **Backend & APIs**:
  - TMDB API (The Movie Database) for movie data
  - Gemini API for AI-driven recommendations
  - Firebase for authentication

## Installation & Setup
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/netflickgpt.git
   cd netflickgpt
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up Firebase authentication**:
   - Create a Firebase project.
   - Enable authentication (Google, email/password, or other preferred method).
   - Get Firebase config and add it to `.env`:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     ```
4. **Set up TMDB API**:
   - Create an account at [TMDB](https://www.themoviedb.org/).
   - Generate an API key.
   - Add it to `.env`:
     ```env
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     ```
5. **Set up Gemini API**:
   - Get access to the Gemini API.
   - Add the key to `.env`:
     ```env
     REACT_APP_GEMINI_API_KEY=your_gemini_api_key
     ```
6. **Run the application**:
   ```sh
   npm start
   ```

## Usage
1. Log in using Firebase authentication.
2. Enter a description of what you're in the mood for (e.g., "a mind-bending thriller with a strong female lead").
3. NetFlickGPT fetches relevant movie recommendations using the Gemini API and TMDB.
4. Click on a recommendation to be redirected to Netflix.

## Contributing
Contributions are welcome! Feel free to fork the repo, create a new branch, and submit a pull request.


## Contact
For any inquiries or suggestions, reach out to **howtohardik@gmail.com**.
