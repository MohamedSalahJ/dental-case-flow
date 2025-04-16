
# DentalFlow - Dental Practice Management System

A comprehensive dental practice management system with a React frontend and Spring Boot backend.

## Project Structure

This project consists of two main parts:

1. **Frontend**: A React application built with TypeScript, Tailwind CSS, and shadcn/ui
2. **Backend**: A Spring Boot application with MySQL database

## Frontend

The frontend is a modern React application that provides a user interface for managing dental practice operations including:

- Patient management
- Dentist management
- Case tracking and management
- Invoicing and payment tracking
- Messaging between staff

### Technologies Used

- React 18
- TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Vite as the build tool
- React Router for routing
- Axios for API communication

### Running the Frontend

1. Navigate to the root directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The application will be available at `http://localhost:5173`

## Backend

The backend is a Spring Boot application that provides RESTful APIs for the frontend. See the [backend/README.md](./backend/README.md) file for detailed backend documentation.

### Technologies Used

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- Spring Security
- MySQL Database
- Lombok

### Running the Backend

1. Navigate to the `backend` directory
2. Build the application:
   ```
   mvn clean package
   ```
3. Run the application:
   ```
   java -jar target/dentalflow-0.0.1-SNAPSHOT.jar
   ```
4. The API will be available at `http://localhost:8080/api`

## API Endpoints

The backend provides the following API endpoints:

### Dentists

- `GET /api/dentists` - Get all dentists
- `GET /api/dentists/{id}` - Get a dentist by ID
- `POST /api/dentists` - Create a new dentist
- `PUT /api/dentists/{id}` - Update a dentist
- `DELETE /api/dentists/{id}` - Delete a dentist

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get a patient by ID
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/{id}` - Update a patient
- `DELETE /api/patients/{id}` - Delete a patient

### Cases

- `GET /api/cases` - Get all cases
- `GET /api/cases?status={status}` - Get cases by status
- `GET /api/cases/{id}` - Get a case by ID
- `POST /api/cases` - Create a new case
- `PUT /api/cases/{id}` - Update a case
- `PUT /api/cases/{id}/status` - Update a case status
- `DELETE /api/cases/{id}` - Delete a case

### Invoices

- `GET /api/invoices` - Get all invoices
- `GET /api/invoices?status={status}` - Get invoices by status
- `GET /api/invoices/{id}` - Get an invoice by ID
- `POST /api/invoices` - Create a new invoice
- `PUT /api/invoices/{id}` - Update an invoice
- `PUT /api/invoices/{id}/status` - Update an invoice status
- `DELETE /api/invoices/{id}` - Delete an invoice

## Getting Started

1. Clone this repository
2. Set up and start the backend (see backend/README.md)
3. Start the frontend development server
4. Access the application at http://localhost:5173

## Database Setup

The application uses MySQL as the database. The schema will be automatically created when you run the backend application for the first time.

1. Create a MySQL database named `dentalflow`
2. Update the database connection settings in `backend/src/main/resources/application.properties` if needed

## Screenshots

(Add screenshots of your application here)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
