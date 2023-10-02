DROP DATABASE vsight;
CREATE DATABASE vsight;
USE vsight;

-- Roles table
CREATE TABLE roles (
	id INT PRIMARY KEY NOT NULL auto_increment,
    role_name VARCHAR(40) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Users table 

CREATE TABLE users (
	id INT PRIMARY KEY NOT NULL auto_increment,
    name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
	FOREIGN KEY (role_id) REFERENCES roles(id),
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    date_of_birth DATE,
    blood_group VARCHAR(20),
    height INT,
    weight DECIMAL(3,2),
    about TEXT,
    address TEXT,
	gender ENUM('Male', 'Female', 'Other'),
    is_verified TINYINT DEFAULT 0,
    otp INT,
    otp_sent_at TIMESTAMP,
    forgot_password_otp INT,
    forgot_otp_sent_at TIMESTAMP,
    is_forgot_otp_verified TINYINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Junction for user roles

CREATE TABLE users_roles (
	user_role_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Appointments Table
CREATE TABLE appointments (
	id INT PRIMARY KEY NOT NULL auto_increment,
    type ENUM('one-on-one', 'group') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date DATE,
    start_time TIME,
    end_time TIME,
    cancelled TINYINT DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Appointment Doctors
CREATE TABLE appointment_doctors (
	id INT PRIMARY KEY NOT NULL auto_increment,
    appointment_id INT NOT NULL,
    doctor_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CHECK (patient_id IN (SELECT id FROM users WHERE role_id = 2))
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Appointment Patients
CREATE TABLE appointment_patients (
	id INT PRIMARY KEY NOT NULL auto_increment,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- CHECK (patient_id IN (SELECT id FROM users WHERE role_id = 1))
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Prescriptions
CREATE TABLE prescriptions (
  id INT NOT NULL AUTO_INCREMENT,
  appointment_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (appointment_id) REFERENCES appointments(id),
  prescribed_by INT NOT NULL,
  FOREIGN KEY (prescribed_by) REFERENCES users(id),
  prescribed_to INT NOT NULL,
  FOREIGN KEY (prescribed_to) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Medicines
CREATE TABLE medicines (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Lab tests
CREATE TABLE lab_tests (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  instructions VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Prescription medicines
CREATE TABLE prescription_medicines (
  prescription_id INT NOT NULL,
  medicine_id INT NOT NULL,
  PRIMARY KEY (prescription_id, medicine_id),
  FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
  FOREIGN KEY (medicine_id) REFERENCES medicines(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Prescription lab tests
CREATE TABLE prescription_lab_tests (
  prescription_id INT NOT NULL,
  lab_test_id INT NOT NULL,
  PRIMARY KEY (prescription_id, lab_test_id),
  FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
  FOREIGN KEY (lab_test_id) REFERENCES lab_tests(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Medical records
CREATE TABLE medical_records (
  id INT NOT NULL AUTO_INCREMENT,
  patient_id INT NOT NULL,
  date_created DATETIME NOT NULL,
  content VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (patient_id) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  file_name VARCHAR(255),
  file_url VARCHAR(255) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Shared Medical Records
CREATE TABLE shared_medical_records (
	id INT NOT NULL AUTO_INCREMENT,
	medical_record_id INT NOT NULL,
	doctor_id INT NOT NULL,
	date_shared DATETIME NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (medical_record_id) REFERENCES medical_records(id),
	FOREIGN KEY (doctor_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table to store doctor reviews
CREATE TABLE doctor_reviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    patient_id INT,
    review_text TEXT,
    rating DECIMAL(3, 2), -- Rating on a scale of 0 to 5
    review_date DATE,
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table to store time slots
CREATE TABLE time_slots (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    start_time DATETIME,
    end_time DATETIME,
    day VARCHAR(10),
    is_available TINYINT DEFAULT 1,
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table to store phone numbers
CREATE TABLE phone_numbers (
	id INT PRIMARY KEY NOT NULL auto_increment,
    country_code VARCHAR(5) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
