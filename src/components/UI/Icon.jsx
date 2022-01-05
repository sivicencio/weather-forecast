import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import weatherCloudIcon from '../../assets/weather-cloud.svg';
import weatherSunIcon from '../../assets/weather-sun.svg';

const WEATHER_ICONS = {
  clear: weatherSunIcon,
  clouds: weatherCloudIcon,
};

const useStyles = createUseStyles((theme) => ({
  icon: {
    filter: theme.filters.alternative,
  },
}));

const WeatherIcon = function WeatherIcon({ icon, className }) {
  const classes = useStyles({ icon });
  const iconSrc = WEATHER_ICONS[icon.toLowerCase()];
  const actualClassName = classNames({
    [classes.icon]: icon.toLowerCase() === 'clear',
    [className]: !!className,
  });

  return iconSrc ? (
    <img alt={`${icon} icon`} className={actualClassName} src={iconSrc} />
  ) : (
    <FontAwesomeIcon className={className} icon={faCloud} />
  );
};

WeatherIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
};

WeatherIcon.defaultProps = {
  className: '',
  icon: 'default',
};

export default WeatherIcon;
