import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import format from 'date-fns/format';
import { forecastPropType } from '../../lib/prop-types';
import { formatTemperature } from '../../lib/utils';
import Icon from '../UI/Icon';

const useStyles = createUseStyles((theme) => ({
  active: {
    backgroundColor: theme.colors.active,
  },
  card: {
    padding: '1.25em 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 6,
    '&:hover,&:focus-visible': {
      backgroundColor: theme.colors.hover,
      cursor: 'pointer',
      outline: 'none',
    },
    '& h3': {
      fontSize: '2.5em',
      margin: {
        top: 32,
      },
    },
    '& span:last-child': {
      order: -1,
      color: theme.colors.secondary,
      fontSize: '1.5em',
    },
  },
  iconContainer: {
    width: '100%',
    height: 125,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '70%',
    height: 'auto',
    margin: {
      top: 32,
    },
    '&.svg-inline--fa': {
      width: '70%',
    },
  },
  '@media screen and (min-width: 576px)': {
    card: {
      padding: '1em',
    },
    icon: {
      width: '80%',
      '&.svg-inline--fa': {
        width: '80%',
      },
    },
  },
  '@media screen and (min-width: 768px)': {
    card: {
      '& h3': {
        fontSize: '2em',
      },
      '& span:last-child': {
        fontSize: '1em',
      },
    },
    icon: {
      width: '100%',
      '&.svg-inline--fa': {
        width: '100%',
      },
    },
  },
  '@media screen and (min-width: 992px)': {
    card: {
      padding: '1em',
      '& h3': {
        fontSize: '1.6em',
      },
    },
  },
  '@media screen and (min-width: 1400px)': {
    card: {
      padding: '0.75em 1em',
    },
  },
}));

const ForecastCard = function ForecastCard({
  forecast: { measurements, summary, time },
  onClick,
}) {
  const selectedForecast = useSelector((state) => state.selection.forecast);
  const classes = useStyles();
  const jointClassNames = classNames({
    [classes.card]: true,
    [classes.active]: selectedForecast?.time === time,
  });

  const handleKeyPress = useCallback(
    (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        onClick();
      }
    },
    [onClick]
  );

  return (
    <div
      className={jointClassNames}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
    >
      <div className={classes.iconContainer}>
        <Icon className={classes.icon} icon={summary} />
      </div>
      <h3>{formatTemperature(measurements.temp)}</h3>
      <span>{format(time, 'HH:mm')}</span>
    </div>
  );
};

ForecastCard.propTypes = {
  forecast: forecastPropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ForecastCard;
