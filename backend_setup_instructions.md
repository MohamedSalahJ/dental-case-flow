
# Backend Setup Instructions

This file contains instructions for setting up a Spring Boot backend for the DentalFlow application. You'll need to create this project separately from your React frontend.

## Project Structure

Create a folder structure as follows:

```
dentalflow-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── dentalflow/
│   │   │           ├── controllers/
│   │   │           ├── models/
│   │   │           ├── repositories/
│   │   │           ├── services/
│   │   │           ├── config/
│   │   │           ├── exceptions/
│   │   │           ├── security/
│   │   │           └── DentalFlowApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── com/
│               └── dentalflow/
├── pom.xml
└── README.md
```

## Spring Boot Setup

1. Visit [Spring Initializr](https://start.spring.io/) to generate a new Spring Boot project with these dependencies:
   - Spring Web
   - Spring Data JPA
   - MySQL Driver
   - Spring Security
   - Lombok
   - Validation

2. Configure your `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dentalflow
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

## API Endpoints to Implement

For your DentalFlow application, implement these key API endpoints:

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Invoices
- GET `/api/invoices` - List all invoices
- GET `/api/invoices/{id}` - Get invoice details
- POST `/api/invoices` - Create invoice
- PUT `/api/invoices/{id}` - Update invoice
- DELETE `/api/invoices/{id}` - Delete invoice
- PUT `/api/invoices/{id}/status` - Update invoice status (paid, unpaid, overdue)

### Cases
- GET `/api/cases` - List all cases
- GET `/api/cases/{id}` - Get case details
- POST `/api/cases` - Create case
- PUT `/api/cases/{id}` - Update case
- DELETE `/api/cases/{id}` - Delete case
- PUT `/api/cases/{id}/status` - Update case status

### Patients
- GET `/api/patients` - List all patients
- GET `/api/patients/{id}` - Get patient details
- POST `/api/patients` - Create patient
- PUT `/api/patients/{id}` - Update patient
- DELETE `/api/patients/{id}` - Delete patient

### Dentists
- GET `/api/dentists` - List all dentists
- GET `/api/dentists/{id}` - Get dentist details
- POST `/api/dentists` - Create dentist
- PUT `/api/dentists/{id}` - Update dentist
- DELETE `/api/dentists/{id}` - Delete dentist

### Inventory
- GET `/api/inventory` - List all items
- GET `/api/inventory/{id}` - Get item details
- POST `/api/inventory` - Create item
- PUT `/api/inventory/{id}` - Update item
- DELETE `/api/inventory/{id}` - Delete item

## MySQL Database Schema

Create a file named `schema.sql` with the following tables:

```sql
CREATE DATABASE IF NOT EXISTS dentalflow;
USE dentalflow;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE dentists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    dentist_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dentist_id) REFERENCES dentists(id)
);

CREATE TABLE cases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    case_number VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    priority VARCHAR(50),
    patient_id BIGINT,
    dentist_id BIGINT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (dentist_id) REFERENCES dentists(id)
);

CREATE TABLE invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    patient_id BIGINT,
    dentist_id BIGINT,
    case_id BIGINT NULL,
    amount DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    notes TEXT,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    paid_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (dentist_id) REFERENCES dentists(id),
    FOREIGN KEY (case_id) REFERENCES cases(id)
);

CREATE TABLE invoice_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    invoice_id BIGINT NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

CREATE TABLE inventory_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE inventory_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT NOT NULL DEFAULT 0,
    unit_price DECIMAL(10,2) NOT NULL,
    reorder_level INT NOT NULL DEFAULT 5,
    category_id BIGINT,
    supplier_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES inventory_categories(id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Sample data inserts
INSERT INTO users (username, email, password, first_name, last_name, role) 
VALUES ('admin', 'admin@dentalflow.com', '$2a$10$X7.H3kVUUfk4hsQCLj9A8OiGBnglVFH/Y4BiAl4HnMbcBKJbmmLHe', 'Admin', 'User', 'ADMIN');

INSERT INTO dentists (first_name, last_name, email, phone) 
VALUES 
('Alice', 'Johnson', 'alice.johnson@email.com', '555-123-4567'),
('Robert', 'Chen', 'robert.chen@email.com', '555-234-5678'),
('Emily', 'Wilson', 'emily.wilson@email.com', '555-345-6789'),
('David', 'Kim', 'david.kim@email.com', '555-456-7890');

INSERT INTO patients (first_name, last_name, email, phone, dentist_id) 
VALUES 
('John', 'Smith', 'john.smith@email.com', '555-987-6543', 1),
('Sarah', 'Williams', 'sarah.williams@email.com', '555-876-5432', 2),
('Michael', 'Davis', 'michael.davis@email.com', '555-765-4321', 3),
('Jennifer', 'Lopez', 'jennifer.lopez@email.com', '555-654-3210', 4),
('Robert', 'Johnson', 'robert.johnson@email.com', '555-543-2109', 1);
```

## Integration with Frontend

To connect your React frontend to this backend:

1. Create API service files in your frontend that make HTTP requests to these endpoints
2. Handle CORS on your Spring Boot application by adding this configuration:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173") // Your React app's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
```

3. Update your frontend API calls to point to `http://localhost:8080/api/...`

## Running the Backend

1. Import the project into your IDE (IntelliJ IDEA, Eclipse, etc.)
2. Run MySQL and execute the schema.sql script
3. Run the Spring Boot application
4. Test the API endpoints using Postman or any API client
