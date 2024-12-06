# Silo Control

![Silo Control Logo](https://res.cloudinary.com/dpxiq34xv/image/upload/v1733488972/Viterra_gordct.svg)

**Silo Control** is a web application built with **React**, **Tailwind CSS**, and **Firestore** to help manage silo meters in real-time. It's designed to give users a simple interface for tracking silo measurements, updating values, and maintaining an efficient overview of all silo statuses.


## Live Demo

You can check out the live version of the application here:

[**Silo Control - Live Demo**](https://silocheck.netlify.app/)


## Technologies Used

- **React**: The core library for building the user interface.
- **Tailwind CSS**: A utility-first CSS framework used for designing the layout and styling.
- **Firebase Firestore**: A NoSQL cloud database for storing silo meter data in real time.


## Features

- **Real-Time Updates**: Silo meter values are updated in real-time using Firestore.
- **Dark and Light Mode**: Switch between dark and light themes seamlessly.
- **Editable Inputs**: Modify the meter values directly from the user interface.
- **Clipboard Support**: Copy meter values with one click.
  

## Screenshot

![Silo Control App Screenshot - Responsive](https://res.cloudinary.com/dpxiq34xv/image/upload/v1733488888/Mesa_de_trabajo_1_qliflh.png)

## Responsive Design

The application is fully responsive and works well on different screen sizes. Below is a screenshot that demonstrates how the app adapts to various screen sizes, from mobile devices to desktop monitors.



## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/MarcoCAVS18/silo.git

2. Navigate to the project directory:
   cd silo-control

3. Install dependencies:
    npm install 

4. Start the development server:
    npm start

5. Open your browser and go to http://localhost:3000.


## Project Structure

/public
  /index.html
  /manifest.json
/src
  /components
    - DarkModeToggle.js
    - Footer.js
    - LastUpdated.js
    - Navbar.js
    - SiloCard.js
    - SiloGrid.js
  /context
    - FirebaseContext.js
    - ThemeContext.js
  /images
    - Viterra.svg
  App.js
  FirebaseConfig.js
  index.js
  index.css
/tailwind.config.js
/package.json
/README.md


## Contributing

If you'd like to contribute to this project, feel free to fork the repository, create a branch, and submit a pull request. Please follow the guidelines for coding and write clear commit messages.


## License

This project is licensed under the MIT License - see the LICENSE file for details.



Made with ❤️ by Marco.

