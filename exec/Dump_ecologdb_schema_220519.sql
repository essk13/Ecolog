CREATE DATABASE  IF NOT EXISTS `ecologdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecologdb`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: k6d101.p.ssafy.io    Database: ecologdb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asset`
--

DROP TABLE IF EXISTS `asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asset` (
  `no` int NOT NULL,
  `type` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `max_personnel` int DEFAULT NULL,
  `location` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `community_no` int NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKg4uwkqae1bkh0j0hlt6ajfxa` (`community_no`),
  KEY `FKpjjhl4u54s7k72oowdqpgc8c9` (`user_no`),
  CONSTRAINT `FKg4uwkqae1bkh0j0hlt6ajfxa` FOREIGN KEY (`community_no`) REFERENCES `community` (`no`),
  CONSTRAINT `FKpjjhl4u54s7k72oowdqpgc8c9` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `campaign_comment`
--

DROP TABLE IF EXISTS `campaign_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign_comment` (
  `no` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `campaign_no` int DEFAULT NULL,
  `user_no` int DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `FKexq97gbnsvnr7wn2n3f6tnqww` (`campaign_no`),
  KEY `FK86vuadj90kjtgx4xp2y4f77a6` (`user_no`),
  CONSTRAINT `FK86vuadj90kjtgx4xp2y4f77a6` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`),
  CONSTRAINT `FKexq97gbnsvnr7wn2n3f6tnqww` FOREIGN KEY (`campaign_no`) REFERENCES `campaign` (`no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `no` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_no` int NOT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKdl3cujtfyaoyubq2c2ldp1kxc` (`post_no`),
  KEY `FKq0ekodjkru4a87f99qeyg28l0` (`user_no`),
  CONSTRAINT `FKdl3cujtfyaoyubq2c2ldp1kxc` FOREIGN KEY (`post_no`) REFERENCES `post` (`no`),
  CONSTRAINT `FKq0ekodjkru4a87f99qeyg28l0` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager` int NOT NULL,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sido` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sigungu` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `FKf6h4f58rlt89oodvwqx6sbabj` (`manager`),
  CONSTRAINT `FKf6h4f58rlt89oodvwqx6sbabj` FOREIGN KEY (`manager`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `plogging`
--

DROP TABLE IF EXISTS `plogging`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plogging` (
  `no` int NOT NULL AUTO_INCREMENT,
  `started_at` datetime DEFAULT NULL,
  `ended_at` datetime DEFAULT NULL,
  `result_img` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `route_img` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` int DEFAULT NULL,
  `distance` double DEFAULT NULL,
  `calories` double DEFAULT NULL,
  `user_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKr7p3votfkvak3y0onmyuseunv` (`user_no`),
  CONSTRAINT `FKr7p3votfkvak3y0onmyuseunv` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `community_no` int NOT NULL,
  `user_no` int NOT NULL,
  `like_count` int unsigned DEFAULT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKlu8dvhvdao9954y2nbtfe30k7` (`community_no`),
  KEY `FKsc38tg1hw5vac8j0nl1ux0oqc` (`user_no`),
  CONSTRAINT `FKlu8dvhvdao9954y2nbtfe30k7` FOREIGN KEY (`community_no`) REFERENCES `community` (`no`),
  CONSTRAINT `FKsc38tg1hw5vac8j0nl1ux0oqc` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `post_like`
--

DROP TABLE IF EXISTS `post_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_like` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `post_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FK2qo39wfphd0ybnybp75qy3umo` (`post_no`),
  KEY `FKs2bjjx1xapt1rygtnr8f3o517` (`user_no`),
  CONSTRAINT `FK2qo39wfphd0ybnybp75qy3umo` FOREIGN KEY (`post_no`) REFERENCES `post` (`no`),
  CONSTRAINT `FKs2bjjx1xapt1rygtnr8f3o517` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trash_can`
--

DROP TABLE IF EXISTS `trash_can`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash_can` (
  `no` int NOT NULL AUTO_INCREMENT,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_no` int NOT NULL,
  `location` geometry DEFAULT NULL,
  PRIMARY KEY (`no`),
  KEY `FK5rvaytubrab5qjrthgb2wn80` (`user_no`),
  CONSTRAINT `FK5rvaytubrab5qjrthgb2wn80` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=6504 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `no` int NOT NULL AUTO_INCREMENT,
  `email` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nickname` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `login_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` int NOT NULL,
  `coin` int NOT NULL,
  `room` int NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_asset`
--

DROP TABLE IF EXISTS `user_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_asset` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `asset_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FK5vfw325ixrqua1qc7kw0pxt70` (`asset_no`),
  KEY `FKbr651rvpkj7ffylj871nc452` (`user_no`),
  CONSTRAINT `FK5vfw325ixrqua1qc7kw0pxt70` FOREIGN KEY (`asset_no`) REFERENCES `asset` (`no`),
  CONSTRAINT `FKbr651rvpkj7ffylj871nc452` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_campaign`
--

DROP TABLE IF EXISTS `user_campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_campaign` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `campaign_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKcnnuj7mmad1rcn00wqal48360` (`campaign_no`),
  KEY `FKnbalrlpova9ofmlk86di0db47` (`user_no`),
  CONSTRAINT `FKcnnuj7mmad1rcn00wqal48360` FOREIGN KEY (`campaign_no`) REFERENCES `campaign` (`no`),
  CONSTRAINT `FKnbalrlpova9ofmlk86di0db47` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_community`
--

DROP TABLE IF EXISTS `user_community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_community` (
  `no` int NOT NULL AUTO_INCREMENT,
  `user_no` int NOT NULL,
  `community_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKrt84efot9xnhjrated82j8s9b` (`community_no`),
  KEY `FKg9qfxtwq85kdn0r0rdd8mmyol` (`user_no`),
  CONSTRAINT `FKg9qfxtwq85kdn0r0rdd8mmyol` FOREIGN KEY (`user_no`) REFERENCES `user` (`no`),
  CONSTRAINT `FKrt84efot9xnhjrated82j8s9b` FOREIGN KEY (`community_no`) REFERENCES `community` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_follow`
--

DROP TABLE IF EXISTS `user_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_follow` (
  `no` int NOT NULL AUTO_INCREMENT,
  `from_user_no` int NOT NULL,
  `to_user_no` int NOT NULL,
  PRIMARY KEY (`no`),
  KEY `FKrt8ne29hgjc25d85o5iq5uc96` (`to_user_no`),
  KEY `FKqniy8y6j57035nlkhlbqat2pu` (`from_user_no`),
  CONSTRAINT `FKqniy8y6j57035nlkhlbqat2pu` FOREIGN KEY (`from_user_no`) REFERENCES `user` (`no`),
  CONSTRAINT `FKrt8ne29hgjc25d85o5iq5uc96` FOREIGN KEY (`to_user_no`) REFERENCES `user` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-19 13:34:09
