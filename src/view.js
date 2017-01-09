class View {
  constructor(renderer) {
    this.renderer = renderer;
  }

  loadHtml(html) {
    const snapshot = this.parseHtml(html);
    this.restore(snapshot);
    this.renderer.setCache(location.href, this.saveSnapshot());
  }

  restore(snapshot) {
    document.title = snapshot.title;
    document.body = snapshot.body;
    this.renderer.onPageRendered();
  }

  saveSnapshot() {
    return({
      title: document.querySelector('title').textContent,
      body: document.querySelector('body')
    });
  }

  parseHtml(html) {
    const element = document.createElement('html');
    const snapshot = {};
    element.innerHTML = html;
    snapshot.title = element.querySelector('title').textContent;
    snapshot.body = element.querySelector('body');
    return snapshot;
  }
}

export default View;