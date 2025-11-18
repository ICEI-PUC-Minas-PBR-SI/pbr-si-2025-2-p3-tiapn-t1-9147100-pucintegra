-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: medlar
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`id_paciente`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,'João Marcelo de Souza Albuquerque','46235048750','1978-04-12','31999990001','joao.albuquerque@example.com','Rua das Flores, 101, São Francisco, Belo Horizonte  -  MG','senha1'),(2,'Maria Fernanda dos Santos Oliveira','42182073485','1992-09-03','31999990002','maria.fernanda@example.com','Avenida Brasil, 202, Prado, Belo Horizonte  -  MG','senha2'),(3,'Carlos Eduardo Martins de Andrade','00924828994','1980-11-20','31999990003','carlos.andrade@example.com','Rua do Carmo, 303, Planalto, Belo Horizonte  -  MG','senha3'),(4,'Ana Beatriz Rodrigues de Almeida','21212291913','1995-06-15','31999990004','ana.almeida@example.com','Avenida Afonso Pena, 4000, Funcionários, Belo Horizonte - MG','senha4'),(5,'Fernanda Clarice Pereira de Lima','26307541466','1988-01-30','31999990005','fernanda.lima@example.com','Rua Verde, 505, Palmares, Belo Horizonte  -  MG','senha5'),(6,'Mariana Gabriela Souza da Rocha','35544275866','1975-08-08','31999990006','mariana.rocha@example.com','Alameda Central, 606, Palmares, Belo Horizonte  -  MG','senha6'),(7,'Ricardo Augusto Ferreira de Moraes','66730475005','1969-03-22','31999990007','ricardo.moraes@example.com','Rua da Bahia, 900, Lourdes, Belo Horizonte - MG','senha7'),(8,'Patrícia Helena Gomes de Castro','11946225428','1983-02-10','31999990008','patricia.castro@example.com','Travessa Alegre, 808, Buritis, Belo Horizonte  -  MG','senha8'),(9,'Eduardo Henrique dos Reis Batista','53422056033','1990-12-01','31999990009','eduardo.batista@example.com','Rua do Sol, 909, Barro Preto, Belo Horizonte  -  MG','senha9'),(10,'Adriana Lucia Moreira de Carvalho','09236361102','1986-05-21','31999990010','adriana.carvalho@example.com','Vila Nova, 1001, Gutierrez, Belo Horizonte  -  MG','senha10'),(11,'Gustavo Henrique de Souza Menezes','36087078088','1998-10-18','31999990011','gustavo.menezes@example.com','Praça das Acácias, 110, União, Belo Horizonte  -  MG','senha11'),(12,'Luciana Cristina da Silva Domingues','96351618673','1972-07-07','31999990012','luciana.domingues@example.com','Avenida do Contorno, 7200, Savassi, Belo Horizonte - MG','senha12'),(13,'Bruno Alexandre dos Santos Pereira','83347835158','1984-09-29','31999990013','bruno.pereira@example.com','Avenida das Palmeiras, 131, Palmares, Belo Horizonte  -  MG','senha13'),(14,'Sofia Carolina de Almeida Nascimento','46932374501','1993-11-11','31999990014','sofia.nascimento@example.com','Rua Limoeiro, 141, Cidade Nova, Belo Horizonte  -  MG','senha14'),(15,'Mateus Vinicius Ribeiro de Freitas','45292931497','1979-02-27','31999990015','mateus.freitas@example.com','Rua dos Jasmins, 151, Savassi, Belo Horizonte  -  MG','senha15'),(16,'Camila Letícia dos Reis Oliveira','55182400829','1996-04-05','31999990016','camila.oliveira@example.com','Rua das Magnólias, 161, Castelo, Belo Horizonte  -  MG','senha16'),(17,'Roberto Carlos de Almeida Santos','22761295634','1956-09-09','31999990017','roberto.santos@example.com','Rua Velha, 171, Anchieta, Belo Horizonte  -  MG','senha17'),(18,'Beatriz Helena de Castro Moreira','77452795695','1991-08-13','31999990018','beatriz.moreira@example.com','Avenida Horizonte, 181, Palmares, Belo Horizonte  -  MG','senha18'),(19,'Felipe Augusto Lima de Souza Neto','49455121832','1987-06-30','31999990019','felipe.neto@example.com','Travessa Bela, 191, Cidade Nova, Belo Horizonte  -  MG','senha19'),(20,'Renata Carolina Pereira de Barros','83876926548','1982-01-02','31999990020','renata.barros@example.com','Rua Nova São Paulo, 201, Lourdes, Belo Horizonte  -  MG','senha20'),(21,'Sérgio Antônio de Oliveira Fonseca','70632433736','1970-10-14','31999990021','sergio.fonseca@example.com','Praça Central, 211, Santa Amélia, Belo Horizonte  -  MG','senha21'),(22,'Amanda Vitória dos Santos Ribeiro','49911251624','1994-03-03','31999990022','amanda.ribeiro@example.com','Rua das Orquídeas, 221, Santo Agostinho, Belo Horizonte  -  MG','senha22'),(23,'Paulo Henrique de Souza Albuquerque','06264697168','1965-12-25','31999990023','paulo.albuquerque@example.com','Avenida Liberdade, 231, Liberdade, Belo Horizonte  -  MG','senha23'),(24,'Marcos Vinicius de Araujo Monteiro','92607577624','1981-07-19','31999990024','marcos.monteiro@example.com','Rua das Palmeiras, 241, Santa Efigênia, Belo Horizonte  -  MG','senha24'),(25,'Isabela Fernanda de Melo Rodrigues','00101202890','1999-05-05','31999990025','isabela.rodrigues@example.com','Vila Primavera, 251, Lourdes, Belo Horizonte  -  MG','senha25'),(26,'Thiago Luis de Oliveira Santana','04748377429','1997-09-23','31999990026','thiago.santana@example.com','Rua do Mercado, 261, Pampulha, Belo Horizonte  -  MG','senha26'),(27,'Daniela Regina dos Santos Moreira','19677630032','1989-11-02','31999990027','daniela.moreira@example.com','Alameda das Flores, 271, Prado, Belo Horizonte  -  MG','senha27'),(28,'Rafael Gonçalo de Souza Fernandes','66098159173','1976-08-17','31999990028','rafael.fernandes@example.com','Rua dos Girassóis, 281, Pampulha, Belo Horizonte  -  MG','senha28'),(29,'Juliana Patrícia de Oliveira Nunes','83382396319','1985-04-29','31999990029','juliana.nunes@example.com','Praça da República, 291, São Bento, Belo Horizonte  -  MG','senha29'),(30,'Vitor Hugo de Almeida Carvalho Neto','63949697292','1990-02-12','31999990030','vitor.carvalho@example.com','Rua Esperança, 301, Buritis, Belo Horizonte  -  MG','senha30'),(31,'Helena Costa Ferreira','17839250421','1992-08-17','31988776655','helena.costa.ferreira@example.com','Rua das Acácias, 123, Serra, Apto 45  - 456','123456'),(32,'Mariana Souza Andrade','32165498700','1996-04-12','31998771122','mariana.andrade@example.com','Rua das Acácias, 98 - Belo Horizonte - 30510-230, Lourdes, 98  - 230','mariana123'),(33,'Ana Beatriz Souza','12345678909','2000-01-01','31998765432','ana.souza@example.com','Alameda Ezequiel Dias, 58 - Centro - Belo Horizonte/MG - 30130110','1234567'),(34,'Joao Querido','56456464566','1999-08-17','31992586824','joaoquerido@hotmail.com','Rua Engenheiro Gerhard Ett, 110 - Distrito Industrial Paulo Camilo Sul - Betim/MG - 32669110','12345678'),(38,'Juliana Martins Ferreira','32165498702','1988-11-12','31987452310','juliana.ferreira88@gmail.com','Rua Renato Pereira, 25 - Califórnia - Belo Horizonte/MG - 30855320','JuFerreira@2025');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-31 19:44:45
