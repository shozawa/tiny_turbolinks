import Location from './location';

class History {
  constructor(controller) {
    this.controller = controller;
    this.state = {tinyTurbolinks: true};
    this.onPopState = this.onPopState.bind(this);
  }

  start() {
    removeEventListener('popstate', this.onPopState, false);
    addEventListener('popstate', this.onPopState, false);
  }

  visitLocation(location) {
    location = Location.box(location);
    this.push(location);
    this.controller.onLocationChanged(location);
  }

  // private

  push (location) {
    location = Location.box(location);
    this.update('push', location);
  }

  onPopState(e) {
    if(e.state.tinyTurbolinks) {
      e.preventDefault();
      this.onLocationChanged(location);
    }
  }

  update (method, location) {
    history[method + 'State'](this.state, null, location.absoluteURL);
  }
}

export default History;
