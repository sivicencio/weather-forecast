import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import { forecastPropType } from '../../lib/prop-types';
import { formatTemperature } from '../../lib/utils';
import Icon from '../UI/Icon';

const CITY_TRANSLATOR = {
  München: 'Munich',
};

const useStyles = createUseStyles((theme) => ({
  selection: {
    padding: '48px 10% 24px 10%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  iconContainer: {
    width: '50%',
  },
  icon: {
    width: '70%',
    height: 'auto',
    '&.svg-inline--fa': {
      width: '70%',
    },
  },
  summary: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  summaryPrimary: {
    fontSize: '4em',
    lineHeight: 1,
    margin: '32px 0',
    textAlign: 'center',
  },
  summarySecondary: {
    order: -1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.colors.secondary,
  },
  timeLocation: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    '& h2': {
      fontSize: '2em',
      margin: '16px 0',
    },
    '& span': {
      order: -1,
      color: theme.colors.secondary,
    },
  },
  '@media screen and (min-width: 576px)': {
    selection: {
      padding: '48px 10%',
    },
    summary: {
      padding: '0 1em',
    },
    summaryPrimary: {
      fontSize: '5em',
    },
  },
  '@media screen and (min-width: 768px)': {
    selection: {
      padding: '64px 10%',
    },
  },
  '@media screen and (min-width: 992px)': {
    selection: {
      padding: '96px 10%',
    },
    iconContainer: {
      width: '20%',
    },
    summary: {
      width: '45%',
      padding: '0 2em',
    },
    timeLocation: {
      width: '35%',
      textAlign: 'left',
      '& h2': {
        margin: '32px 0',
      },
    },
    icon: {
      width: '100%',
      '&.svg-inline--fa': {
        width: '100%',
      },
    },
  },
}));

const ForecastSelection = function ForecastSelection({
  forecast: { measurements, summary, time },
}) {
  const classes = useStyles();
  const { city } = useSelector((state) => state.selection.location);

  return (
    <section className={classes.selection}>
      <div className={classes.iconContainer}>
        <Icon className={classes.icon} icon={summary} />
      </div>
      <div className={classes.summary}>
        <h1 className={classes.summaryPrimary}>
          {formatTemperature(measurements.temp)}
        </h1>
        <div className={classes.summarySecondary}>
          <span>{summary}</span>
          <span>
            {formatTemperature(measurements.tempMax)} /{' '}
            {formatTemperature(measurements.tempMin)}
          </span>
        </div>
      </div>
      <div className={classes.timeLocation}>
        <h2>
          {format(time, 'EEEE')}
          <br />
          {format(time, 'dd')}. {format(time, 'MMMM')}
        </h2>
        <span>{CITY_TRANSLATOR[city] || city}</span>
      </div>
    </section>
  );
};

ForecastSelection.propTypes = {
  forecast: forecastPropType.isRequired,
};

export default ForecastSelection;
