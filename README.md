# Cloud Storage Frontend (React + Vite)

A React-based frontend for a cloud storage application, similar to Google Drive. It allows users to register, log in, upload files, create folders, update profile pictures, and manage files/folders in a familiar drive-like interface.

<br />

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
  - [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Project Configuration](#project-configuration)
- [Contributing](#contributing)
- [License](#license)
- [Credits & Acknowledgements](#credits--acknowledgements)

<br />

## Features

1. **User Registration & Authentication**  
   - Sign up with email, username, and password.  
   - Email-based OTP verification flow.  
   - Login and Logout functionality.

2. **Dashboard**  
   - Displays folders and files in a grid layout.  
   - Create new folders, upload and download files.  
   - Navigate through folders (root folder, subfolders, parent folders).  
   - Search bar placeholder (not yet connected to search functionality).

3. **Profile Picture Uploader**  
   - Update and compress profile images.  
   - Shows image preview and progress bar.

4. **Responsive UI with Bootstrap**  
   - Uses React-Bootstrap and standard Bootstrap styling.  
   - Mobile-friendly design.

5. **Environment-Based Configuration**  
   - Uses `VITE_BACKEND_URL` to dynamically configure the backend URL.

<br />

## Screenshots

| Landing Page | Dashboard |
| :---: | :---: |
| ![Landing Page Screenshot](https://user-images.githubusercontent.com/XXXXXXX/landing-page.png) | ![Dashboard Screenshot](https://user-images.githubusercontent.com/XXXXXXX/dashboard.png) |

*(Replace with actual images if desired.)*

<br />

## Directory Structure

```
SnazzyNivesh522-Cloud-Storage-Frontend-React/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── ...
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── api/
    │   └── axiosInstance.js
    ├── components/
    │   ├── CreateFolderModal.jsx
    │   ├── Dashboard.jsx
    │   ├── FileCard.jsx
    │   ├── FileGrid.jsx
    │   ├── Header.jsx
    │   ├── LandingPage.jsx
    │   ├── Login.jsx
    │   ├── NavigationBar.css
    │   ├── NavigationBar.jsx
    │   ├── ProfileImageUploader.jsx
    │   ├── Register.jsx
    │   ├── Spinner.jsx
    │   └── UploadFileModal.jsx
    └── contexts/
        └── AuthContext.js
```

Brief description of important files and directories:

- **`index.html`**  
  The main HTML file served by Vite.  

- **`src/App.jsx`**  
  The root component that sets up routing (React Router) and provides the authentication context.

- **`src/main.jsx`**  
  Entry point for the React application; renders `App` into the DOM.

- **`src/contexts/AuthContext.js`**  
  Provides a global AuthContext for managing user authentication state (token storage, login/logout handlers).

- **`src/api/axiosInstance.js`**  
  Preconfigured Axios instance that automatically includes auth tokens in requests.

- **`src/components/...`**  
  A collection of reusable UI components:
  - **`Dashboard`**: Main drive-like view of folders/files.  
  - **`Header`**: Top navigation bar with user profile and logout.  
  - **`LandingPage`**: Public home page for users who are not logged in.  
  - **`Login`** & **`Register`**: Authentication forms.  
  - **`CreateFolderModal`** & **`UploadFileModal`**: Modals to create a new folder or upload files.  
  - **`FileGrid`** & **`FileCard`**: Components for displaying files and folders in a grid.  
  - **`ProfileImageUploader`**: Modal to upload and compress profile images.  
  - **`NavigationBar`**: Simple bar with 'Back', 'Upload File', and 'Create Folder' buttons.  
  - **`Spinner`**: Loading spinner.

- **`eslint.config.js`**  
  ESLint configuration file.

- **`vite.config.js`**  
  Vite configuration, including the base path for GitHub Pages deployment.

<br />

## Getting Started

### Prerequisites

- **Node.js** (>= 14.x recommended)
- **npm** (comes with Node.js)
- **Git** (optional, but preferred for version control)

Make sure you have a backend server running or an environment variable set for `VITE_BACKEND_URL` to point to your API endpoint. Otherwise, the app defaults to `http://localhost:8000/api`.

### Installation

1. **Clone the repository** (or fork and then clone):
   ```bash
   git clone https://github.com/SnazzyNivesh522/Cloud-Storage-Frontend-React.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Cloud-Storage-Frontend-React
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

<br />

## Development

### Available Scripts

In the project directory, you can run:

- **`npm run dev`**  
  Starts the development server using [Vite](https://vitejs.dev/). Open [http://localhost:5173](http://localhost:5173) (or as shown in your terminal) to view it in the browser. The page will reload if you make edits.

- **`npm run build`**  
  Builds the app for production to the `dist` folder.  

- **`npm run preview`**  
  Serves the production build locally.  

- **`npm run lint`**  
  Lints the codebase with ESLint.  

<br />

## Deployment

This project supports deployment to GitHub Pages using `gh-pages`. The configuration is set in:
- **`package.json`** (scripts `predeploy` and `deploy`)  
- **`vite.config.js`** (the `base` option)

To deploy:
1. Make sure the `"homepage"` field in `package.json` matches your GitHub repository settings, e.g. `"https://<USERNAME>.github.io/<REPO_NAME>"`.
2. Run:
   ```bash
   npm run deploy
   ```
3. Your app will be built and pushed to the `gh-pages` branch on GitHub.

<br />

## Project Configuration

- **Environment Variables**  
  Create a `.env` file in the project root (ignored by Git) to store environment variables. For example:

  ```bash
  VITE_BACKEND_URL="http://your-backend-url.com"
  ```

  If not provided, the application will default to `http://localhost:8000/api` in the `axiosInstance.js` file or the commented-out code inside `vite.config.js`.

<br />

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

All contributions are welcome. Please open an issue first to discuss potential changes.

<br />

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.

<br />

## Credits & Acknowledgements

- **[React](https://reactjs.org/)** and **[React Router](https://reactrouter.com/)** – for building the UI and handling navigation.
- **[Bootstrap](https://getbootstrap.com/)** and **[React-Bootstrap](https://react-bootstrap.github.io/)** – for styling and responsive design.
- **[Axios](https://axios-http.com/)** – for HTTP requests.
- **[Browser-Image-Compression](https://github.com/Donaldcwl/browser-image-compression)** – for client-side image compression.
- **[GitHub Pages](https://pages.github.com/)** – for hosting the demo.
- Icons & Images from various open-source resources:
  - **[Flaticon](https://www.flaticon.com/free-icons/storage)**  
  - **[Unsplash](https://unsplash.com/)**  
  - **[Placeholder.com](https://placeholder.com/)**  
  - **[Google Drive icons](https://www.google.com/drive/)**

---

**Happy Coding!** If you have any questions or suggestions, feel free to open an [issue](../../issues) or start a discussion.