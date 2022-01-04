import React from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import weatherCloudIcon from '../assets/weather-cloud.svg';
import weatherDefaultIcon from '../assets/weather-default.svg'; // Credits to https://fontawesome.com/v5.15/icons/cloud?style=solid
import weatherSunIcon from '../assets/weather-sun.svg';

const WEATHER_ICONS = {
  clear: weatherSunIcon,
  clouds: weatherCloudIcon,
  default: weatherDefaultIcon,
};

const useStyles = createUseStyles((theme) => ({
  icon: {
    filter: (props) =>
      props.icon.toLowerCase() === 'clear'
        ? theme.filters.alternative
        : theme.filters.primary,
  },
}));

const WeatherIcon = function WeatherIcon({ icon, className }) {
  const classes = useStyles({ icon });
  const iconSrc = WEATHER_ICONS[icon.toLowerCase()] || WEATHER_ICONS.default;
  const actualClassName = classNames({
    [classes.icon]: icon.toLowerCase() !== 'clouds',
    [className]: !!className,
  });

  return <img alt={`${icon} icon`} className={actualClassName} src={iconSrc} />;
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
