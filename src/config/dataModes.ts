export type DataMode = 'localStorage' | 'mock' | 'aws';

export interface DataModeConfig {
  mode: DataMode;
  label: string;
  description: string;
  available: boolean;
  requiresSetup?: string;
}

export const DATA_MODES: Record<DataMode, DataModeConfig> = {
  localStorage: {
    mode: 'localStorage',
    label: '💾 Local Storage',
    description: 'Persists data in browser storage',
    available: true,
  },
  mock: {
    mode: 'mock',
    label: '🎭 Mock Data',
    description: 'Uses simulated data with realistic delays',
    available: true,
  },
  aws: {
    mode: 'aws',
    label: '☁️ AWS Amplify',
    description: 'Connects to AWS DynamoDB via GraphQL',
    available: false,
    requiresSetup: 'AWS credentials required',
  },
};

// Default mode
export const DEFAULT_MODE: DataMode = 'localStorage';

// Storage key for persisting selected mode
export const MODE_STORAGE_KEY = 'todoApp_dataMode';
