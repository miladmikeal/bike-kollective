// class definition for Bike entity

export default class Bike {
  constructor(id, name, frame, style, rating, location, keywords) {
    this.id = id;
    this.name = name;
    this.style = style;
    this.rating = rating;
    this.location = location;
    this.keywords = keywords;
  }

  getBikeId() {
    return this.id;
  }
}
