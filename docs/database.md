## Database configuration

### Getting started
* `npm i --save sequelize`

### Setup

* Navigate to [database config file](/config/dbconfig.json) and update your database credentials.
* Navigate to the [.env file](.env) and update the environment variables. If the .env file doesn't exist, create one taking this as a reference.

### Database modelling

* [models][/models] contains skeleton models for mongolia health portal.
* To create a new database model: 
`sequelize model:create --name superuser --attributes email:string, password:string, role:enum`
* Write `up` method to create or change table schema and `down` method to undo it.
 
### Data seeding

* [seeders](/seeders) contains pre-existing seed files for search API data.
* To create a new seed file: `npm sequelize seed:generate --name seed-file-name`
* Edit your seed file as required. Write `up` method to insert data and `down` method to undo it.
* Run: `npm sequelize db:seed:all`