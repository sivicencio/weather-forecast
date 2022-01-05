import React, { useEffect, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { useGetForecastQuery } from '../api/forecast';
import Card from '../components/Forecast/Card';
import Selection from '../components/Forecast/Selection';
import Fullscreen from '../components/UI/Fullscreen';
import Loading from '../components/UI/Loading';
import { updateForecastSelection } from '../store/modules/selection/selectionSlice';

const KELVIN_TO_CELSIUS = 273.15;

function buildSingleForecast(forecast) {
  const {
    dt,
    main: { temp, temp_max: tempMax, temp_min: tempMin },
    weather,
  } = forecast;
  const [{ main: summary }] = weather;

  return {
    measurements: {
      temp: temp - KELVIN_TO_CELSIUS,
      tempMax: tempMax - KELVIN_TO_CELSIUS,
      tempMin: tempMin - KELVIN_TO_CELSIUS,
    },
    summary,
    time: dt * 1000,
  };
}

function processForecastData(data) {
  if (!data) return [];

  return data?.list.map(buildSingleForecast);
}

const useStyles = createUseStyles({
  mainContainer: {
    fontSize: 20,
  },
  /* Based on https://uxdesign.cc/creating-horizontal-scrolling-containers-the-right-way-css-grid-c256f64fc585 */
  cardsContainer: {
    display: 'grid',
    overflowX: 'auto',
    gridGap: 24,
    gridAutoFlow: 'column',
    gridAutoColumns: 'calc(50% - 24px * 2)',
    padding: '0 24px',
  },
  '@media screen and (min-width: 576px)': {
    mainContainer: {
      fontSize: 24,
    },
    cardsContainer: {
      gridAutoColumns: 'calc(100% / 3 - 24px * 2)',
    },
  },
  '@media screen and (min-width: 768px)': {
    mainContainer: {
      fontSize: 28,
    },
    cardsContainer: {
      gridAutoColumns: 'calc(100% / 5)',
    },
  },
  '@media screen and (min-width: 992px)': {
    mainContainer: {
      fontSize: 32,
    },
    cardsContainer: {
      gridAutoColumns: 'calc(100% / 6)',
    },
  },
  '@media screen and (min-width: 1200px)': {
    mainContainer: {
      fontSize: 36,
    },
    cardsContainer: {
      gridAutoColumns: 'calc(100% / 8)',
    },
  },
  '@media screen and (min-width: 1400px)': {
    mainContainer: {
      fontSize: 42,
    },
    cardsContainer: {
      gridAutoColumns: 'calc(100% / 9)',
    },
  },
});

const Forecast = function Forecast() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selectedForecast = useSelector((state) => state.selection.forecast);
  const { city, country } = useSelector((state) => state.selection.location);
  const { data, isError, isLoading } = useGetForecastQuery(
    `${city},${country}`
  );
  const forecastList = useMemo(() => processForecastData(data), [data]);

  useEffect(() => {
    if (forecastList.length) {
      dispatch(updateForecastSelection(forecastList[0]));
    }
  }, [dispatch, forecastList]);

  if (isLoading) {
    return (
      <Fullscreen>
        <Loading size="4x" />
      </Fullscreen>
    );
  }

  if (isError) {
    return (
      <Fullscreen>
        <h1>Oops</h1>
        <p>Sorry, something went wrong when fetching weather data</p>
      </Fullscreen>
    );
  }

  return (
    <main className={classes.mainContainer}>
      {selectedForecast && <Selection forecast={selectedForecast} />}
      <section className={classes.cardsContainer}>
        {forecastList.map((forecast) => (
          <Card
            key={forecast.time}
            forecast={forecast}
            onClick={() => dispatch(updateForecastSelection(forecast))}
          />
        ))}
      </section>
    </main>
  );
};

export default Forecast;
