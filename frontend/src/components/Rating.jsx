import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
  return (
    <div className="rating" style={{ display: 'flex', alignItems: 'center', fontSize: '1.25rem' }}>
      <span style={{ color: '#FFBB64' }}>
        {value >= 1 ? (
          <FaStar style={{ color: '#FFBB64' }} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt style={{ color: '#FFBB64' }} />
        ) : (
          <FaRegStar style={{ color: '#FFBB64' }} />
        )}
      </span>
      <span style={{ color: '#FFBB64' }}>
        {value >= 2 ? (
          <FaStar style={{ color: '#FFBB64' }} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{ color: '#FFBB64' }} />
        ) : (
          <FaRegStar style={{ color: '#FFBB64' }} />
        )}
      </span>
      <span style={{ color: '#FFBB64' }}>
        {value >= 3 ? (
          <FaStar style={{ color: '#FFBB64' }} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{ color: '#FFBB64' }} />
        ) : (
          <FaRegStar style={{ color: '#FFBB64' }} />
        )}
      </span>
      <span style={{ color: '#FFBB64' }}>
        {value >= 4 ? (
          <FaStar style={{ color: '#FFBB64' }} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{ color: '#FFBB64' }} />
        ) : (
          <FaRegStar style={{ color: '#FFBB64' }} />
        )}
      </span>
      <span style={{ color: '#FFBB64' }}>
        {value >= 5 ? (
          <FaStar style={{ color: '#FFBB64' }} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{ color: '#FFBB64' }} />
        ) : (
          <FaRegStar style={{ color: '#FFBB64' }} />
        )}
      </span>
      <span
        className="rating-text"
        style={{
          marginLeft: '10px',
          fontSize: '1rem',
          color: '#333',
          fontWeight: 'bold',
        }}
      >
        {text || 0}
      </span>
    </div>
  );
};

export default Rating;
