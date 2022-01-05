import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Forecast/Card';
import Selection from '../components/Forecast/Selection';
import { updateForecastSelection } from '../store/modules/selection/selectionSlice';

const FORECAST_DATA = [
  {
    measurements: {
      temp: 3,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 0, 0).getTime(),
  },
  {
    measurements: {
      temp: 3,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 1, 0).getTime(),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 2, 0).getTime(),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 3, 0).getTime(),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clouds',
    time: new Date(2021, 2, 28, 4, 0).getTime(),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 5, 0).getTime(),
  },
  {
    measurements: {
      temp: 2,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 6, 0).getTime(),
  },
  {
    measurements: {
      temp: 4,
      tempMin: 2,
      tempMax: 12,
    },
    summary: 'Clear',
    time: new Date(2021, 2, 28, 7, 0).getTime(),
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedForecast = useSelector((state) => state.selection.forecast);

  useEffect(() => {
    dispatch(updateForecastSelection(FORECAST_DATA[0]));
  }, [dispatch]);

  return (
    <main className={classes.mainContainer}>
      {selectedForecast && <Selection forecast={selectedForecast} />}
      <section className={classes.cardsContainer}>
        {FORECAST_DATA.map((forecast) => (
          <Card key={forecast.time} forecast={forecast} />
        ))}
      </section>
    </main>
  );
};

export default Forecast;
