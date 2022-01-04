import React from 'react';
import { createUseStyles } from 'react-jss';
import format from 'date-fns/format';
import { forecastPropType } from '../../lib/prop-types';
import Icon from '../Icon';

const LOCATION = 'Munich';

const useStyles = createUseStyles((theme) => ({
  selection: {
    padding: '96px 8.5%',
    display: 'flex',
  },
  iconContainer: {
    flex: 1,
  },
  icon: {
    width: '100%',
    height: 'auto',
  },
  summary: {
    flex: 1.5,
    display: 'flex',
    flexDirection: 'column',
    margin: '0 2em',
  },
  summaryPrimary: {
    fontSize: '5em',
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
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    '& h2': {
      fontSize: '2em',
      margin: '32px 0',
    },
    '& span': {
      order: -1,
      color: theme.colors.secondary,
    },
  },
}));

const ForecastSelection = function ForecastSelection({
  forecast: { measurements, summary, time },
}) {
  const classes = useStyles();

  return (
    <section className={classes.selection}>
      <div className={classes.iconContainer}>
        <Icon className={classes.icon} icon={summary} />
      </div>
      <div className={classes.summary}>
        <h1 className={classes.summaryPrimary}>{measurements.temp}°</h1>
        <div className={classes.summarySecondary}>
          <span>{summary}</span>
          <span>
            {measurements.tempMax}° / {measurements.tempMin}°
          </span>
        </div>
      </div>
      <div className={classes.timeLocation}>
        <h2>
          {format(time, 'EEEE')}
          <br />
          {format(time, 'dd')}. {format(time, 'MMMM')}
        </h2>
        <span>{LOCATION}</span>
      </div>
    </section>
  );
};

ForecastSelection.propTypes = {
  forecast: forecastPropType.isRequired,
};

export default ForecastSelection;
