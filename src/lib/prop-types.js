import PropTypes from 'prop-types';

export const forecastPropType = PropTypes.shape({
  measurements: PropTypes.shape({
    temp: PropTypes.number,
    tempMax: PropTypes.number,
    tempMin: PropTypes.number,
  }).isRequired,
  summary: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
});

export default {
  forecastPropType,
};
