import './global.css';
import { registerRootComponent } from 'expo';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import React from 'react';
import App from './App';

function Root() {
  return (
    <GluestackUIProvider config={config}>
      <App />
    </GluestackUIProvider>
  );
}

registerRootComponent(Root);
