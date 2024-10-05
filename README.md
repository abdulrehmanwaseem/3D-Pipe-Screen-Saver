# The Pipe Screen Saver (Windows-95)

![The Pipe Dream](https://res.cloudinary.com/dgljsrfmk/image/upload/v1728117891/nii0qxevrsmwgrmuczen.png)

An Electron.js desktop application with a React and TypeScript setup, built to create a dynamic 3D pipe screensaver. This project is a nod to the nostalgic Windows 95 pipe screensaver but with modern technologies and improved visual effects.

## Technologies Used

- **Electron.js**: Desktop application framework.
- **Three.js**: For rendering 3D graphics and animations.
- **React**: Frontend framework for building user interfaces.
- **TypeScript**: For type safety and better development experience.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Using as a Screen Saver](#using-as-a-screen-saver)
- [Development](#development)
- [Build](#build)
- [Recommended IDE Setup](#recommended-ide-setup)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **3D Pipe Animation**: A dynamic, evolving 3D pipe structure, reminiscent of classic screen savers.
- **Cross-Platform Support**: The app can be built and run on Windows, macOS, and Linux.
- **Real-time Rendering**: Real-time rendering of 3D pipes using Three.js.
- **Optimized Performance**: Optimized to balance 3D complexity while maintaining high FPS.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abdulrehmanwaseem/3D-Pipe-Screen-Saver
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Using as a Screen Saver

Once you have built the application, you can use it as your operating system's screen saver by following these steps:

1. **Build the application:**

   After running the build command for your operating system, an installer will be generated.

   - **For Windows:**
     ```bash
     npm run build:win
     ```

2. **Install the Screen Saver:**

   After installation, locate the generated `.exe` file in the output directory.

3. **Change the File Extension:**

   - Rename the `.exe` file to `.scr`. For example, change `3D Pipe Screen Saver.exe` to `3D Pipe Screen Saver.scr`.

4. **Install the Screen Saver:**

   - Right-click on the renamed `.scr` file and select **Install**. This will open the Windows Screen Saver dialog.

5. **Select and Apply:**

   - In the Screen Saver dialog, select the Pipe Screen Saver from the list and click **Apply** to enjoy your nostalgic 3D experience!

## Development

To start the application in development mode:

```bash
npm run dev
```

## Build

To build the application for your operating system:

- **For Windows:**

  ```bash
  npm run build:win
  ```

- **For macOS:**

  ```bash
  npm run build:mac
  ```

- **For Linux:**

  ```bash
  npm run build:linux
  ```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Contributing

Contributions are welcome! Please feel free to submit a pull request if you'd like to help improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to contact [Abdul Rehman](mailto:abdulrehman.code1@gmail.com).
