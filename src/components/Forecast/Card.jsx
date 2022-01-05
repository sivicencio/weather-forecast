import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import format from 'date-fns/format';
import { forecastPropType } from '../../lib/prop-types';
import { formatTemperature } from '../../lib/utils';
import Icon from '../Icon';

const useStyles = createUseStyles((theme) => ({
  active: {
    backgroundColor: theme.colors.active,
  },
  card: {
    marginLeft: 24,
    padding: '0.75em 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 6,
    '&:last-child': {
      marginRight: 24,
    },
    '&:hover': {
      backgroundColor: theme.colors.hover,
      cursor: 'pointer',
    },
    '& h3': {
      fontSize: '2em',
      margin: {
        top: 32,
      },
    },
    '& span:last-child': {
      order: -1,
      color: theme.colors.secondary,
    },
  },
  icon: {
    width: '100%',
    height: 'auto',
    margin: {
      top: 32,
    },
  },
}));

const ForecastCard = function ForecastCard({
  forecast: { measurements, summary, time },
}) {
  const classes = useStyles();
  const jointClassNames = classNames({
    [classes.card]: true,
    [classes.active]: Math.random() > 0.9,
  });

  return (
    <div className={jointClassNames}>
      <Icon className={classes.icon} icon={summary} />
      <h3>{formatTemperature(measurements.temp)}</h3>
      <span>{format(time, 'HH:mm')}</span>
    </div>
  );
};

ForecastCard.propTypes = {
  forecast: forecastPropType.isRequired,
};

export default ForecastCard;
