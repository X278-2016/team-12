# Building
Install webpack globally with `npm install -g webpack`. Then run `webpack` to build the app.

## Development
Run `npm install` to install all dependencies, then run `npm run dev` to get the development server running (defaults to port 8080).

Until we get a solid backened running, there's sample data available in `db.json`. Run `npm run backend-dev` to make the data available on port 3000.
The structure that of the generated API should closely mirror the final API structure.

## Note to self
VSCode doesn't play nice with `webpack-dev-server`. Instead, run `webpack --watch` so that VSCode can properly debug with source maps.
