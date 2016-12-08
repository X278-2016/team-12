# Building
Install webpack globally with `npm install -g webpack`. Then run `webpack` to build the app.

## Development
Run `npm install` to install all dependencies, then run `npm run dev` to get the development server running (defaults to port 8080).

Until we get a solid backened running, there's sample data available in `db.json`. Run `npm run backend-dev` to make the data available on port 3000.
The structure that of the generated API should closely mirror the final API structure.

## Note to self
VSCode doesn't play nice with `webpack-dev-server`. Instead, run `webpack --watch` so that VSCode can properly debug with source maps.


# Building
## Webpack and Babel
The front end uses Webpack and Babel to compile JSX code with ES6 features into standard JS code compliant with ES5.
Webpack uses a file, `webpack.config.js` to know which files to process.
Currently, Webpack is set up to take all `.js` and `.jsx` files and run them through `babel-loader`, and all `.css` files and run them through `css-loader` and `style-loader`.
The `externals` section refers to components that shouldn't be bundled by Webpack (i.e. we'll load them ourselves by including them in the HTML).
`React` and `ReactDOM` are obvious candidates, since we don't want to compile them each time the app is updated, and the others are for our testing.
The final section, `devServer`, refers to the development server that can be run by `npm run dev`.

If you want to build the code **and** run the development server, run `npm run dev`.
To just build the code, run `webpack` (make sure it's installed globally).
To tell Webpack to also build source maps, run `webpack -d`.

Babel is a transpiler which takes ES6 and React JSX files and transforms them into ES5-style JS files.
Webpack uses Babel via `babel-loader`, while the testing framework calls `require('babel-require')()` to transform our tests into JS code.
This means Babel configurations exist in two places: one in `.babelrc`, and one in `webpack.config.js`.

# Linting
I've been using ESLint to check my code.
It's configured with the Airbnb style and everything is configurable in `.eslintrc.json`.
I recommend finding an editor which will use this file and check your code as it's written (shameless ad for VSCode and the ESLint plugin)
`.editorconfig` is a companion to the ESLint file; it also specifies some stylistic things.

# Structure
The two most important files are `/index.html` and `/src/index.jsx`.
`index.html` is the only HTML page of the app and will load the JS bundle that webpack creates.
`index.jsx` is the entry point for the bundled application--when the JS bundle is loaded, the code in `index.jsx` is the only code that is run.
All other code must be called/ referenced by `index.jsx` to run.

## Folders
The development backend is in `/backend-testing`. Run the backend with `npm run backend-dev`.
Tests are in `/test` and should be run with `npm test`.
Each test should be put within its own `name.spec.jsx` file in `/test`.
The source code of the application is within `/src`, with `index.jsx` being the main file and all others existing in `/src/components`.

# React Router
The application uses React Router to handle routing, since the only page the server knows about is `index.html`.
`index.jsx` loads the Router and Routes. Each Route corresponds to part of the application.
An important distinction is that the navbar at the top of the app is not made by the Routes in `index.jsx`.
Instead, it's made by the Links in `App.jsx`. 

# Components
`App.jsx` is the main component.
It sets up a navbar with Links that will cause React Router to change the currently-displayed page, and a `container` (class name for Bootstrap) `div` for the rest of the app.
The container just renders whatever object `props.children` is set to.
Note that in React, all `props` are passed by the parent. Therefore, the parent of `App.jsx` (i.e. `index.jsx`) is responsible for telling `App` which part of the application to display.
`props.children` is changed by clicking on different Links in the navbar.

The components are arranged in different folders, roughly corresponding to the design of the application, with each page getting its own folder.

Any component that relies on `props` also has a `propTypes` section. It's functionally useless in that it could be removed without affecting the application,
but is useful for keeping track of what each data type you're using is (and React can give more useful errors when something breaks)

# Testing
Tests are run inside a fake browser (`browser.js`)--it just makes a DOM for React to use.
Enzyme is built by Airbnb and allows for testing of React components by either performing a full mount (which will emulate the full lifecycle of a component, including pre and post render hooks) or a shallow mount (just render the component).
Mocha is the testing framework which ties everything together by creating the fake DOM and running through all tests it can find (any file ending in `.spec.js` or `.spec.jsx` in `/tests`).
Chai is the assertion library used in each testing file.
Tests are written in a BDD style--that's the expect().to.be.XYZ thing that you see in the tests.

# Running
Run the application with `npm run dev`. You'll probably want the backend running too, so open up another terminal and run `npm run backend-dev`.
Run tests with `npm tests`.
