# Messenger App

This project is a simple web-based messaging app with responsive mobile design that allows users to send messages to each other. Users can create and customize their profiles, authorize their accounts, and engage in one-on-one conversations with real time updates.
![messenger-app1](https://github.com/kenyounot123/messenger-app/assets/70028795/5a503f10-f78b-4a09-89de-5942a5975e7d)
![messenger-app2](https://github.com/kenyounot123/messenger-app/assets/70028795/8718ec20-e774-4047-b394-68ddac358d2c)
![messenger-app3](https://github.com/kenyounot123/messenger-app/assets/70028795/ef794533-818e-4020-abd0-9a62163d1ad8)
![messenger-app4](https://github.com/kenyounot123/messenger-app/assets/70028795/1ca00300-61bb-4bb9-9170-336176a2a26f)

# Deployed live here

- [Link here](https://messenger-app-0vcf.onrender.com)

# Usage 

### Running locally 
Install the necessary gems and dependencies in both folders. Open terminal and navigate to the root of Rails folder, then run:
```
bundle install
```
Navigate to frontend folder and install dependencies 
```
npm install
```
Since this project is in a monorepo structure, you must have two instances of the terminal running, one to start the rails server for api access, and one to start the vite server for the frontend (remember to cd into frontend to start vite server)
```
rails s
```
```
cd frontend/
npm run dev
```
# Accessing the API
Base URL for api depends on the environment. 
In development:
```
http://localhost:3000
```
In Production:
```
https://messenger-app-0vcf.onrender.com
```
Accessing api endpoints for authentication (taken from [devise-api gem](https://github.com/nejdetkadir/devise-api))
```
# Use base url from above. This endpoint is for user sign in, sign up, and sign out. This is taken from devise-api gem for token based authentication 
BASE_URL/users/tokens 
```
Priamry api endpoints have a abase url of 
```
# Use base url from above depending on the environement you are in.
BASE_URL/api/v1
```
All routes are found inside the config/routes folder or by running rails routes in the root of the app
```
$ rails routes
```
# Things I learned
It was my first full-stack app where I would use different technologies for the frontend and the backend. Incorporating a frontend technology like React with Ruby on Rails was very different because in a normmal full stack app using traditional Ruby on Rails, the front end would be directly served from Rails through views. I learned a lot about handling routing and API communication, as well as state management. 

# Technologies Used

- React and Vite for frontend
- Ruby on Rails for backend
- Active cable for Real-time messaing and Websocket integration
- Devise-api gem for user authentication using tokens
- Deployed using Render
- ChakraUI for frontend component library

# Future updates/implementations
- Sending images in chat
- Updating user profiles

Both of these can be implemented using Active Storage in Rails
