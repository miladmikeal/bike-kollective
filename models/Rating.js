// class definition for Bike entity
export default class Rating {
  constructor(id, bikeId, rating) {
    this.id = id; // ID of this document in firestore
    this.bikeId = bikeId; // ID of the bike this rating is for
    this.rating = rating;
  }

  getRating = () => this.rating;
}
