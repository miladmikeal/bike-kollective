import Bike from '../src/models/Bike';
import filterBikes from '../src/utility/filterBikes';

const testBikes = [
  new Bike('1', false, 'Small', 'xyz', 1, 1, '1x,hardtail', 'test bike 1', 'pic', 'mtn', '', 100, 1234),
  new Bike('1', false, 'Medium', 'xyz', 1, 1, '1x,full-sus', 'test bike 2', 'pic', 'mtn', '', 100, 1234),
  new Bike('1', false, 'Large', 'xyz', 1, 1, '1x,rigid', 'test bike 3', 'pic', 'road', '', 100, 1234),
]

test('Filter bikes returns all bikes on when filter values empty', () => {
  let filterValues = {
    name: '',
    style: '',
    frame: '',
    keywords: ''
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(3);
});

test('Filter bikes returns 1 bike when frame filtered to Medium', () => {
  let filterValues = {
    name: 'test bike',
    style: '',
    frame: 'Medium',
    keywords: ''
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(1);
});

test('Filter values that match all bikes returns 3 bikes', () => {
  let filterValues = {
    name: 'test bike',
    style: '',
    frame: '',
    keywords: '1x'
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(3);
});

test('Keyword search does not use includes', () => {
  let filterValues = {
    name: '',
    style: '',
    frame: '',
    keywords: '1'
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(0);
});

test('Keyword search tokenizes correctly', () => {
  let filterValues = {
    name: '',
    style: '',
    frame: '',
    keywords: 'full-sus'
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(1);
})

test('style filter', () => {
  let filterValues = {
    name: '',
    style: 'mtn',
    frame: '',
    keywords: ''
  }
  const filteredBikes = filterBikes(testBikes, filterValues);
  expect(filteredBikes.length).toBe(2);
})