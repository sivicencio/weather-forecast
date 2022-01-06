# Weather Forecast

## Contents

- [About](#about)
  - [Demo](#demo)
  - [Stack and libraries](#stack-and-libraries)
  - [Features](#features)
- [Setup](#setup)
  - [Proxy API](#proxy-api)
- [Testing](#testing)
- [Development process](#development-process)
  - [First ideas](#first-ideas)
  - [Project](#project) (tasks with links)
  - [Workflow](#workflow)
  - [CI](#ci)
  - [Deployment](#deployment)
  - [Considerations and decisions](#considerations-and-decisions)
- [Future work](#future-work)

## About

Weather Forecast is a single page application (SPA) built for a coding challenge. It consumes the [OpenWeatherMap 5 day weather forecast API](https://openweathermap.org/forecast5), which returns a forecast for 5 days, in intervals of 3 hours. The SPA displays the results in a simple and nice interface, where the user can navigate through the different intervals and visualize detailed information for each one of them.

The SPA is built with React using a specific set of tools, which are detailed in the following sections.

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
- [Font Awesome](https://fontawesome.com/) for a few icons
- date-fns for dates manipulation
- ESLint and prettier for code quality and formatting
- Cypress for testing

### Features

The following features can be almost directly mapped to the requirements of the coding challenge:
- Single page application (SPA) capable of fetching and displaying data from the [OpenWeatherMap 5 day weather forecast API](https://openweathermap.org/forecast5)
- Presenting the data based on a pre-defined design available as a Figma prototype
- Responsive behavior considering at least mobile, tablets and desktop screens

Besides the application features, a specific development workflow was also followed. This workflow included code quality and testing tools, Continuous Integration (CI) and Pull Requests (PRs) in Github, which are explained in further detail in the [Workflow](#workflow) section.

## Setup

First clone the repository and cd into it.

```bash
cd weather-forecast
```

You will need to add 2 environment variables, which are critical for the application to work:
- `REACT_APP_API_KEY`: should be set to the API key obtained from the OpenWeatherMap API
- `REACT_APP_API_URL`: should be set to the base URL of the API. Please check the [Proxy API](#proxy-api) section below to get more details

An example is provided inside the `.env.example` file, which you can copy and fill with corresponding values.

```bash
cp .env.example .env.local
```

**Note**: you need to fill the variables in the `.env.local` file. You will find only one of them filled with an example that might work if you follow the steps in the [Proxy API](#proxy-api) section below, but the other one (the API key) is up to you.

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

For development purposes, **you can mount your own proxy API locally** [following the instructions inside this repository](https://github.com/sivicencio/cors-proxy). If you follow the default configuration, it's very simple and straightforward, and you would not need to change the `REACT_APP_API_URL` env variable from the example file.

## Testing

The application includes an end-to-end (e2e) testing suite built with [Cypress](https://www.cypress.io/). To run the tests execute the following:

```bash
yarn test
```

You need to have Cypress installed in your computer, but when installing the app dependencies, it should be automatically installed. When running the above command, the Cypress Test Runner opens inside a window, and then you can press "Run 1 integration test" at the right to run the whole suite. To close the test runner, just press the "Stop" button at the top right corner of the window.

## Development process

### First ideas

When first encountered with the challenge, I wrote a list of general requirements and things to have in consideration that allowed me to have a big picture of what needed to be done or, in other words, the scope of the project.

With this picture in mind, I started to organize the project in tasks, following an approach that would allow me to incrementally and at the same time iteratively make progress towards a final solution. In this process I made the following definitions:
- Use ESLint with the Airbnb style guide and prettier for code quality and formatting
- Add an end-to-end testing suite with Cypress
- Follow the Github Flow development workflow (for feature branches and Pull Requests)
- Configure Github Actions with linter, formatter and testing, and restrict merge of Pull Requests if they do not pass
- Configure deployment with Netlify for the demo SPA, as it has a very straighforward integration with Github
- Start with a static implementation of the SPA, without consuming the API
- Add global state management with Redux for consuming and storing the API data
- Iterate on the design adding enhancements and fixing possible issues

### Project

The tasks mentioned in the previous section were added to [a project in this repository](https://github.com/sivicencio/weather-forecast/projects/1), following the Kanban methodology. Each of the tasks have details of implementation and are linked to their respective Pull Request (with the actual implementation). The list (including links) is the following:

- [Add ESLint config to project](https://github.com/sivicencio/weather-forecast/issues/1)
- [Configure Netlify deployment](https://github.com/sivicencio/weather-forecast/issues/2)
- [Add static base structure](https://github.com/sivicencio/weather-forecast/issues/3)
- [Add Redux with configuration](https://github.com/sivicencio/weather-forecast/issues/4)
- [Integrate API to fetch weather data](https://github.com/sivicencio/weather-forecast/issues/5)
- [Add full design implementation](https://github.com/sivicencio/weather-forecast/issues/6)
- [Add cypress with configuration](https://github.com/sivicencio/weather-forecast/issues/7)
- [Add end-to-end testing suite](https://github.com/sivicencio/weather-forecast/issues/8)
- [Write documentation](https://github.com/sivicencio/weather-forecast/issues/9)

### Workflow

For the development, the [Github Flow](https://docs.github.com/en/get-started/quickstart/github-flow) workflow was followed, mainly because it allows us to add new features in a very organized and clean way. For each feature, a feature branch was created and a corresponding Pull Request (PR) was opened. The code review process did not happen in this case (for obvious reasons), but everything else did. Finally, each PR was merged to the `main` branch and that way integrated into the codebase.

Regarding the commits format, the [Angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) was followed, since it provides a very direct and well-communicated way of adding changes to the codebase. A few mistakes were made when doing the merge of the Pull Requests, which made me ommit a few valuable data (automatic links and commit format), but you could check the commit history to see how it was actually implemented.

When merging PRs, the "Squash and merge" strategy was used, which condenses the feature commits into a single commit. However, when looking the details of a PR, you can check the total number of commits.

### CI

The project currently includes 2 Github Actions:
- Linting and formatting, using ESLint with Airbnb config and prettier, respectively
- Cypress Testing for E2E testing

Both of these actions are run when opening a PR (and also when adding new commits to that PR), and are configured as required status checks for merging. This means that a PR cannot be merged if the status checks do not pass. This allows us to have a safer codebase, because we can be sure that at least the existing testing suite and the code quality requirements are met.

### Deployment

As mentioned in the [First ideas](#first-ideas) section, the application is configured to be deployed using Netlify. A deployment is triggered whenever a Pull Request (PR) is merged into the `main` branch, so that way an up-to-date version of the application is immediately available as a demo.

This behavior makes an important assumption: **the `main` branch has to be stable**. In this case, we can be pretty sure that it's likely to be stable, because of the CI configuration in place, which runs the code quality and testing Github Actions. No code will make it to the `main` branch if these status checks do not pass.

The **demo of the application** deployed in Netlify [can be found here](https://condescending-jepsen-b6607a.netlify.app/). Consider that the Proxy API used by the SPA is hosted in Heroku as part of a free plan, so if not used for some time, the process hosting the API is asleep and takes some seconds to wake up. This translates to a longer period with a loading spinner displayed in the SPA. Be patient if that happens to you, please. The results will arrive eventually.
### Considerations and decisions

Besides the decisions mentioned in the [First ideas](#first-ideas) section, the following considerations and decisions were made when doing this challenge:

1. The Figma prototype was considered as a source of truth. This means that it was implemented as similar as possible, not including more features that what could be seen there
2. The only feature extracted from the Figma prototype that has me as the author, is the responsive layout for smaller screen sizes
3. The spacing and sizes were taken as a reference, trying to be as close as possible to the Figma prototype. However, since a responsive layout was implemented, at the end the implementation is based on proportions rather than fixed values. These proportions produce a similar result to the one in the prototype, but not the same
4. The OpenWeatherApi includes more than just a "Clear" and "Clouds" forecasts, however, only icons for that pair of forecast were provided for this challenge. For this reason, an icon with a cloud was used (thanks to Font Awesome) for any other type of forecast ("Rain", for example)

## Future work

- **Provide a search input for locations** (or a select with a number of pre-defined locations). Right now the application only shows the forecast for Munich. The Redux store currently includes a state for the location, which is used to perform the API request, so only the "mutation" part would need to be implemented
- **Add a visual cue indicating that a horizontal scroll is available**. It could be a pair of arrows almost transparent of disappearing after a few seconds. Currently the implementation shows in several screen sizes a fragment of an incomplete forecast item, as a hint that the user can actually scroll
- **Add icons suitable for different types of forecast**. Currently a cloud icon is used for any forecast different than "Clear" or "Clouds"
- **Add a code coverage tool for the testing process**. Even though the current test suite is simple, it would be better to have metrics about the coverage
