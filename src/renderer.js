import View from './view';
import request from 'superagent';
import Location from './location';

class Renderer {
  constructor(controller) {
    this.view = new View(this);
    this.controller= controller;
    this.cache = {};
  }

  render(location) {
    let snapshot;
    location = Location.box(location);
    if (snapshot = this.getCache(location.toCacheKey())) {
      this.view.restore(snapshot);
    } else {
      this.requestAndLoad(location.absoluteURL);
    }
  }

  getCache(key) {
    return this.cache[key];
  }

  setCache(location, snapshot) {
    location = Location.box(location);
    this.cache[location.absoluteURL] = snapshot;
  }

  onPageRendered(){
    this.controller.onPageRendered();
  }

  // private

  requestAndLoad(url) {
    request
      .get(url)
      .end((err, html) => {
        this.view.loadHtml(html.text);
      })
  }
}

export default Renderer;