# Sprockets REST API servers

This is a sample implementation in `Python` and `Typescript` for a REST API service,
build on top of the following stacks:

`Python + DJango`
`Python + Flask + SQLAlchemy + Swagger`
`Python + Bottle + SQLAlchemy + Swagger`
`NodeJS + Express + TypeORM + Swagger`
`PostgreSQL`
`Docker + Docker Compose`

Here the objective is to show different approaches to build a REST API services,
as in using frameworks, direct handlers, authentication, API testings, etc.

Each implementation serves for a different purpose on this sample:

`Bottle` serves as a quick prototype system allowing to present an idea/demo
`Flask` serves as micro implementation to setup a basic serverless/lambda service
`Django` servers a complete solution to serves as API but also as Dashboard

`Express` serves a similar purpose as `Bottle` or `Flask` to prove the NodeJS
environment, and working along `Swagger` turns in a fast small solution.

## General Testing

Is a requirement to have Installed and Properly configured Docker and Docker Compose,
those can be obtain respectively from:

- <https://docs.docker.com/>
- <https://docs.docker.com/compose/>

In order to test these implementation, Web UI was implemented for all those
services to facilitates the demo/testing and it can be located at the url: `/api/ui`
on each services.

**All following commands, should be executed in the root of project.**

## Django + Postgresql

This set of services can be launch using `docker-compose` command, e.g.:

```
docker-compose -f docker-compose-python-django.yml up
```

Django offers its own Web API UI powered by Django RESTFramework, this can be
accessed once services are fully running via the url: `http://localhost:8080/api/`

This is a more complete implementation/demo therefore this implements authentication
security, and the base credentials for this one are:

User: **admin**
Pass: **admin**

In the same way, Django admin can be accessed via the url `http://localhost:8080/admin/`

If external software as Postman are use for testing, some extra steps are needed:

- GET: http://localhost:8080/api-auth/login
- From response headers, obtain the value of: **csrftoken**
- POST: http://localhost:8080/api-auth/login/
  - Set in headers the for key **X-CSRFToken** the previous value of **csrftoken**
  - Set in body the key and values: **username**:**admin**
  - Set in body the key and values: **password**:**admin**
- Once authenticated, other /api endpoints are accesible

This security process can be adapted on any client requesting access to API, and
can be modified to use JWT tokens, or different authentications.

For this implementation, Query Parameters were added to production GET endpoint,
allowing filter results by factory or by sprocket, providing the proper ID, e.g.:

```
http://localhost:8080/api/sprocket-production/v1/?factory=3575c883-b97a-49c9-8d40-757c40fd2eb4
```
```
http://localhost:8080/api/sprocket-production/v1/?sprocket=10d8e09b-77dd-462d-819f-48fb5ab23634
```

or the combination of both:

```
http://localhost:8080/api/sprocket-production/v1/?factory=3575c883-b97a-49c9-8d40-757c40fd2eb4&sprocket=10d8e09b-77dd-462d-819f-48fb5ab23634
```

Multiple and different implementations are possible, but the use of Query Parameters
serves as demo

To safely turn off these services is recommended execute:
```
docker-compose -f docker-compose-python-django.yml down --volumes
```

## Flask + Postgresql

This set of services can be launch using `docker-compose` command, e.g.:

```
docker-compose -f docker-compose-python-flask.yml up
```

Flask in this sample is working along Swagger to offers a API documentation, based
on OpenAPI standards, and this can be accessed once services are fully running
via the url: `http://localhost:8080/api/ui/`

If external software as Postman are use for testing, some extra steps are needed:

- GET: http://localhost:8080/api/auth/admin
- ...The response is the JWT token for future queries
- GET: http://localhost:8080/api/sprockets
  - Set in Authorization, **Bearer Token** the value from previous request
  - ...Other API endpoints uses the same authentication mechanism

This security process can be adapted on any client requesting access to API, and
can be modified to use API Key, or different authentications.

To safely turn off these services is recommended execute:
```
docker-compose -f docker-compose-python-flask.yml down --volumes
```

## Bottle + Postgresql

This set of services can be launch using `docker-compose` command, e.g.:

```
docker-compose -f docker-compose-python-bottle.yml up
```

Bottle in this sample is purely a API services not providing any UI related,
serving as example of the most basic implementation for a REST API service.

The available endpoints for this implementation are the following

### Sprockets
```
(list)      GET: http://localhost:8080/api/sprockets/v1
(details)   GET: http://localhost:8080/api/sprockets/v1/{id}
(create)   POST: http://localhost:8080/api/sprockets/v1
(update)    PUT: http://localhost:8080/api/sprockets/v1/{id}
(delete) DELETE: http://localhost:8080/api/sprockets/v1/{id}
```

### Sprocket Factory
```
(list)      GET: http://localhost:8080/api/sprockets-factory/v1
(details)   GET: http://localhost:8080/api/sprockets-factory/v1/{id}
(create)   POST: http://localhost:8080/api/sprockets-factory/v1
(update)    PUT: http://localhost:8080/api/sprockets-factory/v1/{id}
(delete) DELETE: http://localhost:8080/api/sprockets-factory/v1/{id}
```

### Sprocket Factory Production
```
(list)      GET: http://localhost:8080/api/sprockets-factory-production/v1
(list)      GET: http://localhost:8080/api/sprockets-factory-production/v1?factory={id}
(list)      GET: http://localhost:8080/api/sprockets-factory-production/v1?sprocket={id}
(details)   GET: http://localhost:8080/api/sprockets-factory-production/v1/{id}
(create)   POST: http://localhost:8080/api/sprockets-factory-production/v1
(update)    PUT: http://localhost:8080/api/sprockets-factory-production/v1/{id}
(delete) DELETE: http://localhost:8080/api/sprockets-factory-production/v1/{id}
```

To safely turn off these services is recommended execute:
```
docker-compose -f docker-compose-python-bottle.yml down --volumes
```

## NodeJs + Express + Postgresql

This set of services can be launch using `docker-compose` command, e.g.:

```
docker-compose -f docker-compose-nodejs-express.yml up
```

Express in this sample is working along Swagger to offers a API documentation, based
on OpenAPI standards, autogenerated, and this can be accessed once services are fully running
via the url: `http://localhost:8080/api/ui/`

This security process can be adapted on any client requesting access to API, and
can be modified to use API Key, JWT Tokens, or different authentications.

To safely turn off these services is recommended execute:
```
docker-compose -f docker-compose-nodejs-express.yml down --volumes
```
