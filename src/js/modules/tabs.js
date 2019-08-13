import dispatcher from './dispatcher';

class TabItem {
  constructor(header, content) {
    this.header = header;
    this.content = content;
    this.name = header.getAttribute('data-tab-name') || '';
  }

  onActivate(action) {
    this.header.addEventListener('click', () => action(this));
  }

  setActive(value) {
    this.header.classList.toggle('_active', value);

    if (Array.isArray(this.content)) {
      this.content.forEach(content => {
        content.classList.toggle('_active', value);
      })
    } else {
      this.content.classList.toggle('_active', value);
    }
  }
}

class TabsManager {
  constructor(navNode, {
    tabItemSelector,
    contentItemSelector,
    onChange,
    hashSync = false,
    filterByName = false
  }) {
    this.navNode = navNode;
    this.tabs = [];
    this.activeTab = null;
    this.tabItemSelector = tabItemSelector;
    this.contentItemSelector = contentItemSelector;
    this.onChange = onChange;
    this.hashSync = hashSync;
    this.filterByName = filterByName;

    this.init();
  }

  init() {
    this.initFromHtml(this.navNode);
    this.selectDefault();
    this.handleEvents();
  }

  initFromHtml(navNode) {
    const headers = [...navNode.querySelectorAll(this.tabItemSelector)];
    const contents = [...navNode.querySelectorAll(this.contentItemSelector)];

    if (this.filterByName) {
      headers.forEach((header) => {
        const tabName = header.getAttribute('data-tab-name');
        const tabContents = contents.filter(content => {
          return content.getAttribute('data-tab-name') === tabName;
        });
        this.registerTab(header, tabContents);
      });
    } else {
      headers.forEach((header, index) => {
        this.registerTab(header, contents[index]);
      });
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

    if (triggerChange) {
      this.handleTabChange();
    }
  }

  syncTabsByHash() {
    const hash = String(window.location.hash).trim();
    const activedTabByHash = this.tabs.filter(tab => tab.name === hash.slice(1))[0];
    if (activedTabByHash) this.activateTab(activedTabByHash);
  }

  handleEvents() {
    if (this.hashSync) {
      window.addEventListener('hashchange', this.handleHashChange.bind(this));

    }
  }

  handleHashChange() {
    this.syncTabsByHash();
  }

  handleTabChange() {
    if (this.hashSync) {
      window.location.hash = `#${this.activeTab.name}`;
    }

    if (typeof this.onChange === 'function') {
      this.onChange();
    }
  }

  selectDefault() {
    if (this.hashSync) {
      this.syncTabsByHash();
    }

    if (!this.activeTab) {
      this.activateTab(this.tabs[0], {
        triggerChange: false
      });
    }
  }
}


export default {
  init() {

  },

  simpleTabs() {
    // самые простые табы по индексу
    const tabContainerEl = document.querySelector('.js-container');
    if (!tabContainerEl) return;

    const tabsExample = new TabsManager(tabContainerEl, {
      tabItemSelector: '.js-tab',
      contentItemSelector: '.js-tab-content'
    });
  },

  hashTabs() {
    // табы с синхронизацией хэша, синхронизируют выбор под текущий хэш, реагируют на изменение хэша
    // изменяют хэш при смене выбора
    // наличие имени у каждого таба - обязательно (аттрибут data-tab-name)
    const tabContainerEl = document.querySelector('.js-container');
    if (!tabContainerEl) return;

    const tabsExample = new TabsManager(tabContainerEl, {
      tabItemSelector: '.js-tab',
      contentItemSelector: '.js-tab-content',
      hashSync: true
    });

    console.log(tabsExample);
  },

  tabsByName() {
    // табы, контент к которым прявязан не по индексу, а по имени
    // наличие имени у каждого таба - обязательно (аттрибут data-tab-name),
    // у контента - опционально (аттрибут data-tab-name)
    // можно использовать совместно с синхронизацией с хэшем
    const tabContainerEl = document.querySelector('.js-container');
    if (!tabContainerEl) return;

    const tabsExample = new TabsManager(tabContainerEl, {
      tabItemSelector: '.js-tab',
      contentItemSelector: '.js-tab-content',
      filterByName: true,
      hashSync: true
    });
  }
};
