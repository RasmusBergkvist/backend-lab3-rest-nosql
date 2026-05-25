# Laboration 3.1 REST-API NoSQL
I denna uppgift skapas ett REST API byggt med Express och Mongo DB. Genom CRUD (Create, Read, Update, Delete) ska arbetslivserfarenhet kunna läggas till, uppdateras och raderas via API:et. Det kommer sedan att integreras med en webbplats i laborationens andra del.

## Teknik
Databas: Mongo DB
Databasserver: Mpngo DB Atlas
NPM-paket: mongoose, express, nodemon, dotenv, cors

## Kom igång
* Klona ner repot.
* Kör npm install för att installera beroenden.
* Skapa en .env-fil.
* Kör node install.js för att skapa databastabell (collection).
* Starta med npm run start.

## API
### Hämta alla lagrade objekt:
`GET /workexp`

### Hämta ett lagrat objekt:
`GET /workexp/:id`

Exempel  `GET /workexp/6a13e7c6b3d667c1b311ac73`

Statuskod vid svar:

* **200 OK:** Om datan finns.
* **400 Bad request:** Om felaktigt id anges.
* **404 No found:** Om ingen data hittas.
* **500 Internal Server Error**

## Lägga till objekt
`POST /workexp`

```
{
    "companyname":"Awesome IT",
    "jobtitle": "Webdeveloper",
    "location": "Älmhult",
    "startdate": "2025-01-01",
    "enddate": "2025-12-31",
    "description": "Development of awesome websites."
}
```

Statuskod vid svar:

* **201 Created:** Om datan läggs till.
* **400 Bad Request:** Om obligatoriska data saknas (companyname, jobtitle, location, startdate och description), eller om felaktigt id anges.
* **409 Conflict:** Om datan som användare försöker lägga till redan finns inlagd.
* **500 Internal Server Error**

### Uppdatera objekt
`PUT /workexp/:id`

Statuskod vid svar:

* **200 OK:** Om datan uppdaterades.
* **400 Bad Request:** Om obligatoriska data saknas (companyname, jobtitle, location, startdate och description), eller om felaktigt id anges.
* **404 Not found:** Om ingen data hittas.
* **500 Internal Server Error**

### Radera objekt
DELETE /workexp/:id

Tar bort raden i tabellen.

Exempel  `DELETE /workexp/6a13e7c6b3d667c1b311ac73`

Statuskod vid svar:

* **200 OK:** Om datan finns.
* **400 Bad request:** Om felaktigt id anges.
* **404 No found:** Om ingen data hittas.
* **500 Internal Server Error**
