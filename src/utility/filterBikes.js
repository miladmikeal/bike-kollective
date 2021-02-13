import PropTypes from 'prop-types';
import Bike from '../models/Bike';

/*
  filterBikes will take an array of bikes and an object of filter
  criteria. It will then filter the array and return an arrar of
  only those objects that match the filter criteria.
*/
function filterBikes(bikes, filterValues) {
  const filteredBikes = [];
  let filterKeywords = [];
  if (filterValues.keywords) {
    filterKeywords = filterValues.keywords.split(',');
  }

  bikes.forEach((bike) => {
    if (filterValues.name && !bike.name.includes(filterValues.name)) {
      return;
    }
    if (filterValues.style && !bike.style.includes(filterValues.style)) {
      return;
    }
    if (filterValues.frame && !bike.frame.includes(filterValues.frame)) {
      return;
    }
    let bikeKeywords = [];
    if (bike.keywords) {
      bikeKeywords = bike.keywords.split(',');
    }

    for (let i = 0; i < filterKeywords.length; i += 1) {
      if (!bikeKeywords.includes(filterKeywords[i])) {
        return;
      }
    }
    filteredBikes.push(bike);
  });

  return filteredBikes;
}

filterBikes.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.instanceOf(Bike)).isRequired,
  filterValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    frame: PropTypes.string.isRequired,
    keywords: PropTypes.string.isRequired
  }).isRequired
};

export default filterBikes;
