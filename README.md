## Leonardo Broadcasting System

A project to help developers learn Angular 2 and power our TV displays.

### Usage
- Install node.js from https://nodejs.org by downloading and installing the 'Recommended For Most Users' version.
- Retrieve / clone the dashboard code to a local directory
- `WINDOWS ONLY` open a command prompt and navigate to the directory with the dashboard code 
  - run `npm install -g webpack webpack-dev-server typescript file-loader url-loader` to install global dependencies
- In the directory with the dashboard code:
  - run `npm install` to install dependencies
  - run `npm start` to fire up dev server
- open browser to [`http://localhost:3000`](http://localhost:3000)
- if you want to use other port, open `package.json` file, then change port in `--port 3000` script
- make sure you install cross origin request plugin from https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en