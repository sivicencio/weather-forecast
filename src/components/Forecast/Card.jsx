import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
    '&:hover,&:focus-visible': {
      backgroundColor: theme.colors.hover,
      cursor: 'pointer',
      outline: 'none',
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
      <Icon className={classes.icon} icon={summary} />
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
