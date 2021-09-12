const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    currentWindow: {
      minimize() {
        ipcRenderer.send('minimize');
      },
      maximize() {
        ipcRenderer.send('maximize');
      },
      close() {
        ipcRenderer.send('close');
      },
    },
    storage: {
      getServers() {
        return ipcRenderer.invoke('getServers');
      },
      addServer(ip, port, auth, type) {
        ipcRenderer.send('addServer', ip, port, auth, type);
      },
      delServer(id) {
        ipcRenderer.send('delServer', id);
      },
      editServer(id, ip, port, auth, type) {
        ipcRenderer.send('editServer', id, ip, port, auth, type);
      },
    },
    settings: {
      getAll() {
        return ipcRenderer.invoke('getAllSettings');
      },
      get(key) {
        return ipcRenderer.invoke('getSetting', key);
      },
      setAll(settings) {
        ipcRenderer.send('setAllSettings', settings);
      },
      set(key, value) {
        ipcRenderer.send('setSetting', key, value);
      },
    },
    preferences: {
      getAll() {
        return ipcRenderer.invoke('getAllPreferences');
      },
      get(key) {
        return ipcRenderer.invoke('getPreference', key);
      },
      setAll(preferences) {
        ipcRenderer.send('setAllPreferences', preferences);
      },
      set(key, value) {
        ipcRenderer.send('setPreference', key, value);
      },
    },
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
    getVersion() {
      return ipcRenderer.invoke('getAppVersion');
    },
  },
});
