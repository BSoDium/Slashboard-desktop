import { ValueOf } from '@visx/scale';

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
        servers: {
          getAll: () => Promise<StorageFormat['servers']>;
          add: (ip: string, port: string, auth: string, type: string) => void;
          del: (id: string) => void;
          edit: (
            id: string,
            ip: string,
            port: string,
            auth: string,
            type: string
          ) => void;
        };
        settings: {
          getAll: () => Promise<StorageFormat['internals']['settings']>;
          get: (
            key: string
          ) => Promise<ValueOf<StorageFormat['internals']['settings']>>;
          setAll: (settings: StorageFormat['internals']['settings']) => void;
          set: (
            key: string,
            value: ValueOf<StorageFormat['internals']['settings']>
          ) => void;
        };
        preferences: {
          getAll: () => Promise<StorageFormat['internals']['preferences']>;
          get: (
            key: string
          ) => Promise<ValueOf<StorageFormat['internals']['preferences']>>;
          setAll: (
            preferences: StorageFormat['internals']['preferences']
          ) => void;
          set: (
            key: string,
            value: ValueOf<StorageFormat['internals']['preferences']>
          ) => void;
        };
        getVersion: () => Promise<string>;
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

  interface StorageFormat {
    servers: Record<
      string,
      { ip: string; port: string; auth: string; type: string }
    >;
    internals: {
      settings: {
        dynamicCPUScale: boolean;
        dynamicRAMScale: boolean;
      };
      preferences: Record<string, number | boolean | string>;
    };
  }
}
export {};
