
-- This script will run automatically if spring.jpa.hibernate.ddl-auto=create or create-drop

-- Insert dentists
INSERT INTO dentists (first_name, last_name, email, phone, address, created_at, updated_at) 
VALUES 
('Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567', '123 Main St, Suite 100, San Francisco, CA 94101', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Robert', 'Chen', 'robert.chen@example.com', '555-234-5678', '456 Oak Ave, Suite 200, San Francisco, CA 94102', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Emily', 'Wilson', 'emily.wilson@example.com', '555-345-6789', '789 Pine St, Suite 300, San Francisco, CA 94103', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('David', 'Kim', 'david.kim@example.com', '555-456-7890', '101 Maple Dr, Suite 400, San Francisco, CA 94104', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert patients
INSERT INTO patients (first_name, last_name, email, phone, address, dentist_id, created_at, updated_at) 
VALUES 
('John', 'Smith', 'john.smith@example.com', '555-987-6543', '111 Elm St, San Francisco, CA 94105', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sarah', 'Williams', 'sarah.williams@example.com', '555-876-5432', '222 Cedar St, San Francisco, CA 94106', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Michael', 'Davis', 'michael.davis@example.com', '555-765-4321', '333 Pine St, San Francisco, CA 94107', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Jennifer', 'Lopez', 'jennifer.lopez@example.com', '555-654-3210', '444 Oak St, San Francisco, CA 94108', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Robert', 'Johnson', 'robert.johnson@example.com', '555-543-2109', '555 Birch St, San Francisco, CA 94109', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert cases
INSERT INTO cases (case_number, title, description, status, priority, patient_id, dentist_id, due_date, created_at, updated_at) 
VALUES 
('CASE-2025-001', 'Dental Crown', 'Porcelain crown for molar #14', 'in-progress', 'Medium', 1, 1, '2025-04-30', '2025-04-01 10:00:00', CURRENT_TIMESTAMP),
('CASE-2025-002', 'Bridge Replacement', 'Three-unit bridge for anterior teeth', 'pending', 'High', 2, 2, '2025-05-15', '2025-04-05 11:30:00', CURRENT_TIMESTAMP),
('CASE-2025-003', 'Full Denture', 'Upper full denture', 'completed', 'Medium', 3, 3, '2025-03-20', '2025-03-01 09:15:00', CURRENT_TIMESTAMP),
('CASE-2025-004', 'Implant Abutment', 'Custom abutment for implant #30', 'in-progress', 'High', 4, 4, '2025-04-25', '2025-03-28 14:00:00', CURRENT_TIMESTAMP),
('CASE-2025-005', 'Partial Denture', 'Lower partial denture', 'pending', 'Low', 5, 1, '2025-05-10', '2025-04-10 13:45:00', CURRENT_TIMESTAMP);

-- Insert invoices
INSERT INTO invoices (invoice_number, status, patient_id, dentist_id, case_id, amount, tax, total, notes, issue_date, due_date, paid_date, created_at, updated_at) 
VALUES 
('INV-2025-042', 'unpaid', 1, 1, 1, 1350.00, 135.00, 1485.00, 'Please pay by due date', '2025-04-15', '2025-04-30', NULL, '2025-04-15 10:00:00', CURRENT_TIMESTAMP),
('INV-2025-041', 'unpaid', 2, 2, 2, 2100.00, 210.00, 2310.00, 'Please pay by due date', '2025-04-14', '2025-04-29', NULL, '2025-04-14 10:00:00', CURRENT_TIMESTAMP),
('INV-2025-040', 'overdue', 3, 3, 3, 950.00, 95.00, 1045.00, 'Payment overdue', '2025-04-01', '2025-04-08', NULL, '2025-04-01 10:00:00', CURRENT_TIMESTAMP),
('INV-2025-039', 'paid', 4, 4, 4, 1750.00, 175.00, 1925.00, 'Thank you for your payment', '2025-03-25', '2025-04-10', '2025-04-05', '2025-03-25 10:00:00', CURRENT_TIMESTAMP),
('INV-2025-038', 'paid', 5, 1, 5, 850.00, 85.00, 935.00, 'Thank you for your payment', '2025-03-20', '2025-04-05', '2025-04-02', '2025-03-20 10:00:00', CURRENT_TIMESTAMP);

-- Insert invoice items
INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, amount, created_at, updated_at) 
VALUES 
(1, 'Porcelain Crown', 1, 950.00, 950.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Digital Impression', 1, 200.00, 200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Temporary Crown', 1, 200.00, 200.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Three-unit Bridge', 1, 1800.00, 1800.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Digital Impression', 1, 300.00, 300.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Full Upper Denture', 1, 950.00, 950.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Custom Implant Abutment', 1, 850.00, 850.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Implant Crown', 1, 900.00, 900.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Partial Lower Denture', 1, 850.00, 850.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
