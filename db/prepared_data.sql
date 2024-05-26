CREATE DATABASE  IF NOT EXISTS `boardinghouse` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `boardinghouse`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: sql12.freesqldatabase.com    Database: sql12709085
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

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
-- Table structure for table `contract`
--

DROP TABLE IF EXISTS `contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contract` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `deposit_amount` float NOT NULL,
  `end_date` date NOT NULL,
  `number_of_member` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  `status` enum('UNPAID','PAID') NOT NULL,
  `contract_representation_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcpydtj6usu2i3rqe1py4ajsd7` (`contract_representation_id`),
  CONSTRAINT `FKcpydtj6usu2i3rqe1py4ajsd7` FOREIGN KEY (`contract_representation_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contract`
--

LOCK TABLES `contract` WRITE;
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
INSERT INTO `contract` VALUES (1,300,'2025-04-01',3,'2000-01-01','PAID',1),(2,200,'2025-05-01',3,'2000-01-01','UNPAID',2),(3,400,'2025-06-01',3,'2000-01-01','PAID',3),(4,500,'2025-07-01',3,'2000-01-01','PAID',4),(5,600,'2025-08-01',3,'2000-01-01','UNPAID',5),(6,300,'2025-09-01',3,'2000-01-01','PAID',6),(7,350,'2025-10-01',3,'2000-01-01','UNPAID',7),(8,450,'2025-11-01',3,'2000-01-01','PAID',8),(9,550,'2025-12-01',3,'2000-01-01','PAID',9),(10,650,'2026-01-01',3,'2000-01-01','UNPAID',10),(11,700,'2026-02-01',3,'2000-01-01','PAID',11),(12,800,'2026-03-01',3,'2000-01-01','UNPAID',12),(13,900,'2026-04-01',3,'2000-01-01','PAID',13),(14,1000,'2026-05-01',3,'2000-01-01','PAID',14),(15,1100,'2026-06-01',3,'2000-01-01','UNPAID',15),(16,1200,'2026-07-01',3,'2000-01-01','PAID',16),(17,1300,'2026-08-01',3,'2000-01-01','UNPAID',17),(18,1400,'2026-09-01',3,'2000-01-01','PAID',18),(19,1500,'2026-10-01',3,'2000-01-01','PAID',19),(20,1600,'2026-11-01',3,'2000-01-01','UNPAID',20),(21,1700,'2026-12-01',3,'2000-01-01','PAID',21),(22,1800,'2027-01-01',3,'2000-01-01','UNPAID',22),(23,1900,'2027-02-01',3,'2000-01-01','PAID',23),(24,2000,'2027-03-01',3,'2000-01-01','PAID',24),(25,2100,'2027-04-01',3,'2000-01-01','UNPAID',25),(26,2200,'2027-05-01',3,'2000-01-01','PAID',26),(27,2300,'2027-06-01',3,'2000-01-01','UNPAID',27),(28,2400,'2027-07-01',3,'2000-01-01','PAID',28),(29,2500,'2027-08-01',3,'2000-01-01','PAID',29),(30,2600,'2027-09-01',3,'2000-01-01','UNPAID',30);
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_date` date NOT NULL,
  `number_of_month` int(11) DEFAULT NULL,
  `payment_deadline` date NOT NULL,
  `polling_month` date NOT NULL,
  `status` enum('UNPAID','PAID') NOT NULL,
  `surcharge` float DEFAULT NULL,
  `surcharge_reason` varchar(100) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `type` enum('FIRST_MONTH','MONTHLY','DEPOSIT','CYCLICAL_ROOM_CHARGE','SERVICE_FEE','SURCHARGE','UNKNOWN') NOT NULL,
  `room_booking_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfxrneon8j6yap8t43dley1vlq` (`room_booking_id`),
  CONSTRAINT `FKfxrneon8j6yap8t43dley1vlq` FOREIGN KEY (`room_booking_id`) REFERENCES `room_booking` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,'2024-04-01',1,'2024-04-30','2024-05-02','UNPAID',10,'Late payment',520510,'MONTHLY',1),(2,'2024-04-02',2,'2024-06-02','2024-05-02','UNPAID',0,'',522900,'MONTHLY',2),(3,'2024-04-03',1,'2024-05-03','2024-05-02','UNPAID',20,'Late payment',710620,'MONTHLY',3),(4,'2024-04-04',1,'2024-05-04','2024-05-02','UNPAID',15,'Late payment',358565,'MONTHLY',4),(5,'2024-04-05',1,'2024-05-05','2024-05-02','PAID',0,'',580500,'MONTHLY',5),(6,'2024-04-06',1,'2024-05-06','2024-05-02','UNPAID',25,'Late payment',235525,'MONTHLY',6),(7,'2024-04-07',1,'2024-05-07','2024-05-02','PAID',0,'',585450,'MONTHLY',7),(8,'2024-04-08',1,'2024-05-08','2024-05-02','UNPAID',30,'Late payment',675630,'MONTHLY',8),(9,'2024-04-09',1,'2024-05-09','2024-05-02','PAID',0,'',1390550,'MONTHLY',9),(10,'2024-04-10',1,'2024-05-10','2024-05-02','PAID',0,'',750500,'MONTHLY',10);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(100) NOT NULL,
  `disappear_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `visibility` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb0yvoep4h4k92ipon31wmdf7e` (`user_id`),
  CONSTRAINT `FKb0yvoep4h4k92ipon31wmdf7e` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,'The electricity rates have been revised and will be effective from next billing cycle. Please check ','2024-12-31 12:30:45','2024-04-29 12:30:45',_binary '',1),(2,'Reminder: The water conservation policy is in effect. Please ensure minimal wastage of water to avoi','2024-06-30 12:30:45','2024-04-29 12:30:45',_binary '',2),(3,'New laundry services are now available! Enjoy our improved facilities at very competitive rates.','2024-05-30 12:30:45','2024-04-29 12:30:45',_binary '',3),(4,'Recently, the neighborhood has alerted about the theft of property. Please be aware and carefully pr','2024-04-30 12:30:45','2024-05-01 12:30:45',_binary '',4),(5,'The temperature of the weather is increasing sharply so that please be careful of fire and explosion','2024-06-30 12:30:45','2029-06-30 12:30:45',_binary '\0',5),(6,'Remember to pay your debts before moving out the boarding house.','2010-01-01 12:30:45','2100-01-01 12:30:45',_binary '',6);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permission` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9kwkevw5na26e6qb4cbcbxaa4` (`permission`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (3,'CREATE_PRIVILEGE'),(4,'DELETE_PRIVILEGE'),(1,'READ_PRIVILEGE'),(2,'UPDATE_PRIVILEGE');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_bjxn5ii7v7ygwx39et0wawu0q` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_STAFF'),(3,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_fk` bigint(20) NOT NULL,
  `permission_fk` bigint(20) NOT NULL,
  KEY `FK9v4nb6bncy60d7cln9hgv0t66` (`permission_fk`),
  KEY `FKpigff0th62cbmvgr36kqnfvg2` (`role_fk`),
  CONSTRAINT `FK9v4nb6bncy60d7cln9hgv0t66` FOREIGN KEY (`permission_fk`) REFERENCES `permission` (`id`),
  CONSTRAINT `FKpigff0th62cbmvgr36kqnfvg2` FOREIGN KEY (`role_fk`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,3),(1,4),(2,2),(3,1),(1,3),(1,4),(3,1),(2,2);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_user` (
  `role_fk` bigint(20) NOT NULL,
  `user_fk` bigint(20) NOT NULL,
  KEY `FKigti40x0m43jkf9f1c4wgpc73` (`user_fk`),
  KEY `FKgr7f95teavyuekanq9uhhwlqx` (`role_fk`),
  CONSTRAINT `FKgr7f95teavyuekanq9uhhwlqx` FOREIGN KEY (`role_fk`) REFERENCES `role` (`id`),
  CONSTRAINT `FKigti40x0m43jkf9f1c4wgpc73` FOREIGN KEY (`user_fk`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(2,2),(2,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(3,51),(3,52),(3,53),(3,54),(3,55),(3,56),(3,57),(3,58),(3,59),(3,60),(3,61),(3,62),(3,63),(3,64),(3,65),(3,66),(3,67),(3,68),(3,69),(3,70),(3,71),(3,72),(3,73),(3,74),(3,75),(3,76),(3,77),(3,78),(3,79),(3,80),(3,81),(3,82),(3,83),(3,84),(3,85),(3,86),(3,87),(3,88),(3,89),(3,90),(1,1),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9),(3,10),(3,11),(3,12),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40),(3,41),(3,42),(3,43),(3,44),(3,45),(3,46),(3,47),(3,48),(3,49),(3,50),(3,51),(3,52),(3,53),(3,54),(3,55),(3,56),(3,57),(3,58),(3,59),(3,60),(3,61),(3,62),(3,63),(3,64),(3,65),(3,66),(3,67),(3,68),(3,69),(3,70),(3,71),(3,72),(3,73),(3,74),(3,75),(3,76),(3,77),(3,78),(3,79),(3,80),(3,81),(3,82),(3,83),(3,84),(3,85),(3,86),(3,87),(3,88),(3,89),(3,90),(2,2),(2,3);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `area` float NOT NULL,
  `floor` enum('GROUND','ONE','TWO','THREE','FOUR','FIVE') NOT NULL,
  `rent_amount` float NOT NULL,
  `room_number` varchar(100) NOT NULL,
  `status` enum('AVAILABLE','OCCUPIED') NOT NULL,
  `type` enum('SINGLE','DOUBLE','TRIPLE','UNSPECIFIED','UNKNOWN') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_fvetq5dj3wcvmdf19bbof0os6` (`room_number`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,120,'ONE',500,'A101','AVAILABLE','SINGLE'),(2,90,'ONE',450,'B102','AVAILABLE','SINGLE'),(3,80,'TWO',600,'C201','OCCUPIED','DOUBLE'),(4,85,'TWO',550,'D202','OCCUPIED','TRIPLE'),(5,95,'THREE',500,'E301','AVAILABLE','SINGLE'),(6,120,'ONE',500,'F101','AVAILABLE','SINGLE'),(7,90,'ONE',450,'G102','AVAILABLE','SINGLE'),(8,80,'TWO',600,'H201','OCCUPIED','DOUBLE'),(9,85,'TWO',550,'I202','OCCUPIED','TRIPLE'),(10,95,'THREE',500,'J301','AVAILABLE','SINGLE'),(11,120,'ONE',500,'K101','AVAILABLE','SINGLE'),(12,90,'ONE',450,'L102','AVAILABLE','SINGLE'),(13,80,'TWO',600,'M201','OCCUPIED','DOUBLE'),(14,85,'TWO',550,'N202','OCCUPIED','TRIPLE'),(15,95,'THREE',500,'O301','AVAILABLE','SINGLE'),(16,120,'ONE',500,'P101','AVAILABLE','SINGLE'),(17,90,'ONE',450,'Q102','AVAILABLE','SINGLE'),(18,80,'TWO',600,'R201','OCCUPIED','DOUBLE'),(19,85,'TWO',550,'AA202','OCCUPIED','TRIPLE'),(20,95,'THREE',500,'BB301','AVAILABLE','SINGLE'),(21,120,'ONE',500,'Y101','AVAILABLE','SINGLE'),(22,90,'ONE',450,'Z102','AVAILABLE','SINGLE'),(23,80,'TWO',600,'W201','OCCUPIED','DOUBLE'),(24,85,'TWO',550,'CC202','OCCUPIED','TRIPLE'),(25,95,'THREE',500,'DD301','AVAILABLE','SINGLE'),(26,120,'ONE',500,'EE101','AVAILABLE','SINGLE'),(27,90,'ONE',450,'FF102','AVAILABLE','SINGLE'),(28,80,'TWO',600,'GG201','OCCUPIED','DOUBLE'),(29,85,'TWO',550,'HH202','OCCUPIED','TRIPLE'),(30,95,'THREE',500,'KK301','AVAILABLE','SINGLE');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_booking`
--

DROP TABLE IF EXISTS `room_booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_booking` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `contract_id` bigint(20) DEFAULT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_bg8kbqg3telhk1v99oqoff40s` (`contract_id`),
  KEY `FKiwt0ws97ta91ukd4xonewjbxl` (`room_id`),
  CONSTRAINT `FK86sipx4jgsp4bmivpe9dn7ehp` FOREIGN KEY (`contract_id`) REFERENCES `contract` (`id`),
  CONSTRAINT `FKiwt0ws97ta91ukd4xonewjbxl` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_booking`
--

LOCK TABLES `room_booking` WRITE;
/*!40000 ALTER TABLE `room_booking` DISABLE KEYS */;
INSERT INTO `room_booking` VALUES (1,'2024-05-01','2024-05-10',1,1),(2,'2024-05-02','2024-05-11',2,2),(3,'2024-05-03','2024-05-12',3,3),(4,'2024-05-04','2024-05-13',4,4),(5,'2024-05-05','2024-05-14',5,5),(6,'2024-05-06','2024-05-15',6,6),(7,'2024-05-07','2024-05-16',7,7),(8,'2024-05-08','2024-05-17',8,8),(9,'2024-05-09','2024-05-18',9,9),(10,'2024-05-10','2024-05-19',10,10),(11,'2024-05-11','2024-05-20',11,11),(12,'2024-05-12','2024-05-21',12,12),(13,'2024-05-13','2024-05-22',13,13),(14,'2024-05-14','2024-05-23',14,14),(15,'2024-05-15','2024-05-24',15,15),(16,'2024-05-16','2024-05-25',16,16),(17,'2024-05-17','2024-05-26',17,17),(18,'2024-05-18','2024-05-27',18,18),(19,'2024-05-19','2024-05-28',19,19),(20,'2024-05-20','2024-05-29',20,20),(21,'2024-05-21','2024-05-30',21,21),(22,'2024-05-22','2024-05-31',22,22),(23,'2024-05-23','2024-06-01',23,23),(24,'2024-05-24','2024-06-02',24,24),(25,'2024-05-25','2024-06-03',25,25),(26,'2024-05-26','2024-06-04',26,26),(27,'2024-05-27','2024-06-05',27,27),(28,'2024-05-28','2024-06-06',28,28),(29,'2024-05-29','2024-06-07',29,29),(30,'2024-05-30','2024-06-08',30,30);
/*!40000 ALTER TABLE `room_booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_booking_user`
--

DROP TABLE IF EXISTS `room_booking_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_booking_user` (
  `room_booking_fk` bigint(20) NOT NULL,
  `user_fk` bigint(20) NOT NULL,
  KEY `FKbx0rdt7v10gtb8g95h8fmw718` (`user_fk`),
  KEY `FK74oxmplcxmy9c250trbd14l16` (`room_booking_fk`),
  CONSTRAINT `FK74oxmplcxmy9c250trbd14l16` FOREIGN KEY (`room_booking_fk`) REFERENCES `room_booking` (`id`),
  CONSTRAINT `FKbx0rdt7v10gtb8g95h8fmw718` FOREIGN KEY (`user_fk`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_booking_user`
--

LOCK TABLES `room_booking_user` WRITE;
/*!40000 ALTER TABLE `room_booking_user` DISABLE KEYS */;
INSERT INTO `room_booking_user` VALUES (1,1),(1,31),(1,61),(2,2),(2,32),(2,62),(3,3),(3,33),(3,63),(4,4),(4,34),(4,64),(5,5),(5,35),(5,65),(6,6),(6,36),(6,66),(7,7),(7,37),(7,67),(8,8),(8,38),(8,68),(9,9),(9,39),(9,69),(10,10),(10,40),(10,70),(11,11),(11,41),(11,71),(12,12),(12,42),(12,72),(13,13),(13,43),(13,73),(14,14),(14,44),(14,74),(15,15),(15,45),(15,75),(16,16),(16,46),(16,76),(17,17),(17,47),(17,77),(18,18),(18,48),(18,78),(19,19),(19,49),(19,79),(20,20),(20,50),(20,80),(21,21),(21,51),(21,81),(22,22),(22,52),(22,82),(23,23),(23,53),(23,83),(24,24),(24,54),(24,84),(25,25),(25,55),(25,85),(26,26),(26,56),(26,86),(27,27),(27,57),(27,87),(28,28),(28,58),(28,88),(29,29),(29,59),(29,89),(30,30),(30,60),(30,90);
/*!40000 ALTER TABLE `room_booking_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_service`
--

DROP TABLE IF EXISTS `room_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_service` (
  `room_fk` bigint(20) NOT NULL,
  `service_fk` bigint(20) NOT NULL,
  KEY `FKbl4fxjr6fapcbekfbyiskj2fn` (`service_fk`),
  KEY `FK81d34o6yxdvrbjcd9sloo9gve` (`room_fk`),
  CONSTRAINT `FK81d34o6yxdvrbjcd9sloo9gve` FOREIGN KEY (`room_fk`) REFERENCES `room` (`id`),
  CONSTRAINT `FKbl4fxjr6fapcbekfbyiskj2fn` FOREIGN KEY (`service_fk`) REFERENCES `service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_service`
--

LOCK TABLES `room_service` WRITE;
/*!40000 ALTER TABLE `room_service` DISABLE KEYS */;
INSERT INTO `room_service` VALUES (1,1),(4,1),(7,1),(10,1),(13,1),(16,1),(19,1),(22,1),(25,1),(28,1),(2,2),(5,2),(8,2),(11,2),(14,2),(17,2),(20,2),(23,2),(26,2),(29,2),(3,3),(6,3),(9,3),(12,3),(15,3),(18,3),(21,3),(24,3),(27,3),(30,3),(1,1),(4,1),(7,1),(10,1),(13,1),(16,1),(19,1),(22,1),(25,1),(28,1),(2,2),(5,2),(8,2),(11,2),(14,2),(17,2),(20,2),(23,2),(26,2),(29,2),(3,3),(6,3),(9,3),(12,3),(15,3),(18,3),(21,3),(24,3),(27,3),(30,3);
/*!40000 ALTER TABLE `room_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_metered_service` bit(1) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `unit` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_adgojnrwwx9c3y3qa2q08uuqp` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,_binary '','Water',12000,'Cubic Meter'),(2,_binary '','Electricity',4000,'kWh'),(3,_binary '\0','Cleaning',30000,'Time');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_detail`
--

DROP TABLE IF EXISTS `service_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `money` float DEFAULT NULL,
  `new_number` float DEFAULT NULL,
  `old_number` float DEFAULT NULL,
  `amount_of_use` float DEFAULT NULL,
  `invoice_id` bigint(20) DEFAULT NULL,
  `service_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbcj9x10p9o0ehdfew0fhiliab` (`invoice_id`),
  KEY `FKa69w6oqo28md7srptlq9lgl58` (`service_id`),
  CONSTRAINT `FKa69w6oqo28md7srptlq9lgl58` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`),
  CONSTRAINT `FKbcj9x10p9o0ehdfew0fhiliab` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_detail`
--

LOCK TABLES `service_detail` WRITE;
/*!40000 ALTER TABLE `service_detail` DISABLE KEYS */;
INSERT INTO `service_detail` VALUES (1,120000,120,110,0,1,1),(2,400000,250,150,0,2,2),(3,30000,0,0,1,3,3),(4,0,0,0,1,4,1),(5,400000,300,200,0,5,2),(6,0,180,130,0,6,3),(7,0,0,0,1,7,1),(8,0,0,0,1,8,2),(9,0,350,250,0,9,3),(10,0,0,0,1,10,1),(11,400000,280,180,0,1,2),(12,30000,0,0,1,2,3),(13,600000,320,270,0,3,1),(14,400000,220,120,0,4,2),(15,30000,0,0,1,5,3),(16,0,0,0,1,6,1),(17,400000,290,190,0,7,2),(18,0,230,180,0,8,3),(19,0,0,0,1,9,1),(20,400000,400,300,0,10,2),(21,0,410,310,0,1,3),(22,1200000,210,110,0,2,1),(23,200000,190,140,0,3,2),(24,30000,0,0,1,4,3),(25,0,0,0,1,5,1),(26,0,0,0,1,6,2),(27,30000,0,0,1,7,3),(28,1200000,370,270,0,8,1),(29,400000,420,320,0,9,2),(30,0,170,120,0,10,3);
/*!40000 ALTER TABLE `service_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `ward` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `career` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `gender` enum('MALE','FEMALE','UNKNOWN') NOT NULL,
  `id_card_number` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_qxpstbd2ln3t7mng4jjhtrvwf` (`id_card_number`),
  UNIQUE KEY `UK_4bgmpi98dylab6qdvf9xyaxu4` (`phone_number`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Athens-Clarke County','Latvia','55889 Casandra Drives','Athens-Clarke County','1976-06-04','Internal Paradigm Assistant','Quinten_Lemke@hotmail.com','Malcolm Schinner','FEMALE','858251153','$2a$10$gF3EmFlfvdJ4HySAG07QfeAYGpodrSAljj.NN1UuiJXYEz0PvF2CK','5396684281','Lorenz45'),(2,'Port Joesph','Andorra','072 Stark Fort','Port Joesph','1985-01-30','Forward Infrastructure Strategist','Quentin.Armstrong16@yahoo.com','Jordan Kuphal','FEMALE','665128796','$2a$10$VbSQA26j/9DBekvKIx4oluag.5XtlnWcKqr5RdaFlyRfNGKufLrOm','6835249172','Russell_Sporer'),(3,'Paulaworth','Egypt','1213 Dolores Passage','Paulaworth','1998-06-12','Investor Accounts Planner','Vivianne.Braun45@yahoo.com','Rodolfo Borer','FEMALE','101010339','$2a$10$TDv72ZxjvK92IwVRmS7zCO8lrTw6UegCmZgREXQE.8z1whiWe5LCy','4846297880','Roy_Raynor44'),(4,'Norbertside','Cape Verde','0988 Immanuel Walk','Norbertside','1961-08-17','Legacy Identity Consultant','Kellen_Farrell@hotmail.com','Mrs. Neil Kohler','MALE','095041443','$2a$10$z5PU5R/8mkl9.DEY.frVCu3TlWK7a5a06uRl/VGzjYRcd0OjMt9.y','2616952977','Keely5'),(5,'South Haroldchester','Congo','705 Lueilwitz Circles','South Haroldchester','1989-10-17','Internal Markets Planner','Harold.Crist79@hotmail.com','Marshall Mueller','MALE','954869193','$2a$10$oN3fYCdb4/Pl6k3XC.dlOeW8YsSAjF8AAwu.4X0fvkMVN7.8XA8UG','4766384933','Demetris_Pollich'),(6,'Quintonville','Gibraltar','0540 Raegan Burg','Quintonville','1955-02-20','District Brand Assistant','Brando31@gmail.com','Elaine Buckridge DVM','FEMALE','945420693','$2a$10$..sH0VszZZA8rHT0FNRND.nn/m0zauFYVxrtl9wr6NJWXW1YpC1LS','7196103337','Nigel.Parisian'),(7,'Fort Andrebury','Isle of Man','91432 Brekke Drives','Fort Andrebury','2003-04-30','Legacy Accounts Officer','Kane.Murphy93@yahoo.com','Seth Kilback','FEMALE','506343708','$2a$10$vjlkce.n010xVuW/XzOT1uZ8MyiOdg/qYReHgyxPqLG26z/DNuMOe','3547990220','Ned.Pollich68'),(8,'Matteoland','Kenya','178 Farrell Flats','Matteoland','2002-02-13','Future Usability Designer','Christopher_Donnelly@hotmail.com','Alexandra Harris','MALE','464260907','$2a$10$Gtc7Rcg4WEJF69QEFrayBO6N3txOcCAPPwYrf/przdyWM5yuuvoKm','7394014199','Dejah_Metz'),(9,'Port Sandra','Israel','471 Chelsie Dale','Port Sandra','1988-01-10','Central Brand Specialist','Solon_Keebler@gmail.com','Vanessa Little','MALE','221799695','$2a$10$YRirVt95e7yYr4EbZNR2Ju5x3HNfr8e/mce.tRkH/Q2owFVMrS1bu','5685871871','Harley_Streich43'),(10,'Lake Bailey','Republic of Korea','99009 Kuhic Keys','Lake Bailey','1954-10-25','Product Brand Orchestrator','Zack35@gmail.com','Stanley Kuvalis','MALE','052921263','$2a$10$fymTozmfzOUOnxCs5R3fou5TgQ6J/N1/QeHpBlIQuKX/3PsBcr93e','7258272330','Ozella_Boehm'),(11,'Owenburgh','Japan','24607 Rowe Alley','Owenburgh','1962-08-16','Product Security Orchestrator','Jerad.Friesen@hotmail.com','Dana Parker','FEMALE','881601550','$2a$10$XVcaQehqrjQ6Sr5QqTl1MOC28J1oHqAer9fAeWespGGQ5K4iqLR3C','2243278111','Ernesto_Koss40'),(12,'Deerfield Beach','Ghana','061 Little Spring','Deerfield Beach','1959-01-22','International Infrastructure Orchestrator','Lizzie_Frami49@gmail.com','Terrence Feest','MALE','605828043','$2a$10$jwbW662YOe11SGhe4/3x.uStVJcWd/1ClG3KpwyPag10kcTJC3SPO','6394181300','Gladys.Rutherford'),(13,'Gainesville','Nauru','25753 Macey Mill','Gainesville','1963-01-07','National Accounts Specialist','Lisette.Murphy@hotmail.com','Carla Doyle V','FEMALE','186833638','$2a$10$yxCb1ixe/MiZkn.v2Gi7/u789TP3W.iRF1QlfrbAZPI3Ig8Jm4jf2','3674967715','Josh45'),(14,'Reyfort','Canada','1704 Janice Trafficway','Reyfort','1947-02-21','Chief Implementation Director','Tabitha31@hotmail.com','Elsie Homenick','FEMALE','840494397','$2a$10$fdAY2sYZTYb0pTf/889nt.oUCkwb3mDXPv7a90BnuSTak7NP5PZvm','4173345728','Fred17'),(15,'New Braunfels','Saudi Arabia','69960 Kaylin Shore','New Braunfels','2000-06-22','Human Factors Planner','Darlene_Mayert37@yahoo.com','Mattie Herzog','FEMALE','482895794','$2a$10$UzkytAmv0Pn7U0T5Fh88SedZfpl4J1GFtXhPhwr4tFQ.1t1VhP/42','7536238671','Keith78'),(16,'Fort Arneview','Argentina','07827 Beahan View','Fort Arneview','1962-07-20','Customer Integration Engineer','Jeramy.Gutkowski@gmail.com','Stanley Carter','MALE','343129185','$2a$10$mpdraVrJDM5LDhOpFoLF3eHm9Y3Y685DK7/0vabjo2zLdolqkHIiS','7458789894','Henderson35'),(17,'West Wilsonchester','Guinea-Bissau','3254 Hane Villages','West Wilsonchester','2002-10-31','Human Directives Producer','Grant65@hotmail.com','Ruth Gerhold','FEMALE','895282431','$2a$10$NYrSTD2zrtFddHjv87KcyuumAfV7Xmki1BRiqP2cLb/mfbCPG4Xb.','6822140407','Elmo_Reinger9'),(18,'Boganport','Turks and Caicos Islands','2538 Pasquale Expressway','Boganport','1968-03-19','Regional Applications Producer','Edward.Crist20@hotmail.com','Eleanor Cummerata','FEMALE','762121036','$2a$10$e/PRkJt1/DHgBarcaqvl7uI9R3E8Pqn5IQJ.Wgauk66GjS9udy4tS','4217673742','Austen48'),(19,'Barnstable Town','Albania','39076 Gislason Green','Barnstable Town','1966-05-20','Global Accountability Planner','Chaya81@gmail.com','Norma Gerhold','MALE','192396800','$2a$10$Knny9qkWtccyjHxl7fhxq.Bo0rZ10rkQxpIZbimhgSQtGvMvhHYcG','3132962135','Eloisa68'),(20,'Naomistad','Netherlands','233 Zboncak Trafficway','Naomistad','1983-11-30','Regional Mobility Planner','Kade.Bins@gmail.com','Ellen Roberts','MALE','101953124','$2a$10$bY.wM8rv2eXmJnCl6Kuj8uwSBDKs3SuuxEQSR695F9berHp5ScbY6','3094179821','Katrine_West41'),(21,'Marcosfort','Svalbard & Jan Mayen Islands','21979 Boyer Union','Marcosfort','1991-12-14','Future Infrastructure Developer','Libby5@yahoo.com','Mathew Dare','MALE','949521268','$2a$10$C6lzCEOLxVYg1K75Egkb3eXhLHBdty1Bax2uRdoCXcITJmlMzWW2S','4925816597','Zander30'),(22,'El Monte','Uruguay','02708 Summer Throughway','El Monte','2005-04-19','Internal Communications Agent','Pierce.Casper62@hotmail.com','Johnnie Wolf','MALE','640210409','$2a$10$sZPoeKBPSUUIgei05XCWNO9GGLOl0AQ7qgcHlQqDYDl3OqQb1biZ6','9669281096','Sonya_Prosacco'),(23,'South Kenneth','Monaco','432 Hills Divide','South Kenneth','1951-05-11','Product Response Representative','Itzel_Bernier@gmail.com','Miss Sharon Hackett','FEMALE','441738805','$2a$10$25JG.ogF97KmygXbjEMuhOnOoz5zEhXIbQ3jZXrVnhPsBwfGZ2WbO','3442184079','Barry83'),(24,'Royal Oak','Italy','3192 Lindgren Gardens','Royal Oak','1945-04-03','District Communications Producer','Wellington83@yahoo.com','Pat Kunde','FEMALE','018687648','$2a$10$BXr461y8XbWqDsYRYa6/y.OHidioMjm5/5Kqqs9S31IN.6dQHUkfO','9168784204','Zelda.Bashirian'),(25,'Schummfield','New Zealand','6694 Bosco Ridge','Schummfield','2003-04-10','Internal Solutions Facilitator','Casimir.Kunde@hotmail.com','Alicia Prosacco','MALE','339389117','$2a$10$mtgIc9NXWwIE23OS6NLooeddd6s/H6ByxfGP3IeIk0ritYJEczoEi','7462094300','Nova_Zieme98'),(26,'Erie','Netherlands Antilles','137 Gerhold Glens','Erie','2003-02-07','Human Paradigm Strategist','Janessa_Schaefer@hotmail.com','Don Harber','MALE','391066452','$2a$10$1FqrKChfYKx0TAJ1r2YCJ.bkVpQz0vDKIOVDMJ0Ai.qR6SCSejgvW','6603690701','Buck_Hettinger'),(27,'Port Morrisborough','Iran','318 Octavia Center','Port Morrisborough','2004-04-02','Central Response Agent','Lorenzo.Goldner@hotmail.com','Matt Swift','FEMALE','329718426','$2a$10$siG0yC7wa4FEEIVG8W.fA.0OFh8fEqXkyARgGCd3BJt8i17MBZk7C','3285468667','Virgie_Daugherty21'),(28,'New Chad','Russian Federation','3113 Sanford Ridge','New Chad','1980-02-04','Product Solutions Engineer','Raheem58@hotmail.com','Dr. Maria Leannon DDS','FEMALE','205713749','$2a$10$MA85oBMaxKLHX7j/tgfATOlPHccvZFxuHckvKMHT5Mn4tep1nQog2','5589029176','Laury.Keebler49'),(29,'Einarfield','Bhutan','26762 Windler Villages','Einarfield','1978-11-15','Customer Operations Architect','Tobin.Hickle1@hotmail.com','Loren Will','FEMALE','323770295','$2a$10$twia18Hk.we3XEUXrQeDte1PbKTsAT.hyxYHFTmQtdy4RerlBm106','6134305671','Donato17'),(30,'Crooksburgh','Barbados','5113 Yost Station','Crooksburgh','1951-06-02','Future Markets Coordinator','Muriel_Rolfson@yahoo.com','Alexis Dibbert DVM','FEMALE','204942676','$2a$10$jOJeKoV55qhO/7uuvupsI.V1quZBWIbW9TR7Ibudwb7Au6GMxDbUG','6514399971','Carissa38'),(31,'East Ahmedworth','Heard Island and McDonald Islands','568 Daniel Circle','East Ahmedworth','2004-03-30','Product Web Analyst','Novella86@hotmail.com','Marlon Walker','FEMALE','300310924','$2a$10$zzWXWQxSvHpNvggqIPFlp.KHRA1WCwdkEp0hDt1w8XcjKfTBzQCUG','2556192952','Otis80'),(32,'South Terry','Moldova','881 Mosciski Ville','South Terry','1954-09-15','Future Paradigm Specialist','Sarina_Pouros@yahoo.com','Mrs. Ethel Tromp','FEMALE','028219844','$2a$10$VyKEarCGVobinA0KxKRrSOwY8AOm2VQvxQ.Ntj0aPUIhp2Oo6dUU.','3362532236','Uriah.Prosacco5'),(33,'New Orleans','Seychelles','6557 Bobbie Pike','New Orleans','1990-05-07','Investor Branding Consultant','Madie.Krajcik29@gmail.com','Rachel Bosco I','FEMALE','724513132','$2a$10$302W2qDFLRffU3O/3/bEm.bxjsDeF48M6U1uilgLwWoTfKs49UYlS','7025270731','Katherine.Kertzmann'),(34,'South Isabel','Mayotte','8227 Delmer Plaza','South Isabel','1994-07-06','Internal Program Liaison','Shawn.Reichert@hotmail.com','Blanche McDermott V','MALE','309234412','$2a$10$BaNTWNjWdY6XDzTmeeV6ZunDeKAg36Gu95ULmgWq.Hd.E2u6vmWDG','5939399436','Mossie32'),(35,'Lake Vilma','Dominican Republic','149 Sierra Station','Lake Vilma','1998-11-07','Customer Marketing Supervisor','Duncan.Lang79@yahoo.com','Leigh Hoppe','MALE','880464251','$2a$10$WmBtEZwX.TWvOOzLuHViGOUIEPkNanu4vTW7MMl7czeq3jK/ZDWfq','8695952945','Elta96'),(36,'East Alaynaville','Germany','2205 Elsie Forge','East Alaynaville','1985-05-04','Chief Branding Agent','Berneice52@hotmail.com','Deanna Medhurst','FEMALE','246309471','$2a$10$pMRd2lMvvXIwH7N37Xhm4eqTMJuc64pSIOzeFiDDJmJ/jN0H/DZ76','3979430955','Sidney69'),(37,'Fort Alfred','Martinique','084 Caitlyn Ville','Fort Alfred','1967-05-26','International Factors Executive','Jammie_Osinski2@gmail.com','Edgar Corkery IV','FEMALE','880161965','$2a$10$i.2ZBmYFWfh8gkowF7cMSeDKGhssOe9MoByQQq58jhkxdd3mRu4RK','8595720203','Donna_Johns17'),(38,'Lake Thea','Guyana','1891 Larson Ranch','Lake Thea','1972-04-29','Chief Research Architect','Maximilian19@hotmail.com','Dexter Weber','MALE','746558230','$2a$10$of.uc/u.1CYmlTPJRhCgX.eSzNwbgY1OifC4NdkSEGL7HZF3Prgbi','3312850483','Katelyn.Kuhn'),(39,'Coon Rapids','Brazil','8437 Fisher Flats','Coon Rapids','1989-05-15','Dynamic Assurance Executive','Tyshawn_Greenfelder15@gmail.com','Frederick Hayes III','FEMALE','237720014','$2a$10$dDRZzB6yMAP9Db7A.yprH.3X4tVHzGsaLl/D6VlNmwPdZmuH3TcAi','9424576935','Niko_Russel39'),(40,'New Jairo','Taiwan','34091 Larson Fords','New Jairo','1990-07-11','District Applications Designer','Keith38@yahoo.com','Mario Bode','MALE','514472137','$2a$10$JdDYk7H27MnZI5GLmDQ2T.gjI3E3Aknsl6fb3mgpXMCAYVqiZcGDS','2434845360','Alexandro56'),(41,'Gradybury','Chile','113 Rey Hills','Gradybury','1949-02-03','Human Branding Administrator','Kiana_Hilll@yahoo.com','Mrs. Kristy Balistreri IV','MALE','301953937','$2a$10$Ms74E5rU6QEL287z96nu1uOVQ5rTzJ8ccZLow1U4DqW8TRC87/B9y','7222501475','Gianni_Rempel'),(42,'East Arianeton','Puerto Rico','256 Johnson Run','East Arianeton','1961-02-21','Investor Functionality Engineer','Jett.Goodwin@yahoo.com','Bethany MacGyver','MALE','810420841','$2a$10$PhrNWDUo03tcf6802baMP.Y2ThQ/2EK6FyZKh/OIUuHbC7TlYRtBy','5592049172','Cecelia.Ondricka79'),(43,'Lynwood','Portugal','4178 Deven Rest','Lynwood','1972-05-24','Principal Tactics Executive','Bonita18@gmail.com','Ervin Hauck','MALE','094239395','$2a$10$ZZQU/GteYvoEAY.l67YZAuixrReQBY3kl/E0bXTJnEA9GdImLJK0e','6397212950','Francisco18'),(44,'New Korbinland','Central African Republic','6447 Toby Highway','New Korbinland','2001-04-08','Forward Factors Specialist','Ila.Ernser@yahoo.com','Jean Stoltenberg','MALE','994986612','$2a$10$6SiBaIrOmX/tz5g/2Do5dOtcdk1fbOiJVE8L3bTVa9tO6xqIAOqzm','9318465897','Tristian_Steuber70'),(45,'Boyerfort','United Arab Emirates','76489 Vince Trafficway','Boyerfort','1974-11-13','Corporate Implementation Developer','Claudia47@gmail.com','Marjorie Schmidt','MALE','068000479','$2a$10$d330e0i0KmQjwB29o7138.lvhmvBX5uKQoGIY/qvCdF2M6TLuoAWu','3832937335','Mandy_Kub'),(46,'Lindstad','Netherlands Antilles','76323 Walker Fords','Lindstad','1989-04-24','Future Assurance Developer','Ettie_Walker@hotmail.com','Caroline Cole','FEMALE','570877051','$2a$10$2tdGTOQ46Vcu8LY07bXJO..KUSA/TQ.iS.MMQmwYHo1dLHv2e4EUC','7432735416','Elvis5'),(47,'East Mike','Republic of Korea','62384 Kamille Brook','East Mike','1953-05-29','Global Marketing Facilitator','Mckenzie74@yahoo.com','Aaron Romaguera','MALE','874605602','$2a$10$kb204D6QbgFOqynsqsYiQOLX.7T0py1RQ2f3yIQ6WGQ1qWegVUHHy','8516991756','Rosella24'),(48,'Lake Anissacester','Bouvet Island (Bouvetoya)','3664 Andy Underpass','Lake Anissacester','1950-02-23','Internal Communications Technician','Helene34@gmail.com','Carmen Hessel','FEMALE','116800916','$2a$10$uIqzdthCFMhZnjNqSPs/YexRYXqRqD5i9Ss4xvp..wAIysOG3lBKG','2703567641','Alex_Becker54'),(49,'Pacochamouth','Botswana','292 Cartwright Keys','Pacochamouth','1945-10-16','Product Applications Officer','Caroline70@gmail.com','Rosa D\'Amore II','FEMALE','495433172','$2a$10$8jMBqU8C68kvw9NRnvWvQuNFvbOjAlGZsWh.R/YdsF/fD1QMw24Fm','9615086919','Eliezer86'),(50,'Alysastad','Ghana','2002 Champlin Trafficway','Alysastad','1983-11-05','Customer Intranet Engineer','Rosemarie.Stark@hotmail.com','Jessie Barton','FEMALE','348755949','$2a$10$TCg4LZYDSLkO9NjirdLvm.cLxmELPPaVT.qGM71Zdrj8iZdnhb2jm','5247625057','Natalie.Muller94'),(51,'Lehigh Acres','Mauritania','3189 Lakin Views','Lehigh Acres','1962-11-27','District Identity Associate','Saige69@hotmail.com','Kathy Armstrong','MALE','780902347','$2a$10$h8BEULMQrXfMX3DbLZ.DOui8SuR10G/2YuPRgszQ2sZeClOrvcJIm','6452060356','Raleigh59'),(52,'Doloreschester','Chile','2573 Ruthe Brooks','Doloreschester','1976-09-23','Corporate Research Executive','Eliseo.Goyette17@gmail.com','Charles Turner','MALE','225987539','$2a$10$tvF2KbfVn3zwMVGoVpiU4eSRLodDvN4mQ3aMBZAhTgms5BFwP5pzW','4247926633','Frederic_OConnell96'),(53,'Port Terrance','Cook Islands','74069 Frederick Brook','Port Terrance','1949-05-11','Product Interactions Associate','Chet.Gottlieb97@gmail.com','Genevieve Nader','MALE','058531576','$2a$10$MrN.8Y64Xxdp2N6kAcRzO.RsBKCdigz70dgOIKLyk0Z.BxORtXTlS','3266104069','Jovany_Hilll'),(54,'Oraborough','Cameroon','56161 Ritchie Hills','Oraborough','2002-06-10','Product Brand Developer','Sedrick_Stroman61@gmail.com','Sally Gorczany','FEMALE','316857400','$2a$10$D4cPKsfbbpu3mLOj9Fz.FukUOJ2MBtmVY6E7maokvrmb.iJuORS/m','2638673044','Sherman34'),(55,'South Gene','Burundi','6884 Ayden Gateway','South Gene','1983-03-21','Forward Applications Specialist','Reece.Bernhard@yahoo.com','Earl Daugherty','MALE','454656725','$2a$10$4N6btdx9XehOEeP69fS5guEIVCusvwsRAIjOKCsDMWzXdmFOydSo.','8056694345','Isac48'),(56,'Kilbackbury','Libyan Arab Jamahiriya','304 Watsica Overpass','Kilbackbury','1966-02-07','National Implementation Officer','Johnnie_Kautzer@yahoo.com','Roberto Jacobson','FEMALE','256544255','$2a$10$6RcGYBqgoTwIVab3yeOoGebLA8VseZkRgbfw/sKdQtYHEpB/iXMUG','8504548638','Anthony_Heidenreich'),(57,'South Shanny','India','542 Wallace Ridges','South Shanny','1977-11-13','Product Brand Orchestrator','Candelario58@hotmail.com','Willard Sipes','MALE','848600358','$2a$10$4cPPJzk.EQ83ikWc1eWW6u.h2m9WaMdomUK/Scgbw114kpQlukdby','5415571152','Kip72'),(58,'Danbury','French Guiana','860 Walker Dale','Danbury','1964-01-28','Regional Group Liaison','Neoma.McDermott96@yahoo.com','Doris Ziemann','MALE','374163372','$2a$10$8uacz3Q0F1ITnTSQbUK.B.W.AZKe6QHVXOVoQod6EjStuQIvIhzOa','8353215431','Abigale.Ruecker'),(59,'Edwinfurt','Lithuania','6492 McCullough Oval','Edwinfurt','1949-05-16','Lead Mobility Assistant','Lilly60@hotmail.com','Shelia Stamm','FEMALE','887501997','$2a$10$Rr6tMrpRBfGMvc8Ygp3ZvOYOSeoGsV/pT0SlWMreLQWX1Lbuw2ufS','5296375096','Rolando_Casper'),(60,'West Hansfort','Senegal','39766 Brennon Radial','West Hansfort','1981-11-19','Global Applications Designer','Adolph_Kulas93@gmail.com','Irene Morar','FEMALE','554655451','$2a$10$cyjTFUufr6Q3FdTlwcz9..i1P3w8oJXO/TKNEdS/q4b1x2f/kEOIu','2173213726','Alfreda52'),(61,'Lake Moshe','Palestinian Territory','069 Yundt Route','Lake Moshe','1959-10-20','Corporate Operations Architect','Lawrence_Schaefer48@yahoo.com','Jeanne Lebsack','MALE','915336584','$2a$10$AyeaTrIi8RWVCYJIm.2Of.txqYYkiGxRVx1YyDo1HtL2piwrylV76','8905779482','Nico_Pouros74'),(62,'Reannastead','Uganda','78122 Emard Dam','Reannastead','1972-08-08','Senior Factors Designer','Bud_Schroeder80@hotmail.com','Floyd Gibson','MALE','289122877','$2a$10$J9nX1sZAXbqPC/H51ZG.DeocWlDjypWUTPf4lB4/0pooW//9UfPSi','2247541668','Desiree.Gleason'),(63,'North Florian','Russian Federation','7488 Abelardo Pike','North Florian','1982-11-27','National Factors Representative','Berry.Jaskolski27@hotmail.com','Mrs. Robyn Hirthe DDS','MALE','336412171','$2a$10$iL7vZzVDfYTvx9KOdNYyNuoqHmNepDCCauP/saRAa7Wt6plDlzXnm','4744660067','Nella_McGlynn'),(64,'Sipesfield','El Salvador','6832 Aglae Center','Sipesfield','2004-12-27','Principal Accountability Manager','Rene.Kassulke@hotmail.com','Hector Ondricka','MALE','107028655','$2a$10$LLcgVjxE3s6sf49/BZvKU.9/7QT85SvDnn04Ih3iU1TJNTAYseTK6','2502303584','Roma_Runolfsson'),(65,'East Korey','Iraq','32853 Andreanne Ridges','East Korey','1972-03-06','Direct Accountability Designer','Eddie12@gmail.com','Wanda Tillman','FEMALE','090744790','$2a$10$TJosK7yoptARumUFus4rge1As4VfrCbUdppcekGT9F/6rO2shNUyq','3203384151','Brook57'),(66,'Ebertside','Malta','720 Lacy Isle','Ebertside','2003-03-23','Corporate Brand Consultant','Phoebe.Tillman34@hotmail.com','Ebony Harris','FEMALE','805398483','$2a$10$QQPo0q5ojMZ0E1DsHJnYqOQvu4czUZY1nK/I78phxQduF037t.8/i','2813688852','Rebeka_Bednar38'),(67,'Marcellashire','Timor-Leste','747 Deckow Freeway','Marcellashire','1976-09-17','Human Metrics Specialist','Braxton37@gmail.com','Lloyd Frami','MALE','090776522','$2a$10$uSGO6HPeZvcllfIuXEXtue9htvC85cI5pXw18CQ8kF6.7hQasUb16','2456983980','Dawson2'),(68,'Union City','Pakistan','64060 Marianna Glens','Union City','1952-01-29','Global Marketing Officer','Vidal.Wiza@hotmail.com','Christian Fritsch','MALE','017607153','$2a$10$cwP8yXGY6NUA/dsF7Iq9B.uQi8K9./RyyeFLqWuEXLUHNKGS.SaAG','3024205263','Kristofer60'),(69,'Lake Gabe','China','101 Connor Mall','Lake Gabe','1951-03-02','Chief Applications Facilitator','Sallie.Farrell8@hotmail.com','Darla Fritsch DVM','FEMALE','402340575','$2a$10$mNQkk9kp8/SUWGizx1sQNeePfEQUWB5OFpQD/W12c5dfMCHAYO0ei','4525522766','Keagan12'),(70,'Lake Brice','Dominica','61746 Harris Plaza','Lake Brice','1997-09-08','District Infrastructure Supervisor','Abbey_Hermann@hotmail.com','Elisa Ankunding','FEMALE','363796857','$2a$10$snAGf6p0Sc8tX/Hk6b1/D.BVZu5ep62lbtfp7dfho81uR7sFbG40G','3965978568','Eliane_Gleason'),(71,'Madelynncester','Niger','612 Ebony Track','Madelynncester','2006-01-11','Forward Directives Director','Nash.Leannon@hotmail.com','Toni Hilpert','MALE','528014688','$2a$10$ZfUcySrNVtPh9wLxlHb0oe/y0rli2fBtxalaSfNw9m6qEgf4xx.YO','9415373331','Zula.Gorczany33'),(72,'Round Rock','Saint Lucia','117 Carter Street','Round Rock','1960-08-31','Chief Branding Architect','Ervin.Prohaska@yahoo.com','Meredith Medhurst','MALE','147727194','$2a$10$SIszxy5GE2z74griH6Itcul/i.zg2/Ch3Nnb6siawuY/bcnuCrKqG','8392082255','Dorthy85'),(73,'New Dimitriport','Tuvalu','4924 Chanelle Motorway','New Dimitriport','1971-08-28','Internal Applications Administrator','Dameon.Anderson@yahoo.com','Erin Hermann','MALE','741638223','$2a$10$hd9RstiK55xO//BL9M2lj.gGB35/KTzvZtA9Vii6rI0oFVECZAQo6','2799437341','Jerel.Macejkovic55'),(74,'Medafort','Singapore','066 Mozell Corners','Medafort','1965-10-05','International Directives Assistant','Cristopher_Hoppe@yahoo.com','Marc Strosin','MALE','663004676','$2a$10$yZkZ4loxaaR/GbfcIzD3ju6kg9QZcJcya8UZDB1GE7h1BhTVsY1j2','2707861547','Jessica_Kuhlman'),(75,'Wilberhaven','Russian Federation','43842 Estel Turnpike','Wilberhaven','1946-03-27','Investor Configuration Technician','Dahlia_Smitham@gmail.com','Margaret Murazik','FEMALE','811703091','$2a$10$2hpp3UEAp.UZAZTrPeKWw.US8UUyJg7tTi7FA8EZD/iKy7AU7yYaa','7759218014','Amalia.Metz'),(76,'East Isabelle','Mozambique','784 Carley Gardens','East Isabelle','1967-06-06','Global Accounts Agent','Conrad.Okuneva91@hotmail.com','Elaine Glover','FEMALE','988576575','$2a$10$Znfc/EMEOy9jic.gpbDTfeFPXtg3JGZZrn1gYkswmgG.Xnh5RPL66','6993803578','Carolyne20'),(77,'North Baileyville','Chile','356 Wilhelmine Shore','North Baileyville','1961-11-11','Future Applications Representative','Arvel.Swift@gmail.com','Melissa Larson','MALE','767159281','$2a$10$jIAYwHAITy2lQHaFKTo6Neq6WBHrPOyicx2nC8959Wd850ki0ZKjG','6719697203','Mellie.Steuber53'),(78,'Raleigh','Falkland Islands (Malvinas)','57809 Garnet Flat','Raleigh','2002-10-07','Corporate Marketing Officer','Clifford.Greenfelder@gmail.com','Toby Johnson','FEMALE','221645215','$2a$10$fbTxxRySlVQCXR8JeXFCdOMgNt3464stuEKomXjEdsUQVt5EfGcEa','9293563796','Verlie.Mills'),(79,'North Quincycester','Liberia','171 Mitchell Points','North Quincycester','1996-07-20','Internal Integration Specialist','David_Bogisich@hotmail.com','Gregory Schroeder IV','MALE','758333553','$2a$10$yduI4A3wuXQRpjeTmelmr.BQzqsMN7dz9fSUSiO/6TmQPF9EqbZ5O','2062790679','Lonie_Reinger76'),(80,'Torphyfield','Japan','21762 Neoma Drive','Torphyfield','1952-03-03','Central Markets Supervisor','Nels.Wolff64@yahoo.com','Ricardo Stamm','MALE','424133663','$2a$10$nE6jtHCGbRFmBccWBvVNKeo.dDuF41nd9lR62.JoC7.l0Ei1BkcxK','5436381383','Paxton_Pfannerstill95'),(81,'Fort Rhiannon','Niger','46963 Littel Islands','Fort Rhiannon','1966-08-15','Investor Quality Coordinator','Moises29@gmail.com','Micheal Ledner','MALE','527173986','$2a$10$XNfzOyUT4/nMJhL/WD1.P.kQeHuLvz3BCoSh8r9lTEQF74lPsTT5a','6925787474','Jon_Smitham34'),(82,'Lake Rosemarieboro','Saint Barthelemy','94955 Diego Knolls','Lake Rosemarieboro','1972-08-19','District Paradigm Strategist','Magnus.Howell2@hotmail.com','Dr. Jeanne Stracke','FEMALE','003553583','$2a$10$QLDiRmGFEKWlQpiRmxCWPer/voAiqQgMrycjM8ZTPjKDR2mdLZHpy','2197036438','Jayne29'),(83,'Flavieboro','Maldives','96047 O\'Conner Falls','Flavieboro','1953-08-28','Chief Infrastructure Associate','Anika_Hettinger37@yahoo.com','Mrs. Faith Wilderman','MALE','284573175','$2a$10$uOG2tNPN6hdRiDuWFi.hCegrFVrsb2p4uj8xO72izpATkNAIptMB2','2178701962','Deshawn_Keebler57'),(84,'Lake Bettie','Croatia','01676 Casimir Mews','Lake Bettie','1968-07-25','Central Interactions Associate','Michale.Rice@gmail.com','Armando Olson','FEMALE','760035124','$2a$10$vlFIpsnJKb1lMUvq6kyGhOK1SfNZQORN9coN7yjV64ulZ1Lyilxaa','3602571052','Arvid35'),(85,'Fort Cierraboro','Bahamas','48901 Schumm Brook','Fort Cierraboro','1999-05-06','Investor Interactions Associate','Xzavier28@hotmail.com','Robyn Powlowski','FEMALE','473427948','$2a$10$9V7zLvRHjAWQsiSkY3UC.uJxnlXjhtJqd8eB4f.rm43tSEHsuF1iW','2856160106','Asha_Heller18'),(86,'North Cletus','Saint Kitts and Nevis','14097 Carlotta Terrace','North Cletus','1972-09-11','Chief Factors Assistant','Deion20@yahoo.com','Wayne Herzog','FEMALE','899442837','$2a$10$w/5YBiOloi57zy3Y68Cit.d0/nhExqqXvGuGVrdJ7CfRonprAnm4i','4837085260','Joelle_Weber'),(87,'Efrainshire','Jordan','96675 Chelsie Manor','Efrainshire','1983-06-12','Internal Communications Liaison','Tony_Runolfsdottir@hotmail.com','Ms. Israel Krajcik','FEMALE','567338723','$2a$10$T5z4YRMlU1qt0O/SI9Xl6Oj3VmgH8fMGxG.ivznF9F6uXg4gi5yda','3023101099','Kaci.Thompson'),(88,'Perth Amboy','Cayman Islands','7372 Janae Trace','Perth Amboy','1971-11-21','Lead Optimization Technician','Madie.Stokes61@hotmail.com','Wilson Bosco','FEMALE','180626003','$2a$10$Lv1N8nW7sYZV75iT8MggFuglvTPzjtbrMuojtV9fOkq4VtsRu94K2','8617125674','Joy.Ferry39'),(89,'St. Peters','Pakistan','077 Aracely Shoals','St. Peters','1987-06-22','National Accountability Assistant','Rex.OConner@gmail.com','Wade Ullrich','FEMALE','992817291','$2a$10$OcTWNOJI0UjtO18KBzMh..cl4SPz92b9SCF3.LJDoINF2S7G9Nhp2','7885942637','Bailee_Ruecker54'),(90,'North King','Marshall Islands','9681 Audrey Common','North King','1987-03-20','Product Division Strategist','Savion.Prohaska@hotmail.com','Ms. Ian McDermott I','MALE','253592543','$2a$10$22VqhQBlpVvXWungLRHEE.J7GRsN2ZB/YkFcwMnxHSP0UlGPdbDp6','4106777554','May.Hand7');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_permission` (
  `user_fk` bigint(20) NOT NULL,
  `permission_fk` bigint(20) NOT NULL,
  KEY `FK8ptbovubuku8fpk7ifn2d0eb4` (`permission_fk`),
  KEY `FK7xfuri7xvfatqw8y3id8oe7m5` (`user_fk`),
  CONSTRAINT `FK7xfuri7xvfatqw8y3id8oe7m5` FOREIGN KEY (`user_fk`) REFERENCES `user` (`id`),
  CONSTRAINT `FK8ptbovubuku8fpk7ifn2d0eb4` FOREIGN KEY (`permission_fk`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25  6:55:43
