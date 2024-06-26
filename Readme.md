# Invoice Generator

This project is an invoice generator application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It generates a detailed invoice in PDF format based on the input parameters provided by the user.

## Contents
- [Invoice Generator](#invoice-generator)
  - [Contents](#contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Customization](#customization)
  - [Invoice Template](#invoice-template)
  - [Styling](#styling)
  - [Usage](#usage)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)
  - [Contributing](#contributing)
  - [Contact](#contact)

## Features

- Input fields for seller details, billing details, shipping details, order details, and item details.
- Generates a PDF invoice with proper formatting and a placeholder for the company logo.
- Computes net amount, tax type, tax amount, and total amount.
- Converts total amount into words.
- Includes a signature image for the authorized signatory.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (if you decide to store data in a database)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/adarsh16p7/invoice-generator.git
    cd invoice-generator
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

## Running the Application

1. Start the server:
    ```bash
    cd server
    node server.js
    ```

2. Start the client:
    ```bash
    cd ../client
    npm start
    ```

3. Open your web browser and navigate to `http://localhost:3000`.

# Customization

## Invoice Template

The invoice template is defined in server/templates/invoice.ejs. You can customize the HTML structure and styling as needed.

## Styling

The styling for the invoice is defined in server/invoice.css. Adjust the CSS to match your desired invoice format.
## Usage

1. Fill in the required details in the form on the web application.
2. Click the "Generate Invoice" button to create and download the PDF invoice.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- html-pdf
- ejs
- React
- Express
- Node.js

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact
For any inquiries, please contact adarsh.patel0716@gmail.com.