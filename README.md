[![Netlify Status](https://api.netlify.com/api/v1/badges/45163ef9-23ed-48ae-ad15-9c8f2cbee202/deploy-status)](https://app.netlify.com/sites/thepopculturetrip/deploys)

Frontend for [The Pop Culture Trip](https://thepopculturetrip.netlify.com/), where I track my pop culture consumption. It runs on [VueJS](https://vuejs.org) and is deployed to [Netlify](https://www.netlify.com).

## Install locally

### Clone

First, clone the repo:

```
git clone https://github.com/bobbysebolao/thepopculturetrip-client.git
```

### Install

Then, install the dependencies by running `npm install`. You can use yarn, but make sure to delete the `package-lock.json` file then.

### .env

Open the repo in your favorite code editor and create a new file in the root called `.env`. Copy what's in `.env.dist` . You may not have a value for the key `VUE_APP_API_BASE_URL` at this point - we'll get to that.

### Run

Run the project with `npm run start:dev` and go to `localhost:8080`.

### Connect to the server

When you open the app you might get an error saying it's not able to connect to the API. If that's the case, follow the instructions for [thepopculturetrip-server](https://github.com/bobbysebolao/thepopculturetrip-server). Once you have that up and running, copy the URL the server's running on and use that as the value for `VUE_APP_API_BASE_URL` in your `.env` file.
