export function closest(element, selector) {
  let node = element;
  while(node) {
    if(node.nodeType === node.ELEMENT_NODE && match(node, selector)) {
      return node
    } else {
      node = node.parentNode;
    }
  }
  return null;
}

function match(node, selector) {
  const html = document.documentElement;
  const matchesSElector = (html.matchesSelector
    || html.webkitMatchesSelector
    || html.msMatchesSelector
    || html.mozMatchesSelector);
  return matchesSElector.call(node, selector);
}

export function isSameOrigin(a, b) {
  return getOrigin(a) === getOrigin(b);
}

function getOrigin(location) {
  return absoluteURL(location).split('/', 3).join('/');
}

function absoluteURL(location) {
  const link = document.createElement('a');
  link.href = location.toString();
  return link.href;
}
