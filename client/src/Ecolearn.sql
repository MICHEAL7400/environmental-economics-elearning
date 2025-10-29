-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2025 at 01:27 PM
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
-- Database: `ecolearn`
--

-- --------------------------------------------------------

--
-- Table structure for table `case_studies`
--

CREATE TABLE `case_studies` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `sector` varchar(100) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `full_content` longtext DEFAULT NULL,
  `key_metrics` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`key_metrics`)),
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `author_id` int(11) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 0,
  `view_count` int(11) DEFAULT 0,
  `download_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `case_studies`
--

INSERT INTO `case_studies` (`id`, `title`, `country`, `sector`, `year`, `image`, `summary`, `full_content`, `key_metrics`, `tags`, `author_id`, `is_featured`, `is_published`, `view_count`, `download_count`, `created_at`, `updated_at`) VALUES
(1, 'Kafue River Mining Disaster: Economic Impact Assessment', 'Zambia', 'Mining', 2025, '??', 'Comprehensive analysis of the Sino-Metals dam collapse economic consequences on communities, agriculture, and public health.', NULL, '{\"total_cost\": \"$285M\", \"jobs_affected\": \"25,000\", \"recovery_time\": \"15 years\", \"policy_changes\": \"12 reforms\"}', '[\"mining\", \"water-pollution\", \"disaster\", \"zambia\"]', NULL, 0, 1, 0, 0, '2025-10-26 16:38:24', '2025-10-26 16:38:24'),
(2, 'Rwanda Green City Kigali: Economic Analysis', 'Rwanda', 'Urban Development', 2024, '???', 'Economic assessment of Africa\'s first green city master plan and its sustainable development impacts.', NULL, '{\"investment\": \"$1.2B\", \"jobs_created\": \"15,000\", \"emissions_reduction\": \"60%\", \"cost_savings\": \"30%\"}', '[\"urban\", \"green-infrastructure\", \"rwanda\", \"innovation\"]', NULL, 0, 1, 0, 0, '2025-10-26 16:38:24', '2025-10-26 16:38:24'),
(3, 'Kenya Solar Revolution: Energy Economics', 'Kenya', 'Energy', 2024, '??', 'Analysis of Kenya\'s rapid solar energy adoption and its economic impacts on energy access and costs.', NULL, '{\"capacity_added\": \"800MW\", \"cost_reduction\": \"45%\", \"jobs_created\": \"8,500\", \"households_served\": \"2.1M\"}', '[\"solar\", \"renewable\", \"kenya\", \"energy-access\"]', NULL, 0, 1, 0, 0, '2025-10-26 16:38:24', '2025-10-26 16:38:24'),
(4, 'Lake Victoria Plastic Pollution: Circular Economy Solutions', 'Tanzania', 'Waste Management', 2024, '??', 'Analysis of plastic waste management in Lake Victoria communities and economic opportunities in circular economy models for plastic recycling.', NULL, '{\"plastic_reduction\": \"65%\", \"recycling_jobs\": \"3,200\", \"economic_savings\": \"$45M\", \"communities_engaged\": \"42\"}', '[\"plastic-pollution\", \"circular-economy\", \"waste-management\", \"tanzania\", \"lake-victoria\"]', NULL, 1, 1, 0, 0, '2025-10-26 16:45:58', '2025-10-26 16:45:58'),
(5, 'Ethiopia Green Legacy Initiative: Reforestation Economics', 'Ethiopia', 'Forestry', 2024, '??', 'Economic impact assessment of Ethiopia\'s massive reforestation campaign on soil conservation, carbon sequestration, and rural livelihoods.', NULL, '{\"trees_planted\": \"25B\", \"carbon_sequestered\": \"75M tons\", \"jobs_created\": \"750,000\", \"erosion_reduction\": \"40%\"}', '[\"reforestation\", \"carbon-sequestration\", \"ethiopia\", \"climate\", \"biodiversity\"]', NULL, 0, 1, 0, 0, '2025-10-26 16:45:58', '2025-10-26 16:45:58'),
(6, 'Nigeria Gas Flaring Reduction: Economic & Environmental Benefits', 'Nigeria', 'Energy', 2023, '??', 'Case study on Nigeria\'s efforts to reduce gas flaring in the Niger Delta and the economic benefits of captured gas utilization.', NULL, '{\"flaring_reduction\": \"70%\", \"gas_captured\": \"850M m?\", \"revenue_generated\": \"$3.2B\", \"emissions_reduced\": \"13M tons\"}', '[\"gas-flaring\", \"energy\", \"nigeria\", \"emissions\", \"niger-delta\"]', NULL, 1, 1, 0, 0, '2025-10-26 16:45:58', '2025-10-26 16:45:58');

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `certificate_id` varchar(100) DEFAULT NULL,
  `issue_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `expiry_date` timestamp NULL DEFAULT NULL,
  `download_url` varchar(500) DEFAULT NULL,
  `verification_code` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `category` varchar(100) DEFAULT NULL,
  `instructor_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `video_preview` varchar(255) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT 0.00,
  `students_count` int(11) DEFAULT 0,
  `modules_count` int(11) DEFAULT 0,
  `price` decimal(10,2) DEFAULT 0.00,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 0,
  `language` varchar(50) DEFAULT 'English',
  `requirements` text DEFAULT NULL,
  `learning_outcomes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`learning_outcomes`)),
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `short_description`, `duration`, `level`, `category`, `instructor_id`, `image`, `thumbnail`, `video_preview`, `rating`, `students_count`, `modules_count`, `price`, `discount_price`, `is_featured`, `is_published`, `language`, `requirements`, `learning_outcomes`, `tags`, `created_at`, `updated_at`) VALUES
(3, 'Introduction to Environmental Economics', 'Learn the fundamental concepts of environmental economics and understand why balancing economic growth with environmental protection is crucial for sustainable development. This course covers basic principles, market failures, and policy instruments.', 'Fundamental concepts of environmental economics', '30 min', 'beginner', 'fundamentals', NULL, '??', NULL, NULL, 4.80, 250, 5, 0.00, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:16:32', '2025-10-26 16:16:32'),
(4, 'Carbon Pricing and Taxes', 'Master the mechanisms of carbon pricing, understand different tax models, and analyze their economic impacts on businesses and communities. Learn about cap-and-trade systems and carbon taxation.', 'Carbon pricing mechanisms and tax models', '45 min', 'intermediate', 'policy', NULL, '??', NULL, NULL, 4.60, 180, 4, 29.99, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:16:32', '2025-10-26 16:16:32'),
(5, 'Renewable Energy Economics', 'Explore the economic viability of solar, wind, and hydro power in African contexts. Cost-benefit analysis and investment strategies for renewable energy projects.', 'Economic viability of renewable energy in Africa', '50 min', 'intermediate', 'energy', NULL, '?', NULL, NULL, 4.70, 195, 6, 49.99, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:16:32', '2025-10-26 16:16:32'),
(6, 'Climate Finance and Green Investment', 'Explore climate finance mechanisms, green bonds, and sustainable investment strategies for African markets. Learn about carbon credits and ESG investing.', NULL, '60 min', 'advanced', 'finance', NULL, '??', NULL, NULL, 4.70, 320, 0, 0.00, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:26:07', '2025-10-26 16:26:07'),
(7, 'Circular Economy and Waste Management', 'Understand the economic principles behind circular economy models and sustainable waste management systems in urban African contexts.', NULL, '55 min', 'intermediate', 'sustainability', NULL, '??', NULL, NULL, 4.50, 280, 0, 0.00, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:26:07', '2025-10-26 16:26:07'),
(8, 'Case Study: Zambia Mining Sustainability', 'Deep dive analysis of sustainable mining practices in Zambia. Learn about economic impacts, community engagement, and environmental protection.', NULL, '70 min', 'advanced', 'case-study', NULL, '??', NULL, NULL, 4.90, 195, 0, 0.00, NULL, 0, 1, 'English', NULL, NULL, NULL, '2025-10-26 16:26:07', '2025-10-26 16:26:07');

-- --------------------------------------------------------

--
-- Table structure for table `course_categories`
--

CREATE TABLE `course_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_categories`
--

INSERT INTO `course_categories` (`id`, `name`, `description`, `icon`, `color`, `is_active`, `created_at`) VALUES
(1, 'Environmental Economics', 'Fundamental concepts and principles', '??', 'green', 1, '2025-10-18 09:50:54'),
(2, 'Climate Policy', 'Policy frameworks and implementation', '?', 'blue', 1, '2025-10-18 09:50:54'),
(3, 'Sustainable Development', 'Development and sustainability', '??', 'teal', 1, '2025-10-18 09:50:54'),
(4, 'Renewable Energy', 'Energy economics and transitions', '?', 'yellow', 1, '2025-10-18 09:50:54'),
(5, 'Conservation', 'Biodiversity and ecosystem services', '??', 'orange', 1, '2025-10-18 09:50:54'),
(6, 'Circular Economy', 'Waste management and recycling', '??', 'purple', 1, '2025-10-18 09:50:54');

-- --------------------------------------------------------

--
-- Table structure for table `course_modules`
--

CREATE TABLE `course_modules` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `video_url` varchar(500) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `order_index` int(11) DEFAULT NULL,
  `is_free` tinyint(1) DEFAULT 0,
  `is_interactive` tinyint(1) DEFAULT 0,
  `has_quiz` tinyint(1) DEFAULT 0,
  `resources_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `module_resources`
--

CREATE TABLE `module_resources` (
  `id` int(11) NOT NULL,
  `module_id` int(11) DEFAULT NULL,
  `resource_type` enum('pdf','video','audio','document','link','tool','dataset','template','guide') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `file_url` varchar(500) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `download_count` int(11) DEFAULT 0,
  `is_free` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `time_limit` int(11) DEFAULT NULL,
  `passing_score` int(11) DEFAULT 70,
  `max_attempts` int(11) DEFAULT 3,
  `show_correct_answers` tinyint(1) DEFAULT 1,
  `randomize_questions` tinyint(1) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `question_type` enum('multiple_choice','true_false','short_answer','essay') DEFAULT 'multiple_choice',
  `question` text NOT NULL,
  `option_a` text DEFAULT NULL,
  `option_b` text DEFAULT NULL,
  `option_c` text DEFAULT NULL,
  `option_d` text DEFAULT NULL,
  `correct_answer` varchar(10) DEFAULT NULL,
  `explanation` text DEFAULT NULL,
  `points` int(11) DEFAULT 1,
  `order_index` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tools`
--

CREATE TABLE `tools` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `component_name` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `usage_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `avatar` varchar(10) DEFAULT '??',
  `user_type` enum('student','instructor','admin') DEFAULT 'student',
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `country`, `city`, `organization`, `role`, `bio`, `avatar`, `user_type`, `join_date`, `last_login`, `is_active`, `created_at`, `updated_at`) VALUES
(2, 'Nestony', 'Biamungu', 'biamungunestory@gmail.com', '$2b$12$BVNuMLphfY.YqoKBI2jsK.xXXmJRtEqozkv8sR683D0HnzECT5qGa', NULL, 'Zambia', NULL, 'biamungunestory@gmail.com', 'student', NULL, '??', 'student', '2025-10-18 16:16:06', '2025-10-26 17:40:28', 1, '2025-10-18 16:16:06', '2025-10-26 17:40:28'),
(3, 'Matanda', 'Micheal', 'matandamicheal@gmail.com', '$2b$12$iF63okkHAvIGgLyUQWRJ3OivfSEWSXsREDMOotNWZoYpvBSJLPMi6', NULL, 'Zambia', NULL, 'Cavendish', 'student', NULL, '??', 'student', '2025-10-19 12:11:41', '2025-10-29 12:23:53', 1, '2025-10-19 12:11:41', '2025-10-29 12:23:53'),
(4, 'Admin', 'User', 'admin@ecolearn.org', '$2b$12$XGgxU66RJV7LmRZxSuwTI.PXaAy3WhX.6h1kEDGHY2svR6d6kt24u', NULL, 'Global', NULL, 'EcoLearn Administration', NULL, NULL, '??', 'admin', '2025-10-19 23:02:17', '2025-10-29 12:23:12', 1, '2025-10-19 23:02:17', '2025-10-29 12:23:12'),
(5, 'Maduwa', 'Abasi', 'maduwa@gmail.com', '$2b$12$K7Y6eCN5zDSNg1cPGhoM5eEuPGF.Wa1qx8l3pBalIFXId7rvIf2O2', '+260776669320', 'Zambia', 'Lusaka', 'Cavendish University', 'Student', 'I am a student at cavendish', '👤', 'student', '2025-10-26 14:14:40', '2025-10-26 15:27:35', 1, '2025-10-26 14:14:40', '2025-10-26 15:36:47');

-- --------------------------------------------------------

--
-- Table structure for table `user_achievements`
--

CREATE TABLE `user_achievements` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `achievement_type` varchar(100) DEFAULT NULL,
  `achievement_name` varchar(255) DEFAULT NULL,
  `achievement_icon` varchar(10) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `points` int(11) DEFAULT 0,
  `earned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_progress`
--

CREATE TABLE `user_progress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `module_id` int(11) DEFAULT NULL,
  `progress_percent` int(11) DEFAULT 0,
  `completed` tinyint(1) DEFAULT 0,
  `last_accessed` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_spent` int(11) DEFAULT 0,
  `completed_at` timestamp NULL DEFAULT NULL,
  `grade` decimal(5,2) DEFAULT NULL,
  `certificate_issued` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_quiz_attempts`
--

CREATE TABLE `user_quiz_attempts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `total_questions` int(11) DEFAULT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `time_taken` int(11) DEFAULT NULL,
  `attempt_number` int(11) DEFAULT NULL,
  `passed` tinyint(1) DEFAULT 0,
  `answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`answers`)),
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_settings`
--

CREATE TABLE `user_settings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `notifications_email` tinyint(1) DEFAULT 1,
  `notifications_sms` tinyint(1) DEFAULT 0,
  `notifications_course_updates` tinyint(1) DEFAULT 1,
  `notifications_newsletter` tinyint(1) DEFAULT 1,
  `privacy_profile_public` tinyint(1) DEFAULT 1,
  `privacy_show_progress` tinyint(1) DEFAULT 1,
  `privacy_show_achievements` tinyint(1) DEFAULT 1,
  `language` varchar(10) DEFAULT 'en',
  `theme` varchar(20) DEFAULT 'light',
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_settings`
--

INSERT INTO `user_settings` (`id`, `user_id`, `notifications_email`, `notifications_sms`, `notifications_course_updates`, `notifications_newsletter`, `privacy_profile_public`, `privacy_show_progress`, `privacy_show_achievements`, `language`, `theme`, `updated_at`) VALUES
(1, 2, 1, 0, 1, 1, 1, 1, 1, 'en', 'light', '2025-10-18 16:16:06'),
(2, 3, 1, 0, 1, 1, 1, 1, 1, 'en', 'light', '2025-10-19 12:11:41'),
(3, 5, 1, 0, 1, 1, 1, 1, 1, 'en', 'light', '2025-10-26 14:14:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `case_studies`
--
ALTER TABLE `case_studies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `certificate_id` (`certificate_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructor_id` (`instructor_id`);

--
-- Indexes for table `course_categories`
--
ALTER TABLE `course_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_module_order` (`course_id`,`order_index`);

--
-- Indexes for table `module_resources`
--
ALTER TABLE `module_resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `tools`
--
ALTER TABLE `tools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_course` (`user_id`,`course_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `module_id` (`module_id`);

--
-- Indexes for table `user_quiz_attempts`
--
ALTER TABLE `user_quiz_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `user_settings`
--
ALTER TABLE `user_settings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `case_studies`
--
ALTER TABLE `case_studies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `course_categories`
--
ALTER TABLE `course_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `course_modules`
--
ALTER TABLE `course_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `module_resources`
--
ALTER TABLE `module_resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tools`
--
ALTER TABLE `tools`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_achievements`
--
ALTER TABLE `user_achievements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_progress`
--
ALTER TABLE `user_progress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_quiz_attempts`
--
ALTER TABLE `user_quiz_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_settings`
--
ALTER TABLE `user_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `case_studies`
--
ALTER TABLE `case_studies`
  ADD CONSTRAINT `case_studies_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `certificates_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `course_modules`
--
ALTER TABLE `course_modules`
  ADD CONSTRAINT `course_modules_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `module_resources`
--
ALTER TABLE `module_resources`
  ADD CONSTRAINT `module_resources_ibfk_1` FOREIGN KEY (`module_id`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `quizzes_ibfk_2` FOREIGN KEY (`module_id`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_achievements`
--
ALTER TABLE `user_achievements`
  ADD CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_progress`
--
ALTER TABLE `user_progress`
  ADD CONSTRAINT `user_progress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_progress_ibfk_3` FOREIGN KEY (`module_id`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_quiz_attempts`
--
ALTER TABLE `user_quiz_attempts`
  ADD CONSTRAINT `user_quiz_attempts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_quiz_attempts_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_settings`
--
ALTER TABLE `user_settings`
  ADD CONSTRAINT `user_settings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
