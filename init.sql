CREATE SCHEMA `eldorado-interview`;
CREATE SCHEMA `eldorado-interview-test`;
CREATE USER dbElDoradoInterview identified WITH 'caching_sha2_password' BY 'JCOwb?e5TYjd';
CREATE USER dbElDoradoInterviewTest;
GRANT ALL PRIVILEGES ON `eldorado-interview`.* TO dbElDoradoInterview WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON `eldorado-interview-test`.* TO dbElDoradoInterviewTest WITH GRANT OPTION;
FLUSH PRIVILEGES;