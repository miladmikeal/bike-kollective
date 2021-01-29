// class definition for Bike entity
export default class Rating {
  constructor(id, rating) {
    this.id = id;
    this.rating = rating;
  }

  getRating() {
    return this.rating;
  }
}
