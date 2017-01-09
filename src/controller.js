import History from './history';
import Renderer from './renderer';
import Location from './location';
import { closest, isSameOrigin } from './helpers';

class Controller {
  constructor() {
    this.location = new Location(location.pathname);
    this.renderer = new Renderer(this);
    this.history = new History(this);
    this.clickBubbled = this.clickBubbled.bind(this);
  }

  start() {
    this.clickCaptured();
  }

  visit(location) {
    this.history.visitLocation(location.absoluteURL);
  }

  // call back from History
  onLocationChanged(location) {
    location = Location.box(location);
    this.renderer.render(location);
  }

  // call back from Renderer
  onPageRendered() {
    this.triggerEvent('page:load');
  }

  // private

  clickBubbled(event) {
    let location;
    if(!event.defaultPrevented && (location = this.getVisitableLocationForEvent(event))){
      event.preventDefault();
      this.visit(location);
    }
  }

  clickCaptured() {
    removeEventListener('click', this.clickBubbled, false);
    addEventListener('click', this.clickBubbled, false);
  }

  getVisitableLocationForEvent(event) {
    let link;
    if(!(link = closest(event.target, 'a'))){
      return null;
    }
    const location = new Location(link.href);
    return location.isSameOrigin() ? location : null;
  }

  triggerEvent(eventName) {
    const event = document.createEvent("Events");
    event.initEvent(eventName, true, true);
    document.dispatchEvent(event);
    return !event.defaultPrevented;
  }
}

export default Controller;
