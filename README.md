## Payments app using MERN

A simple payment app using React.js, MongoDB, Express.js and TailwindCSS.

## Screenshots

![signup page](https://github.com/j-mahapatra/payments-app/assets/107102771/b944abbe-5ad3-4942-9c72-f7cb4f5d9dee)
![signin page](https://github.com/j-mahapatra/payments-app/assets/107102771/2e89ea02-82f7-476e-87c6-43b1276df537)
![dashboard page](https://github.com/j-mahapatra/payments-app/assets/107102771/03f15747-e763-43b3-9c57-397e40ea7587)
![send money page](https://github.com/j-mahapatra/payments-app/assets/107102771/a48b448b-68d2-483c-b36e-1a34e3c8c85b)

## API Routes

| Request Type | Endpoint URL                       | Description                                   |
|--------------|------------------------------------|-----------------------------------------------|
| POST | `/api/v1/user/signup` | User signup |
| POST | `/api/v1/user/signin` | User signin |
| GET | `/api/v1/user/get-users?filter=example` | Get a list of filters with firstName, lastName or userName matching the filter |
| POST | `/api/v1/user/update` | Update user details |
| POST | `/api/v1/account/transfer` | Transfer funds |
| GET | `/api/v1/account/account-details` | Account details |
