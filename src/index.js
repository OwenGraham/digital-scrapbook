// import React, { useEffect } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// // List of fonts to randomly select from
// const fonts = ['Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS'];

// // Function to change the font of the h1 element to a random font
// function changeFont() {
//   const h1 = document.querySelector('#comingSoon h1');
//   const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
//   h1.style.fontFamily = randomFont;
// }

// // Wrapper component to add the event listener for changing the font
// function AppWrapper() {
//   useEffect(() => {
//     document.body.addEventListener('click', changeFont);
//     return () => {
//       document.body.removeEventListener('click', changeFont);
//     };
//   }, []);

//   return <App />;
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Note: Remember to delete the changeFont function and AppWrapper component before publishing the real webpage.
