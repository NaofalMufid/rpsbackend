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
- login & logout (progress)
- crud (progress)
- erd
![alt text](https://cdn-images.visual-paradigm.com/guide/data-modeling/what-is-erd/01-entity-relationship-diagram.png)
- api
## API Endpoint :
```
# ok
/users/ = GET,POST
/users/:id = GET, PUT, DELETE

# progress
/userBiodata/ = GET,POST
/userBiodata/:id = GET, PUT, DELETE

/userHistory/ = GET,POST
/userHistory/:id = GET, PUT, DELETE
```

## Setting .env and run app
```
cp .env-example .env

#edit attribut value in .env

npm run start

#or

npm run dev
```