# Customizable Forms Application - Frontend (on going)

### live Link --https://custom-form-front.onrender.com/

## Overview

This is the frontend portion of our Customizable Forms Application, a web-based platform similar to Google Forms. It allows users to create custom form templates, fill out forms, and view results.

## Features

- User authentication (login/register)
- Template creation and management
- Form filling based on templates
- Search functionality for templates
- User dashboard for managing templates and forms
- Template details page with settings, questions, and results
- Admin panel for user management

## Technology Stack

- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling

## Project Structure

```
src/
|-- components/
|   |-- Auth/
|   |   |-- AdminGuard.jsx
|   |   |-- AuthGuard.jsx
|   |-- Card/
|   |   |-- Card.js
|   |   |-- AdminTemplateCard.jsx
|   |-- nab-bar/
|   |   |-- Navbar.jsx
|-- pages/
|   |-- Home/
|   |-- contact/
|   |-- Dashboard/
|   |-- login/
|   |-- register/
|   |-- not-found/
|   |-- not-permitted/
|   |-- template/
|-- api/
|   |-- imageRequest.js
|   |-- templateRequest.js
|-- store/
|   |-- store.js
|   |-- userInfoSlice.js
|-- App.js
|-- index.js
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   VITE_BASEURL=http://localhost:8000/api/v1
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Main Components

### TemplateForm

Allows users to create and edit form templates. It includes fields for:

- Title
- Description
- Topic selection
- Up to 4 string questions
- Up to 4 integer questions

### FormFill

Renders a form based on a template for users to fill out. It dynamically generates input fields based on the template's questions.

### UserDashboard

Displays a user's created templates and filled forms. It includes options to create new templates, edit existing ones, and view form results.

### AdminPanel

Provides administrators with user management capabilities, including viewing, blocking, unblocking, and deleting users.

## State Management

We use React Redux for global state management, particularly for user authentication status.

## Styling

We use Tailwind CSS for styling components. Custom styles can be added in a separate CSS file if needed.

