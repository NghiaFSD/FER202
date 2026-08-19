import React from 'react';
import PropTypes from 'prop-types';

export default function AnimalCard({ name, scientificName, size, diet, additional, showAdditional }) {
  return (
    <article className="card">
      <h2>{name}</h2>
      <p><em>{scientificName}</em></p>
      <p>Size: {size} kg</p>
      <p>Diet: {diet.join(', ')}</p>
      <button onClick={() => showAdditional(additional)}>More Info</button>
    </article>
  );
}

AnimalCard.propTypes = {
  additional: PropTypes.shape({
    link: PropTypes.string,
    notes: PropTypes.string
  }),
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  showAdditional: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired
};

AnimalCard.defaultProps = {
  additional: {
    notes: 'No Additional Information'
  }
};
