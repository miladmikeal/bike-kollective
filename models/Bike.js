// class definition for Bike entity

export default class Bike {
  // We can adjust constructor values as needed
  constructor(id, checkedOut, frame, geoHash, latitude, longitude, keywords, name, picUrl, style, userId, distance) {
    this.id = id;
    this.checkedOut = checkedOut; // Boolean
    this.frame = frame; // String
    this.geoHash = geoHash; // Map
    this.latitude = latitude; // Map
    this.longitude = longitude; // Map
    this.keywords = keywords; // String array
    this.name = name; // String
    this.picUrl = picUrl; // Url
    this.style = style; // String
    this.userId = userId; // String
    this.distance = distance // Distance of the bike from the user (when queried!)
  }

  getBikeId = () => this.id;

  getLatitude = () => this.latitude;

  getLongitude = () => this.longitude;
}
