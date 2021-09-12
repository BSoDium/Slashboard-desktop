declare global {
  interface CompactState {
    value: any;
    setter: (value: boolean) => void;
  }

  interface Window {
    electron: {
      ipcRenderer: {
        currentWindow: {
          minimize: () => void;
          maximize: () => void;
          close: () => void;
        };
        storage: {
          getServers: () => Promise<any>;
          addServer: (
            ip: string,
            port: string,
            auth: string,
            type: string
          ) => void;
          delServer: (id: string) => void;
          editServer: (
            id: string,
            ip: string,
            port: string,
            auth: string,
            type: string
          ) => void;
        };
        settings: {
          getAll: () => Promise<any>;
          get: (key: string) => Promise<any>;
          setAll: (settings: any) => void;
          set: (key: string, value: any) => void;
        };
        preferences: {
          getAll: () => Promise<any>;
          get: (key: string) => Promise<any>;
          setAll: (settings: any) => void;
          set: (key: string, value: any) => void;
        };
        getVersion: () => Promise<any>;
      };
    };
  }

  interface NetworkInterface {
    address: string;
    netmask: string;
    family: string;
    mac: string;
    internal: boolean;
    cidr: string;
    scopeid: string;
  }

  interface PulsarResponse {
    data: {
      status: string;
      name: string;
      os: {
        type: string;
        platform: string;
        architecture: string;
        release: string;
        uptime: number;
      };
      hardware: {
        cpu: {
          cores: {
            model: string;
            speed: number;
            load: number;
          }[];
          global: {
            model: string;
            speed: number;
            load: number;
          };
        };
        memory: {
          total: number;
          free: number;
        };
        network: {
          interfaces: {
            [key: string]: NetworkInterface[];
          };
        };
        disks: {
          _filesystem: string;
          _blocks: number;
          _used: number;
          _available: number;
          _capacity: string;
          _mounted: string;
        }[];
      };
    };
  }

  interface CompactPulsarResponse {
    data: {
      status: string;
      name: string;
      os: {
        type: string;
        platform: string;
        architechture: string;
        release: string;
      };
    };
  }
}
export {};
