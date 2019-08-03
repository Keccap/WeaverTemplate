class TabItem {
  constructor(header, content) {
    this.header = header;
    this.content = content;
    this.name = content.getAttribute('data-tab-name') || ''; // если есть атрибут - присвоить имя для таба
  }

  onActivate(action) {
    this.header.addEventListener('click', () => action(this));
  }

  setActive(value) {
    this.header.classList.toggle('_active', value);
    this.content.classList.toggle('_active', value);
  }
}

class TabsManager {
  constructor(navNode, { tabItemSelector, contentItemSelector, onChange }) {
    this.tabs = [];
    this.activeTab = null;
    this.tabItemSelector = tabItemSelector;
    this.contentItemSelector = contentItemSelector;
    this.onChange = onChange;

    this.initFromHtml(navNode);
    this.activateTab(this.tabs[0], {
      triggerChange: false
    });
  }

  initFromHtml(navNode) {
    const headers = navNode.querySelectorAll(this.tabItemSelector);
    const contents = navNode.querySelectorAll(this.contentItemSelector);

    for (let i = 0; i < headers.length; i++) {
      this.registerTab(headers[i], contents[i]);
    }
  }

  registerTab(header, content) {
    const tab = new TabItem(header, content);
    tab.onActivate(() => this.activateTab(tab));
    this.tabs.push(tab);
  }

  activateTab(tabItem, { triggerChange = true } = {}) {
    if (this.activeTab) {
      this.activeTab.setActive(false);
    }

    this.activeTab = tabItem;
    this.activeTab.setActive(true);

    if (triggerChange && typeof this.onChange === 'function') {
      this.onChange();
    }
  }
}


export default {
  init() {
    const tabContainerEl = document.querySelector('.js-tab-container');
    if (tabContainerEl) {
      const exampleTabs = new TabsManager(tabContainerEl, {
        tabItemSelector: '.js-tab',
        contentItemSelector: '.js-tab-content',
        onChange() {
          location.hash = `#${exampleTabs.activeTab.name}`;
        }
      });

      const activedTabByHash = exampleTabs.tabs.find(tab => tab.name === hash.slice(1));
      if (activedTabByHash) exampleTabs.activateTab(activedTabByHash);
    }
  }
};
