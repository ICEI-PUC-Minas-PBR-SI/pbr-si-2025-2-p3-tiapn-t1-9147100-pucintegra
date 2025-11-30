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
-- Table structure for table `profissional`
--

DROP TABLE IF EXISTS `profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissional` (
  `id_profissional` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` char(11) NOT NULL,
  `registro_profissional` varchar(40) NOT NULL,
  `especialidade` varchar(50) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `endereco` varchar(150) DEFAULT NULL,
  `avaliacao_media` decimal(3,2) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_profissional`),
  UNIQUE KEY `cpf` (`cpf`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissional`
--

LOCK TABLES `profissional` WRITE;
/*!40000 ALTER TABLE `profissional` DISABLE KEYS */;
INSERT INTO `profissional` VALUES (1,'Dr. Ricardo Augusto de Oliveira Neto','38241198615','COREN-MG-000001','Dermatologia','31988880001','ricardo.oliveira@clinica.com','Avenida Afonso Pena, 4000, Funcionários, Belo Horizonte - MG',4.85,'senha01'),(2,'Dra. Juliana Maria de Campos Ribeiro','27403952212','COREN-MG-000002','Pediatria','31988880002','juliana.campos@clinica.com','Rua da Bahia, 900, Lourdes, Belo Horizonte - MG',4.90,'senha02'),(3,'Dr. Marcos Antônio da Silva Pereira','36009926009','COREN-MG-000003','Clínico Geral','31988880003','marcos.silva@clinica.com','Avenida do Contorno, 7200, Savassi, Belo Horizonte - MG',4.60,'senha03'),(4,'Dra. Laura Beatriz Costa de Souza','20087247275','COREN-MG-000004','Cardiologia','31988880004','laura.costa@clinica.com','Rua Espírito Santo, 1200, Centro, Belo Horizonte - MG',4.75,'senha04'),(5,'Dr. Pedro Henrique Ramos de Lima','77452795695','COREN-MG-000005','Ortopedia','31988880005','pedro.ramos@clinica.com','Rua dos Timbiras, 2900, Barro Preto, Belo Horizonte - MG',4.50,'senha05'),(6,'Dra. Camila Fernanda de Castro Alves','49455121832','COREN-MG-000006','Ginecologia','31988880006','camila.alves@clinica.com','Avenida Amazonas, 5200, Gameleira, Belo Horizonte - MG',4.70,'senha06'),(7,'Dr. Eduardo Luiz de Moraes Santos','83876926548','COREN-MG-000007','Endocrinologia','31988880007','eduardo.moraes@clinica.com','Rua Padre Eustáquio, 800, Padre Eustáquio, Belo Horizonte - MG',4.55,'senha07'),(8,'Dra. Patrícia Helena de Carvalho Silva','70632433736','COREN-MG-000008','Neurologia','31988880008','patricia.carvalho@clinica.com','Rua Rio Grande do Norte, 800, Funcionários, Belo Horizonte - MG',4.65,'senha08'),(9,'Dr. Rodrigo Augusto de Almeida Pinto','49911251624','COREN-MG-000009','Oftalmologia','31988880009','rodrigo.pinto@clinica.com','Avenida Prudente de Morais, 700, Cidade Jardim, Belo Horizonte - MG',4.60,'senha09'),(10,'Dra. Vanessa Cristina de Souza Rocha','06264697168','COREN-MG-000010','Psiquiatria','31988880010','vanessa.rocha@clinica.com','Rua Ouro Preto, 1500, Santo Agostinho, Belo Horizonte - MG',4.72,'senha10'),(11,'Dr. Alexandre Roberto dos Santos Lima','92607577624','COREN-MG-000011','Urologia','31988880011','alexandre.lima@clinica.com','Avenida do Contorno, 10400, Santa Efigênia, Belo Horizonte - MG',4.58,'senha11'),(12,'Dra. Daniela Regina de Farias Oliveira','00101202890','COREN-MG-000012','Nutrição','31988880012','daniela.farias@clinica.com','Rua Aimorés, 2222, Lourdes, Belo Horizonte - MG',4.63,'senha12'),(13,'Dr. Felipe Augusto de Almeida Neto','04748377429','COREN-MG-000013','Pneumologia','31988880013','felipe.almeida@clinica.com','Avenida Nossa Senhora do Carmo, 1500, Sion, Belo Horizonte - MG',4.52,'senha13'),(14,'Dra. Sofia Carolina de Melo Fernandes','19677630032','COREN-MG-000014','Reumatologia','31988880014','sofia.fernandes@clinica.com','Rua Monte Alegre, 300, Serra, Belo Horizonte - MG',4.67,'senha14'),(15,'Dr. Gustavo Henrique de Lima Barreto','66098159173','COREN-MG-000015','Gastroenterologia','31988880015','gustavo.barreto@clinica.com','Rua Cláudio Manoel, 800, Savassi, Belo Horizonte - MG',4.60,'senha15'),(16,'Dra. Isabela Fernanda de Castro Nogueira','83382396319','COREN-MG-000016','Oncologia','31988880016','isabela.nogueira@clinica.com','Rua dos Guajajaras, 1500, Centro, Belo Horizonte - MG',4.77,'senha16'),(17,'Dr. Rafael Gonçalo de Souza Menezes','63949697292','COREN-MG-000017','Cirurgia Geral','31988880017','rafael.menezes@clinica.com','Rua Grão Mogol, 550, Carmo, Belo Horizonte - MG',4.59,'senha17'),(18,'Dra. Beatriz Helena de Castro Dias','46235048750','COREN-MG-000018','Oftalmologia Pediátrica','31988880018','beatriz.dias@clinica.com','Avenida Cristiano Machado, 1200, Cidade Nova, Belo Horizonte - MG',4.71,'senha18'),(19,'Dr. Thiago Luiz de Oliveira Barbosa','42182073485','COREN-MG-000019','Cardiologia Intervencionista','31988880019','thiago.barbosa@clinica.com','Rua Pium-í, 1300, Anchieta, Belo Horizonte - MG',4.74,'senha19'),(20,'Dra. Amanda Vitória de Souza Albuquerque','00924828994','COREN-MG-000020','Fisioterapia','31988880020','amanda.albuquerque@clinica.com','Avenida Otacílio Negrão de Lima, 2000, Pampulha, Belo Horizonte - MG',4.55,'senha20'),(21,'Dr. Paulo Henrique de Moraes Araujo','21212291913','COREN-MG-000021','Cirurgia Ortopédica','31988880021','paulo.araujo@clinica.com','Rua Conselheiro Lafaiete, 2100, Sagrada Família, Belo Horizonte - MG',4.68,'senha21'),(22,'Dra. Luciana Cristina de Araújo Mendes','26307541466','COREN-MG-000022','Dermatologia Cosmética','31988880022','luciana.mendes@clinica.com','Rua Jacuí, 3100, Ipiranga, Belo Horizonte - MG',4.69,'senha22'),(23,'Dr. Bruno Alexandre de Santos Cardoso','35544275866','COREN-MG-000023','Endocrinologia Pediátrica','31988880023','bruno.cardoso@clinica.com','Rua Boaventura, 1000, Liberdade, Belo Horizonte - MG',4.57,'senha23'),(24,'Dra. Renata Carolina de Souza Reis','66730475005','COREN-MG-000024','Medicina do Trabalho','31988880024','renata.reis@clinica.com','Rua Professor Moraes, 450, Funcionários, Belo Horizonte - MG',4.62,'senha24'),(25,'Dr. Daniel Alexandre de Oliveira Tavares','11946225428','COREN-MG-000025','Infectologia','31988880025','daniel.tavares@clinica.com','Rua Padre Marinho, 230, Santa Efigênia, Belo Horizonte - MG',4.54,'senha25'),(26,'Dra. Juliana Patrícia de Lima Figueiredo','53422056033','COREN-MG-000026','Otorrinolaringologia','31988880026','juliana.figueiredo@clinica.com','Rua Major Lopes, 300, São Pedro, Belo Horizonte - MG',4.61,'senha26'),(27,'Dr. Marcelo Antônio de Souza Ribeiro','09236361102','COREN-MG-000027','Radiologia','31988880027','marcelo.ribeiro@clinica.com','Avenida Silva Lobo, 1800, Grajaú, Belo Horizonte - MG',4.56,'senha27'),(28,'Dra. Carla Vanessa de Oliveira Santana','36087078088','COREN-MG-000028','Alergologia','31988880028','carla.santana@clinica.com','Rua Aimorés, 900, Lourdes, Belo Horizonte - MG',4.60,'senha28'),(29,'Dr. Leandro Gustavo de Almeida Costa','96351618673','COREN-MG-000029','Cirurgia Vascular','31988880029','leandro.costa@clinica.com','Avenida Raja Gabaglia, 3500, Luxemburgo, Belo Horizonte - MG',4.58,'senha29'),(30,'Dra. Elisa Mariana de Faria Gomes','83347835158','COREN-MG-000030','Medicina Estética','31988880030','elisa.gomes@clinica.com','Rua Santa Rita Durão, 100, Savassi, Belo Horizonte - MG',4.70,'senha30'),(31,'Rafael Mendes Silva','08243912059','COREN-MG-000031','Enfermagem domiciliar e cuidados com pacientes ido','31988882233','rafael.mendes@medcare.com','Av. do Contorno, 1520, Lourdes, Belo Horizonte - MG',4.80,'medlar123'),(32,'Larissa Mendes Oliveira','12545678901','COREN-MG-000032','\"Enfermagem domiciliar, aplicação de medicamentos,','31987651234','larissa.oliveira@example.com','Rua Rio de Janeiro, 875, Centro, Belo Horizonte - MG',4.60,'prof2025'),(33,'Ricardo Souza Martins','45698712322','COREN-MG-000033','Clínico Geral e Medicina Preventiva','31998885544','ricardo.martins@example.com','Rua Pium-í, 420, Sion, Belo Horizonte - MG',4.90,'coremg456'),(34,'Joao Henrique','46545646546','COREN-MG-000034','Enfermeiro','31995897789','joaohenrique@yahoo.com','Av. Prudente de Morais, 1900, Cidade Jardim, Belo Horizonte - MG',5.00,'bhmed789'),(35,'Ana Pereira Silva','12345678901','COREN-MG-324567','Enfermagem domiciliar, cuidados pós-operatórios e ','31987654321','ana.silva.enf@gmail.com','Rua Marco Aurélio de Miranda, 01 - Buritis, Belo Horizonte/MG - 30575210',NULL,'Ana@2025'),(36,'Pablo Vinicus','49498484849','COREN-MG-000027','Enfermeiro','31994258548','pablo@gmail.com','Rua Rubi, 01 - Novo Horizonte, Ibirité/MG - 32412240',NULL,'123456');
/*!40000 ALTER TABLE `profissional` ENABLE KEYS */;
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
