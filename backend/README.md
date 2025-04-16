
# DentalFlow Backend

This is the backend service for the DentalFlow dental management application. It provides RESTful APIs for managing dentists, patients, cases, and invoices.

## Technology Stack

- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- Spring Security
- MySQL Database
- Lombok

## Getting Started

### Prerequisites

- Java 17+ installed
- Maven installed
- MySQL installed and running

### Setup

1. Clone the repository
2. Configure the database connection in `src/main/resources/application.properties`
3. Build the project:

```bash
mvn clean package
```

4. Run the application:

```bash
java -jar target/dentalflow-0.0.1-SNAPSHOT.jar
```

Or using Maven:

```bash
mvn spring-boot:run
```

### Database Setup

The application is configured to automatically create the database schema based on the JPA entities. The initial data is loaded from `src/main/resources/data.sql`.

To modify this behavior, update the following property in `application.properties`:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Options include:
- `create`: Drops and creates the schema at startup
- `create-drop`: Creates schema at startup and drops it at shutdown
- `update`: Updates the schema if necessary
- `validate`: Validates the schema but makes no changes
- `none`: Does nothing with the schema

## API Endpoints

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

## Security

The application is configured with basic security settings for development purposes. For production, you should enable proper authentication and authorization mechanisms.

## Connecting to the Frontend

The frontend application is configured to connect to this backend at `http://localhost:8080/api`. CORS is enabled for all origins to facilitate development.

## Database Schema

The application uses the following main entities:

- Dentist
- Patient
- Case
- Invoice
- InvoiceItem

Refer to the entity classes in the `com.dentalflow.model` package for details on the schema.
