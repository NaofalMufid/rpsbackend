# RockPaperScissors Backend
This repository for dashboard management RockPaperScissors Game. 

## Build with :
- node
- express
- ejs
- postgres
- sequelize & sequelize-cli

## Features
- admin dashboard 
- login & logout 
- crud user, biodata and history
- erd
![alt text](https://github.com/NaofalMufid/rpsbackend/blob/main/class-diagram.png?raw=true)
- api
## API Endpoint :
```
/api/users/ = GET,POST
/api/users/:id = GET, PUT, DELETE
/api/register = POST
/api/login = POST

/api/userBiodata/ = GET,POST
/api/userBiodata/:id = GET, PUT, DELETE

/userHistory/ = GET,POST
/userHistory/:id = GET, PUT, DELETE
```

## Setting .env and run app
```
cp .env-example .env

# edit attribut value in .env
```

edit server.js for next npm run apps for running db-sync
```
const db = require("./app/models")
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.")
})
```
```
npm run start
```

# or
```
npm run dev
```

edit server.js for next npm run apps db not running db-sync
```
const db = require("./app/models")
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.")
})
```

# run seeder
```
npx sequelize db:seed:all
```