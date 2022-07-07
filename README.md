### DOCKERIZED

- Vào `src/main/resources` xóa `.local` phía sau `application.properties`
- Mở `Terminal` chạy lệnh `./mvnw clean package -DskipTests`
- Chạy xampp và tạo database tên `api`
- Chạy lệnh `docker-compose up -d --build`

#### buildVersion : Version 1.3.1

#### buildDate : 07-07-2022