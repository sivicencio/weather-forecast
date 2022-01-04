import React from 'react';
import { createUseStyles } from 'react-jss';
import Card from '../components/Forecast/Card';
import Selection from '../components/Forecast/Selection';

const FORECAST_DATA = [
  {
    measurements: {
      temp: 3,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 0, 0),
  },
  {
    measurements: {
      temp: 3,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 1, 0),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 2, 0),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 3, 0),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 4, 0),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 5, 0),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 6, 0),
  },
  {
    measurements: {
      temp: 4,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 7, 0),
  },
];

const useStyles = createUseStyles({
  mainContainer: {
    fontSize: 42,
  },
  cardsContainer: {
    display: 'flex',
    overflowX: 'auto',
  },
});

const Forecast = function Forecast() {
  const classes = useStyles();

  return (
    <main className={classes.mainContainer}>
      <Selection forecast={FORECAST_DATA[0]} />
      <section className={classes.cardsContainer}>
        {FORECAST_DATA.map((forecast) => (
          <Card key={forecast.time.getTime()} forecast={forecast} />
        ))}
      </section>
    </main>
  );
};

export default Forecast;
