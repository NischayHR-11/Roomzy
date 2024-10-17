# Roomzy

**Roomzy** is a full-stack web application for browsing hotel rooms at desired locations. It allows users to view available hotel listings with details and search for accommodations based on their preferences.

## Features

- **User-friendly Interface**: An intuitive and easy-to-navigate UI.
- **Browse Listings**: View detailed hotel room listings with descriptions, images, and prices.
- **Search Functionality**: Search for hotel rooms based on location.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Secure API**: Uses REST API to communicate between frontend and backend, ensuring data security.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Render (for backend), Netlify (for frontend)
- **Templates**: EJS for dynamic server-side rendering

## Installation & Setup

To set up this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/Roomzy.git
   cd Roomzy
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:

   Create a `.env` file in the root directory and add the following:

   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

   Replace `your_mongodb_connection_string` with your MongoDB connection details.

4. **Start the server**:

   ```bash
   npm start
   ```

   The application will run on `http://localhost:5000`.

## Usage

1. Navigate to the homepage to view the list of hotel rooms.
2. Use the search bar to find rooms in your desired location.
3. Click on a listing to view more details about a hotel room.

## Non-functional Improvements

- **Security**: Implemented environment variables to keep sensitive data secure.
- **Performance Optimization**: Efficient database queries and caching mechanisms to improve load times.
- **Error Handling**: Added comprehensive error handling to manage server and database issues gracefully.

## GitHub Repository

For the complete codebase and build scripts, visit the GitHub repository:

[Roomzy GitHub Repository](https://github.com/yourusername/Roomzy)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
