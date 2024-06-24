# Full Stack Food Delivery Website

Welcome to the Full Stack Food Delivery Website project! This project is a comprehensive web application designed to provide a seamless food ordering experience. It is built using modern web development technologies including React JS for the frontend, Node.js and Express for the backend, MongoDB for the database, and Stripe for payment processing.

## Project Description

This Full Stack Food Delivery Website allows users to browse through various restaurants and their menus, add items to their cart, and place orders with secure payment processing. The application provides a user-friendly interface for customers and a robust backend to manage orders, payments, and user authentication.

### Key Features

- **Responsive Frontend**: Built with React JS, ensuring a smooth and responsive user experience across different devices.
- **Backend API**: Implemented using Node.js and Express, providing a RESTful API for frontend communication.
- **Database**: MongoDB is used to store user data, restaurant menus, and orders, ensuring scalability and flexibility.
- **Payment Integration**: Stripe is integrated for secure and efficient payment processing.
- **Authentication**: User authentication and authorization are implemented for secure access and personalized user experience.

### Technologies Used

- **Frontend**: React JS, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **Version Control**: Git and GitHub

### Setup Instructions

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/food-delivery-website.git
    cd food-delivery-website
    ```

2. **Install dependencies**:
    ```sh
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Build and run the frontend**:
    ```sh
    cd client
    npm run build
    npm start
    ```

### Contributing

We welcome contributions to improve the project. If you have any suggestions, feel free to create a pull request or open an issue.
