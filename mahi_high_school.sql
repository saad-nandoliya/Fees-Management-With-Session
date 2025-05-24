-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 01:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mahi_high_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password`) VALUES
(8, 'saadfaruk786@gmail.com', '$2b$10$buvFNy4uPRKiB1Q3DsxFq.ncDZu225CDWT.IQMNZCVsxmat9SHGc2');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `class_name`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6'),
(7, '7'),
(8, '8'),
(9, '9'),
(10, '10');

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `section_name` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `section_name`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `year`) VALUES
(1, 2024),
(2, 2025),
(3, 2026),
(4, 2027),
(5, 2028);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `father_name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `class_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `date_of_birth` date NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `session_year` year(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `student_name`, `father_name`, `city`, `state`, `class_id`, `section_id`, `date_of_birth`, `mobile_number`, `session_year`, `created_at`) VALUES
(8, 'Saad', 'Faruk', 'Mahi', 'Gujarat', 10, 1, '2025-05-08', '9998877555', '2025', '2025-05-19 10:04:12'),
(9, 'Rashid', 'Ayyub', 'Majadar', 'Gujarat', 6, 3, '2025-05-14', '1234567866', '2024', '2025-05-19 10:07:05'),
(10, 'Arkam', 'Amin', 'Mahi', 'Gujarat', 4, 4, '2025-05-25', '7676879898', '2025', '2025-05-19 10:07:54'),
(11, 'Sajjad', 'Sultan', 'Changa', 'Maharastra', 8, 2, '2025-05-04', '8401810800', '2025', '2025-05-19 10:09:37'),
(12, 'Hammad', 'Juber', 'Majadar', 'Gujarat', 4, 3, '2025-05-24', '9998877555', '2024', '2025-05-19 11:57:32'),
(13, 'Salman', 'Siddiq', 'Changa', 'Gujarat', 1, 3, '2025-05-08', '1234567866', '2026', '2025-05-19 11:59:10'),
(14, 'Akram', 'Ahmad', 'Mahi', 'Gujarat', 9, 2, '2025-05-01', '7648793485', '2024', '2025-05-19 12:00:15'),
(15, 'Sakib ', 'Soyab', 'Tenivada', 'Gujarat', 6, 2, '2025-05-01', '7676879898', '2024', '2025-05-20 05:45:28'),
(16, 'Amil ', 'Aarif', 'Majadar', 'Gujarat', 10, 2, '2025-05-04', '7687980909', '2024', '2025-05-20 05:46:34'),
(17, 'Hassan', 'Yasin', 'Mahi', 'Gujarat', 5, 2, '2025-05-09', '8401810800', '2024', '2025-05-20 07:38:28'),
(18, 'Muhammad', 'Salman', 'Rajosana', 'Gujarat', 7, 4, '2025-05-03', '7868645687', '2026', '2025-05-20 07:40:35'),
(19, 'Fahad', 'Faruk', 'Mahi', 'Gujarat', 3, 3, '2025-05-06', '7878908786', '2026', '2025-05-22 05:55:21'),
(20, 'Hassan', 'Saad', 'Chhapi', 'Gujarat', 8, 3, '2025-12-31', '7868645687', '2025', '2025-05-22 05:58:04'),
(25, 'Ahsan', 'Saeed', 'Tenivada', 'Gujarat', 3, 2, '2025-04-18', '7687989809', '2028', '2025-05-23 05:47:27'),
(26, 'Arkam', 'Ayyub', 'Chhapi', 'Gujarat', 8, 3, '2025-05-01', '7890987654', '2027', '2025-05-23 06:40:20'),
(27, 'Hammad', 'Harun', 'Changa', 'Gujarat', 4, 2, '2025-05-23', '5676798089', '2028', '2025-05-23 07:10:30'),
(30, 'Sajjad', 'Siddiq', 'Changa', 'Gujarat', 1, 1, '2025-05-01', '9808797808', '2025', '2025-05-23 10:59:27'),
(31, 'Rashid', 'Amin', 'Mahi', 'Gujarat', 10, 4, '2025-05-20', '3435645765', '2025', '2025-05-23 11:00:29');

-- --------------------------------------------------------

--
-- Table structure for table `student_sessions`
--

CREATE TABLE `student_sessions` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `session_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `is_promoted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section_name` (`section_name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `year` (`year`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_students_class_id` (`class_id`),
  ADD KEY `fk_students_section_id` (`section_id`);

--
-- Indexes for table `student_sessions`
--
ALTER TABLE `student_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `fk_student_sessions_class_id` (`class_id`),
  ADD KEY `fk_student_sessions_section_id` (`section_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `student_sessions`
--
ALTER TABLE `student_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_section_id` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`),
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);

--
-- Constraints for table `student_sessions`
--
ALTER TABLE `student_sessions`
  ADD CONSTRAINT `fk_student_sessions_section_id` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`),
  ADD CONSTRAINT `student_sessions_ibfk_2` FOREIGN KEY (`session_id`) REFERENCES `sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_sessions_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  ADD CONSTRAINT `student_sessions_ibfk_4` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
