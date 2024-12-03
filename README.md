# URLHero - URL Shortener & QR Code Generator

URLHero is a web application that combines URL shortening capabilities with QR code generation functionality. Built with Node.js, Express, and MongoDB, it provides a simple and efficient way to create shortened URLs and generate QR codes for any URL.

## Features

- **URL Shortening**
  - Create shortened versions of long URLs
  - Track click counts for each shortened URL
  - Delete shortened URLs
  - Responsive table view of all shortened URLs

- **QR Code Generation**
  - Generate QR codes for any valid URL
  - Download generated QR codes as PNG files
  - Preview QR codes before downloading

## Technologies Used

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - EJS (Embedded JavaScript templates)

- **Frontend**
  - Bootstrap 5
  - Custom CSS
  - Vanilla JavaScript

- **NPM Packages**
  - shortid: For generating unique short URLs
  - qrcode: For QR code generation
  - dotenv: For environment variable management
  - nodemon: For development

## Installation

1. Clone the repository:   ```bash
   git clone https://github.com/yourusername/urlhero.git
   cd urlhero   ```

2. Install dependencies:   ```bash
   npm install   ```

3. Create a `.env` file in the root directory:   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000   ```

4. Start the development server:   ```bash
   npm run devStart   ```

## Usage

### URL Shortening
1. Navigate to the URL shortening section
2. Enter a valid URL in the input field
3. Click "Shorten" to generate a shortened URL
4. View, use, or delete shortened URLs from the table

### QR Code Generation
1. Navigate to the QR code section
2. Enter a URL you want to create a QR code for
3. Click "Generate QR Code"
4. Preview the QR code and download it if desired

## Project Structure
urlhero/
├── models/
│ ├── shortUrl.js # URL shortening schema
│ └── qrCode.js # QR code schema
├── public/
│ └── styles/
│ └── main.css # Custom styling
├── views/
│ └── index.ejs # Main template
├── server.js # Application entry point
├── package.json
└── .env

## API Endpoints

### URL Shortener
- `GET /shortUrls` - View all shortened URLs
- `POST /shortUrls` - Create new short URL
- `POST /deleteUrl` - Delete a shortened URL
- `GET /:shortUrl` - Redirect to original URL

### QR Code
- `GET /qrgen` - QR code generation page
- `POST /qrgen` - Generate QR code
- `GET /qrgen/download` - Download QR code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Thanks to all contributors who have helped with this project
- Built with [Express.js](https://expressjs.com/)
- QR Code generation powered by [node-qrcode](https://github.com/soldair/node-qrcode)
