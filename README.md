# Wax Backend

![Logo](https://github.com/royr5/gatefold-frontend/assets/73461138/bb83783d-7c4d-401c-9020-c36937333ad8)

## Run Locally

Clone the project

```bash
  git clone https://github.com/royr5/gatefold-api.git
```

Go to the project directory

```bash
  cd gatefold-api
```

Install dependencies

```bash
  npm install
```

Create two new files .env.test and .env.development to set up the environment variables

```
.env.test
PGDATABASE=gatefold_api_test

# Spotify
# Replace the following with your own Spotify API details
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

```
.env.dev
PGDATABASE=gatefold_api

# Spotify
# Replace the following with your own Spotify API details
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
```

Setup the database

```
npm run setup-db
```

Seed the database

```
npm run seed-dev
```

Run tests

```
npm run test
```

## Features

- **RESTful API:** Handles user authentication, music data, and more.
- **Postgres Database:** Main relational data storage.
- **AWS Lambda Function** .
- **MongoDB Atlas:** Secured database for sensitive user data.
- **Security Measures:** Passwords hashed and salted with Bcrypt.
- **Jest and Supertest for testing**

## Frontend Repository

The frontend code for this project can be found in the [gatefold-frontend repository](https://github.com/royr5/gatefold-frontend).

## Authors

- [Jordan Watson](https://www.linkedin.com/in/jordan-watson-13884aba/)
- [Hudaifa Temsamani Daoudi](https://www.linkedin.com/in/hudaifa-tem/)
- [Ari Abendstern](https://www.linkedin.com/in/ari-abendstern)
- [Francesco Vurchio](https://www.linkedin.com/in/francesco-vurchio/)
- [Karo Barari](https://www.linkedin.com/in/karo-barari-2a0947293/)
- [Roshan Roy](https://uk.linkedin.com/in/roshrr)
