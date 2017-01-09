class Location {
  static box(value) {
    if (value instanceof this) {
      return value;
    } else {
      return new this(value);
    }
  }

  constructor(url = '') {
    const link = document.createElement('a');
    link.href = url.toString();
    this.absoluteURL =  link.href;
  }

  getOrigin() {
    return this.absoluteURL.split('/', 3).join('/');
  }

  isSameOrigin() {
    return this.getOrigin() === (new this.constructor()).getOrigin();
  }

  toCacheKey() {
    return this.absoluteURL;
  }
}

export default Location;
