class Storage {
  static internals: StorageFormat['internals'];

  static servers: StorageFormat['servers'];

  static updateInternals(callback?: () => void) {
    console.debug('Updating internals');
    const fetch = async () => {
      Storage.internals = await Promise.all([
        window.electron.ipcRenderer.settings.getAll(),
        window.electron.ipcRenderer.preferences.getAll(),
      ]).then(([settings, preferences]) => {
        return {
          settings,
          preferences,
        };
      });
      callback?.();
    };

    fetch();
  }

  static updateServers(callback?: () => void) {
    console.debug('Updating server list');
    const fetch = async () => {
      Storage.servers = await window.electron.ipcRenderer.servers.getAll();
      callback?.();
    };

    fetch();
  }
}

export default Storage;
