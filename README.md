# RockPaperScissors Backend
This repository for **backend** and **dashboard** management RockPaperScissors Game. 

## Build with :
- node
- framework : express
- view engine : ejs
- database : postgres
- library/package: sequelize & sequelize-cli, passport, jsonwebtoken, bcrypt

## Features
- admin dashboard 
- login & logout 
- crud user, biodata and history
- api

## database design
![alt text](https://github.com/NaofalMufid/rpsbackend/blob/main/class-diagram.png?raw=true)

## Dashboard APP
run in **htpp://localhost:8000** or **htpp://127.0.0.1:8000**

resource :
- users
- user biodata
- user history


## API Endpoint :
```
/api/v1/players/ = GET
/api/v1/players/:id = GET
/api/v1/register = POST
/api/v1/login = POST

/api/v1/assets = GET
/api/v1/assets/:id = GET
```

## Setting database and run app
```
edit attributes vale on file db.config.json in app/config/
sequelize db:create
sequelize db:migrate

npm run start
# or
npm run dev
```
### run seeder
```
sequelize db:seed:all
```