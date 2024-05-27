CREATE TABLE Attendance (
 id STRING UNIQUE PRIMARY KEY,
 user_id STRING,
 event_id STRING,
 area_id STRING,
 location STRING,
 is_status BOOLEAN,
 device_code STRING
);

CREATE TABLE Groups (
 id STRING UNIQUE PRIMARY KEY,
 name STRING,
 user_id STRING
);

CREATE TABLE Area (
 id STRING UNIQUE PRIMARY KEY,
 name STRING,
 event_id STRING,
 start_date DATE,
 end_date DATE,
 description STRING
);

CREATE TABLE QRCode (
 id STRING UNIQUE PRIMARY KEY,
 event_id STRING,
 area_id STRING,
 code STRING
);

CREATE TABLE Event (
 id STRING UNIQUE PRIMARY KEY,
 name STRING,
 date DATE,
 location STRING,
 description STRING
);

CREATE TABLE Member (
 id STRING UNIQUE PRIMARY KEY,
 group_id STRING,
 user_id STRING
);

CREATE TABLE Ticket (
 id STRING UNIQUE PRIMARY KEY,
 event_id STRING,
 user_id STRING,
 price FLOAT,
 seat_number STRING
);

CREATE TABLE Roles (
 id STRING UNIQUE PRIMARY KEY,
 name STRING,
 description STRING
);

CREATE TABLE Users (
 id STRING UNIQUE PRIMARY KEY,
 name STRING,
 email STRING,
 password STRING,
 role_id STRING
);

CREATE TABLE Comment (
 id STRING UNIQUE PRIMARY KEY,
 user_id STRING,
 event_id STRING,
 content STRING
);

CREATE TABLE TicketPayment (
 id STRING UNIQUE PRIMARY KEY,
 ticket_id STRING,
 payment_date DATE,
 amount FLOAT
);

CREATE TABLE Schedule (
 id STRING UNIQUE PRIMARY KEY,
 event_id STRING,
 time TIME,
 activity STRING
);

CREATE TABLE Account (
 id STRING UNIQUE PRIMARY KEY,
 user_id STRING,
 account_number STRING,
 bank_name STRING
);
