# EZTechMovie - StreamList App

EZTechMovie's **StreamList** is a modern streaming service manager that helps users discover, manage, and simulate checkout for streaming content subscriptions, movies, and TV shows. Built as part of a Capstone project, this full-stack web app leverages Google OAuth, live API data, and intelligent cart logic.

## Features

- **Google OAuth Login** – Seamless authentication with user profile display and secure access to features
- **Live Movie/TV Search** – Fetches dynamic content from TheMovieDB API with real-time updates
- **Smart Cart System** – Add one subscription and one media item at a time with auto-prevention of duplicates
- **Credit Card Checkout** – Simulated payment form (credit card info stored only in session, never persisted)
- **Persistent Cart** – localStorage saves cart items between sessions (when signed in)
- **Responsive UI** – Fully styled interface with consistent card layout and adaptive navigation

## Project Structure


- `App.jsx` – Main app routes and layout
- `Navigation.jsx` – Google login, profile dropdown, and navigation bar
- `LoginButton.jsx` – Launches Google OAuth login process
- `Callback.jsx` – Handles Google OAuth token exchange and stores user data
- `ProfileDropdown.jsx` – Displays user profile image, name, and logout option
- `Home.jsx` – Welcome page with hero section and call-to-action
- `About.jsx` – Static page with application details and credits
- `Movies.jsx` – Displays subscription products and API-based movie/TV cards (login required)
- `movieData.jsx` – API integration for TMDB content (movies and shows)
- `data.jsx` – Static product data (streaming subscriptions)
- `Cart.jsx` – Displays cart contents with checkout and warning logic
- `CartContext.jsx` – Global cart state, duplication prevention, localStorage sync
- `CreditCardForm.jsx` – Modal popup for secure payment input
- `index.css` / `styles.css` – App-wide custom styling

## Tech Stack
- React (Vite)
- JavaScript (ES6+)
- Google OAuth 2.0
- TMDB API
- localStorage
- CSS (custom)

## Team Contributions
- **Avery Krouskop** – Cart Logic, Credit Card Form, TMDB Integration, Conditional Logic, Movie/TV Scrollable Grid
- **Manuel Ochoa** – Google OAuth, Navigation UI, Login Flow
- **Kolton Tarango** – localStorage Persistence 
- **Erin Weathers** – App Styling, Responsive Layout, Visual Polish

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AKrouskop/streamlist
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

> You'll need a TMDB API key and Google OAuth credentials in a `.env` file to enable full functionality.

## License
This project is for educational purposes only as part of the INT 499 Capstone at The University of Arizona Global Campus.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
