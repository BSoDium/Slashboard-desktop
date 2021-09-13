class Storage {
  static internals: StorageFormat['internals'];

  static servers: StorageFormat['servers'];

  static updateInternals(callback?: () => void) {
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
    const fetch = async () => {
      Storage.servers = await window.electron.ipcRenderer.servers.getAll();
      callback?.();
    };

    fetch();
  }
}

export default Storage;
