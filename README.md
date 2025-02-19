# Health Challenge Tracker

This is an Angular 19 single-page application (SPA) designed to track users' workout progress. Users can add workout details, view workout lists, and track their progress using charts. It also includes features like search, filter, pagination, and unit testing for components and services.

### Deployed App :  https://funny-madeleine-50d180.netlify.app/

## Features

- **User Input Fields**: Collects user information, workout type, and workout duration.
- **User Workout List**: Displays a list of users and their workout details.
  - **Search by Name**: Allows searching users by their name.
  - **Filter by Workout Type**: Filters workouts by type.
  - **Pagination**: Pagination for more than 5 users.
- **Additional Feature**: Displays workout progress using charts.
- **Unit Testing**: Unit tests for 1 component and 1 service with 100% code coverage.
- **Responsive Design**: The application is responsive and optimized for all screen sizes using Tailwind CSS.

## Requirements

- **Angular 19** framework.
- **Tailwind CSS version 4** for styling.
- **Angular Material** (for UI components).
- **LocalStorage** for data storage.
- **Chart.js** for workout progress charts.
- **Karma / Jasmine** for unit testing.
- **Pagination** implemented when more than 5 users are added.
- **Bonus Feature**: Charts to display workout progress.

## Code Coverage Report

Successfully achieved 100% code coverage for unit tests on a single component and one service.

<img width="1000" alt="codeCoverage" src="https://github.com/user-attachments/assets/1b9078d6-5ca1-440c-9f8e-42df4f7545a4" />

## Screenshots

*User input form for name, workout type, and workout minutes. Also, User workout list with options to search and filter*

<img width="1000" alt="image" src="https://github.com/user-attachments/assets/c3acf2dc-8bfb-44a4-929f-ed30b8042c56" />

*User's Workout Progress using Chart*

<img width="1000" height="400" alt="image" src="https://github.com/user-attachments/assets/a3eca96f-37f6-4e40-a1e6-8a73cdd1010f" />


## Installation

Follow the steps below to run the application locally:

### Prerequisites

Make sure you have the following installed:

- **Angular CLI** (v19)
- **Tailwind CSS** (v4)
- **npm** (Node Package Manager)

### Steps

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/akash-dewangan03/Fyle_Frontend_.git

2. **Navigate into the project directory**:
   
   ```bash
   cd Fyle_Frontend_
  
3. **Install the dependencies**:
   
   ```bash
   npm install

4. **Configure Tailwind CSS**:
   
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   
5. **Run the Application**

   ```bash
   ng serve

- The application will be hosted locally and will be available at:

  ```bash
   http://localhost:4200

### Testing

- To run the tests, use the following command:

  ```bash
  ng test --code-coverage

- This will run the unit tests for the components and services, and provide a code coverage report.

## Testing Libraries Used

- **Karma**: Test runner for unit testing. Karma is used to run the unit tests for the application.
- **Jasmine**: Testing framework for JavaScript. Jasmine is used to write and execute the unit tests in the application.

## Deployment

Once the application is ready, you can deploy it on any cloud service like Netlify, Heroku, etc..

## Assumptions

- The app stores user workout data in **localStorage**. This allows data to persist during the session.
- The user data is only persisted during the session, and will not persist if the page is refreshed or the browser is closed.
- No authentication is required for the app. All data is stored locally and doesn't involve any user authentication.
