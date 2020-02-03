# Sample project

### Configuration
Config based enviroment setup
please create this file
1 `.env`
```
SERVER_PORT="3000"
```

1 `config/config.json` for DB used MySQL with [Sequelize ORM](https://sequelize.org/)
```json
{
  "development": {
    "username": "shukri",
    "password": "123",
    "database": "auth_express_db",
    "host": "192.168.64.2",
    "dialect": "mysql"
  },
  "test": {
    "username": "shukri",
    "password": "123",
    "database": "auth_express_db",
    "host": "192.168.64.2",
    "dialect": "mysql"
  },
  "production": {
    "username": "shukri",
    "password": "123",
    "database": "auth_express_db",
    "host": "192.168.64.2",
    "dialect": "mysql",
    "logging": false,
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    }
  }
}


```

 
```sh
$ cd auth_express
$ npm run setup
```
This process will install the dependencies and config all enviroment needed. 

To start
```sh
$ npm start
```

