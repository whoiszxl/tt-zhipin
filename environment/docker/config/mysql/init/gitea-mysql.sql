/******************************************/
/*   创建 nacos 数据库   */
/******************************************/
CREATE DATABASE IF NOT EXISTS gitea default charset = utf8mb4;

/******************************************/
/*   创建 MySQL 用户，Nacos Server 连接用   */
/******************************************/
CREATE USER 'tt-zhipin-gitea'@'%' IDENTIFIED BY 'tt-zhipin-gitea';
GRANT ALL PRIVILEGES ON `gitea`.* TO 'tt-zhipin-gitea'@'%' IDENTIFIED BY 'tt-zhipin-gitea';
FLUSH PRIVILEGES;