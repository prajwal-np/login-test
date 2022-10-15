# Login Test

## Front End 

- Install packages
    `npm install`
- Configure .env
  >  `REACT_APP_SERVER_HOSTNAME=localhost:4000`
    `TOKENAME=app_token_iids`
- Run dev server
    `npm run start`

## Backend

- Create database table `login`
- Configure .env
  >  `SQL_DB=login`
    `SQL_SERVER=localhost`
    `SQL_PORT=3306`
    `SQL_USERNAME=admin`
    `SQL_PASSWORD=password`
    `SECRET=my-secret`
    `SALT=10`
- Install all packages `npm install`
- Run dev server `npm run dev`
> Swagger host: localhost:4000/docs (u/p) `admin/passme21`