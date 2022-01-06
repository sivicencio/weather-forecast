# Weather Forecast

## Contents

- About
  - Demo
  - Stack and libraries
  - Features
- Setup
- Testing
- Development process
  - Preliminar thoughts and organization
  - Project (tasks with links)
  - Workflow
  - CI
  - Deploy
  - Considerations and decisions
-  Future work

## About

Weather Forecast is a single page application (SPA) built for a coding challenge. It consumes the [OpenWeatherMap 5 day weather forecast API](https://openweathermap.org/forecast5), which returns a forecast for 5 days, in intervals of 3 hours. The SPA displays the results in a simple and nice interface, where the user can navigate through the different intervals and visualize detailed information for each one of them.

The SPA in built with React using a specific set of tools, which are detailed in the following sections.

### Demo

A **live demo of the application** [can be found here](https://condescending-jepsen-b6607a.netlify.app/).

The following screenshot was taken from that demo:

<img width="1728" alt="Screen Shot 2022-01-06 at 03 04 28" src="https://user-images.githubusercontent.com/421739/148336517-fb43ec80-92f0-462c-b2d6-58fdf33f2451.png">

### Stack and libraries

- React 17 using [Create React App](https://create-react-app.dev/)
  - Node 16 (LTS) for development tasks
  - Yarn 1.22.17
- Redux and [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- React JSS for CSS-in-JS features
- date-fns for dates manipulation
- ESLint and prettier for code quality and formatting
- Cypress for testing

### Features

The following features can be almost directly mapped to the requirements of the coding challenge:
- Single page application (SPA) capable of fetching and displaying data from the [OpenWeatherMap 5 day weather forecast API](https://openweathermap.org/forecast5)
- Presenting the data based on a pre-defined design available as a Figma prototype
- Responsive behavior considering at least mobile, tablets and desktop screens

Besides the application features, a specific development workflow was also followed. This workflow included code quality and testing tools, Continuous Integration (CI) and Pull Requests (PRs) in Github, which are explained in further detail in the Workflow section.

## Setup

First clone the repository and cd into it.

```bash
cd weather-forecast
```

You will need to add 2 environment variables, which are critical for the application to work:
- `REACT_APP_API_KEY`: should be set to the API key obtained from the OpenWeatherMap API
- `REACT_APP_API_URL`: should be set to the base URL of the API. Please check the Proxy API section below to get more details

An example is provided inside the `.env.example` file, which you can copy and fill with corresponding values.

```bash
cp .env.example .env.local
```

**Note**: you need to fill the variables in the `.env.local` file. You will find only one of them filled with an example that might work if you follow the steps in the Proxy API section below, but the other one (the API key) is up to you.

Install the application dependencies.

```bash
yarn install
```

Finally run the application.

```bash
yarn start
```

### Proxy API

Due to CORS policy, the original OpenWeatherMap API does not allow requests from any origin. One solution is to use a proxy API that can accept the origin of the SPA and then redirect the original request to the OpenWeatherMap API.

In this case, such a proxy API can be run using the [cors-anywhere](https://www.npmjs.com/package/cors-anywhere) package, which initially allows us to make a request to any URL we want, adding CORS headers for us. A small instance of a Node.js server with the proxy API is running at https://sivicencio-cors-proxy.herokuapp.com/. However, to filter CORS access to specific origins, only the demo SPA origin is allowed.

For development purposes, **you can mount your own proxy API locally** [following the instructions inside this repository](https://github.com/sivicencio/cors-proxy). If you follow the default configuration, it's very simple and straightforward.

## Testing

The application includes an end-to-end (e2e) testing suite built with [Cypress](https://www.cypress.io/). To run the tests execute the following:

```bash
yarn test
```

You need to have Cypress installed in your computer, but when installing the app dependencies, it should be automatically installed. When running the above command, the Cypress Test Runner opens inside a window, and then you can press "Run 1 integration test" at the right to run the whole suite. To close the test runner, just press the "Stop" button at the top right corner of the window.

## Development process

### Preliminar thoughts and organization

### Project (tasks with links)

### Workflow

### CI

### Deploy
### Considerations and decisions

## Future work

