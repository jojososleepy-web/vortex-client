/**
 * Vortex Proxy Server
 * Routes Minecraft Bedrock connections through to target servers
 */

const bedrock = require('bedrock-protocol');

const PROXY_PORT = process.env.PORT || 19132;
const DEFAULT_TARGET = 'mcgateway.mcbr.cubed.host';
const TARGET_PORT = 19132;

console.log('╔══════════════════════════════════════════╗');
console.log('║       VORTEX PROXY SERVER v2.0           ║');
console.log('╠══════════════════════════════════════════╣');
console.log(`║  Port: ${PROXY_PORT}                              ║`);
console.log(`║  Target: ${DEFAULT_TARGET}       ║`);
console.log('╚══════════════════════════════════════════╝');

try {
  const relay = bedrock.createRelay({
    host: '0.0.0.0',
    port: PROXY_PORT,
    destination: {
      host: DEFAULT_TARGET,
      port: TARGET_PORT
    }
  });

  relay.on('connect', (client) => {
    const username = client.username || 'Unknown';
    const address = client.connection?.address || 'Unknown IP';
    console.log(`✓ Player connected: ${username} from ${address}`);
  });

  relay.on('disconnect', (client) => {
    const username = client.username || 'Unknown';
    console.log(`✗ Player disconnected: ${username}`);
  });

  console.log(`\n⚡ Vortex Proxy listening on port ${PROXY_PORT}`);
  console.log(`🌐 Forwarding to ${DEFAULT_TARGET}:${TARGET_PORT}\n`);
  
} catch (err) {
  console.error('❌ Proxy error:', err);
  process.exit(1);
}

// Keep alive
setInterval(() => {
  console.log(`[${new Date().toISOString()}] Proxy alive`);
}, 300000); // Every 5 minutes
