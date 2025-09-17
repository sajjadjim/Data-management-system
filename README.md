
# Product Management Dashboard

A fully-featured **Product Management Dashboard** built with **React** for managing product stocks, viewing payment history, and handling product-related operations such as adding stock, reducing stock, and deleting products.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Overview

This dashboard allows users to manage products in an inventory system, handle stock updates (add or reduce stock), and manage product details. The app also enables users to view payment history and download CSV files for record-keeping.

## Features

- **Product Dashboard**:
  - View all products with pagination and sorting options.
  - Add or reduce stock for any product.
  - Edit product details (name, code, price).
  - Delete a product after confirmation.

- **Payment History**:
  - View payment history with filters (by date, payment method).
  - Option to show or hide payment graphs for data visualization.

- **Modals**:
  - Add Product Modal: Allows you to add stock for any product.
  - Reduce Stock Modal: Allows you to reduce stock for any product.
  - Product Edit Modal: View and edit product details.
  - Product Delete Modal: Confirmation for deleting a product.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/product-management-dashboard.git
```

2. Navigate to the project directory:

```bash
cd product-management-dashboard
```

3. Install dependencies using **npm** or **yarn**:

```bash
npm install
```

or

```bash
yarn install
```

4. Set up the environment variables for your API in the `.env` file:

```env
REACT_APP_API_URL=http://localhost:3000
```

5. Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

This will start the application on `http://localhost:3000`.

## Usage

- **Add Stock**: Click the "+" button next to any product to add stock.
- **Reduce Stock**: Click the "-" button to reduce the product's stock.
- **Edit Product**: Click the pencil icon to edit product details.
- **Delete Product**: Click the trash icon to delete a product. A confirmation modal will appear to confirm deletion.
- **Payment History**: View and filter payments by method, date, or quantity.

## Tech Stack

This project uses the following technologies:

- **Frontend**:
  - React (with React Query for data fetching)
  - Tailwind CSS for responsive styling
  - React Icons for icons
  - React Toastify for notifications

- **Backend**:
  - Express.js with MongoDB for storing products and purchase data
  - Axios for API calls to the backend

## API Endpoints

Here are the key API endpoints used in this project:

### Product API

- `GET /products`: Get all products.
- `POST /products`: Add a new product.
- `PATCH /products/:id/stock`: Update stock (either add or reduce).
- `DELETE /products/:id`: Delete a product.

### Purchase API

- `GET /buy-products`: Get all purchase history.
- `POST /buy-products`: Record a product purchase (including payments).
- `PATCH /buy-products/:id/pay-remaining`: Update remaining payment for a purchase.

## Contributing

1. Fork the repository.
2. Create your branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

We welcome contributions and suggestions!

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
