This project is a technical test for Mytheresa, built with React Native, Styled Components, Jest, and TypeScript. The application displays a modal with film details and applies styles based on the genre of the film.

Project Overview
   React Native: For building the mobile application.
   Styled Components: For styling the components.
   Jest: For running unit tests and ensuring code quality.
   TypeScript: For adding static types to JavaScript.
   
Installation
To get started with the project, follow these steps:

1-Clone the repository: 
   git clone https://github.com/ericmuriel/ReactNative_test-mytheresa.git
   cd testMovies
   
2-Install dependencies:
   npm install

3-Run the application:
   npm start

4-Run the tests:
   npm test


Project Structure:
   src/: Contains the source code for the application.
      components/: Contains reusable components.
      screens/: Contains screen components like FilmDetailModal.
      styles/: Contains styled components and theme definitions.
   tests/: Contains test files.
   App.tsx: Entry point for the application.

FilmDetailModal Component
   The FilmDetailModal component displays details about a film in a modal view. It supports dynamic styling based on the genre of the film and includes a close button.

   Props
      visible: Boolean flag to control the visibility of the modal.
      onClose: Callback function triggered when the close button is pressed.
      film: An object containing film details.
      genreStyle: An object containing style properties based on the genre.
      theme: Theme object for styling components.

Example Usage
<FilmDetailModal
  visible={true}
  onClose={() => {}}
  film={{
    title: 'Test Movie Title',
    overview: 'This is a test movie overview. It is long enough to require scrolling in the modal view.',
  }}
  genreStyle={{
    fontFamily: 'serif',
    buttonColor: '#8B0000',
  }}
  theme={{
    styles: {
      button: {
        backgroundColor: '#6200ea',
      },
    },
  }}
/>


Testing
   Tests are written using Jest and cover the following scenarios:
   
   Styling based on genre: Verifies that the styles applied to the title, overview text, and close button are correct based on the genre.
   Visibility: Checks that the modal renders correctly when visible and does not render when hidden.
   Button Functionality: Ensures that the close button calls the onClose function when pressed.

Running Tests
   To run the tests, use the following command:
      npm test


Troubleshooting
   If you encounter issues with the styling or props, ensure that the styles are being passed correctly and that the props are properly set in the components.
   For issues with testing, check the console logs for detailed output on what is being tested and what might be failing.
