// class definition for Bike entity

export default class Bike {
  // We can adjust constructor values as needed
  constructor(id, checkedOut, frame, geoHash, keywords, name, picUrl, style, userId) {
    this.id = id;
    this.checkedOut = checkedOut; // Boolean
    this.frame = frame; // String
    this.geoHash = geoHash; // Map
    this.keywords = keywords; // String array
    this.name = name; // String
    this.picUrl = picUrl; // Url
    this.style = style; // String
    this.userId = userId; // String
  }

  getBikeId() {
    return this.id;
  }
}
