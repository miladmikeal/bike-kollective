// class definition for Bike entity
export default class Rating {
  constructor(id, bike_id, rating) {
    this.id = id; // ID of this document in firestore
    this.bike_id = bike_id; // ID of the bike this rating is for
    this.rating = rating;
  }

  getRating = () => this.rating;
}
