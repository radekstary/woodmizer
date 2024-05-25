import {
  LocalStorageConfig,
  LocalStorageKey,
} from '../services/localStorageService/localStorage.interface';

export function LocalStorageInitialConfig(
  key: LocalStorageKey
): LocalStorageConfig | undefined {
  return INITIAL_CONFIG.find((cfg) => cfg.key === key)?.config;
}

const INITIAL_CONFIG: InitialConfig[] = [
  {
    key: 'UsersComponent',
    config: {
      viewModeValue: 'table',
    },
  },
];

interface InitialConfig {
  key: LocalStorageKey;
  config: LocalStorageConfig;
}
