import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = function Loading({ size }) {
  return <FontAwesomeIcon icon={faSpinner} size={size} spin />;
};

Loading.propTypes = {
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: '2x',
};

export default Loading;
