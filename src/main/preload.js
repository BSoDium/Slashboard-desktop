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
    servers: {
      getAll() {
        return ipcRenderer.invoke('getServers');
      },
      add(ip, port, auth, type) {
        ipcRenderer.send('addServer', ip, port, auth, type);
      },
      del(id) {
        ipcRenderer.send('delServer', id);
      },
      edit(id, ip, port, auth, type) {
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
    getVersion() {
      return ipcRenderer.invoke('getAppVersion');
    },
  },
});
