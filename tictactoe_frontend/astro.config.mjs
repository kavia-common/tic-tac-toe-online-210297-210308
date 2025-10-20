/* @ts-check */
// IMPORTS AND DEPENDENCIES
// Astro v5 configuration with React integration for interactive islands.
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// FEATURE CONFIGURATION
// - Server bound to 0.0.0.0 on port 3000 as required.
export default defineConfig({
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
});
