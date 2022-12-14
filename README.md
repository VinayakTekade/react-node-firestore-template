This is a boilerplate template repository to quick get started with React, Node and Firebase with authentication and CRUD operations.

## Available Scripts

In the project directory, you can run:

### `npm run develop`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Initialise Firebase

###Step 1:

Create an .env file in the root of the project with the following variables, the values of these field can be found from firebase web app configuration.

```
REACT_APP_API_KEY=""
REACT_APP_PROJECT_ID=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""
REACT_APP_FIREBASE_CLIENT_ID=""
GOOGLE_APPLICATION_CREDENTIALS=./saKey.json
DEFAULT_EMAIL_ID=""
NODE_ENV=development
```

###Step 2:

Create service account key from firebase and put it in the root of the directory with the name `saKey.json`
