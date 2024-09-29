import React from 'react';

interface Config {
  ipSSH: string;
  senha: string;
  whoami: string;
  theme: 'light' | 'dark';
}

let config: Config = {
  ipSSH: '127.0.0.1',
  senha: '12345',
  whoami: '',
  theme: 'dark',
};

export const setConfig = (newConfig: Partial<Config>) => {
  Object.assign(config, newConfig);
};

export const getConfig = () => {
  return config;
};

export default config;