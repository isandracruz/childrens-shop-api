# Children's shop API

Example of an API for a children's shop.

## Set environment variables

### PORT
The port where the server will be listening is established. It's optional.

```
PORT=3004
```
### DB_URI
The API uses MongoDB as the database manager.

To use MongoDB locally, the URI host must be the localhost.

```
DB_URI=mongodb://localhost:27017/childernss-shop
```

To use MongoDB from the docker service, the URI host must be mongodb.

```
DB_URI=mongodb://mongodb:27017/childernss-shop
```

## Running the app in localhost

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# build
$ npm run build

```

## Running the app in docker

Docker version 20.10.23 or higher must be installed.
Docker Compose version 2.15.1 or higher must be installed.

Executing the following command enables the services that allow the use of the API and the database (using the MongoDB database manager).

```bash
# Run the necessary docker services
$ docker-compose up
```

## Usage

The API is documented. The documentation can be accessed in the path `/api`. For example: 
```
http://localhost:3004/api```
