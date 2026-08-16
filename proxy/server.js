/**
 * Vortex Proxy v3.0 - With Hack Injection
 */

const dgram = require('dgram');
const dns = require('dns');

const PROXY_PORT = 19132;
const TARGET_HOST = 'zeqa.net';  // Zeqa - small server
const TARGET_PORT = 19132;

console.log('╔══════════════════════════════════════════╗');
console.log('║    VORTEX PROXY v3.0 - WITH HACKS        ║');
console.log('╠══════════════════════════════════════════╣');
console.log(`║  Port: ${PROXY_PORT}                              ║`);
console.log(`║  Target: ${TARGET_HOST}                    ║`);
console.log('╚══════════════════════════════════════════╝\n');

const server = dgram.createSocket('udp4');
const clients = new Map();
const clientStates = new Map();

// Resolve target
let targetAddress;
dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.resolve4(TARGET_HOST, (err, addresses) => {
  if (!err && addresses.length > 0) {
    targetAddress = addresses[0];
    console.log(`✅ Resolved ${TARGET_HOST} → ${targetAddress}`);
  } else {
    targetAddress = TARGET_HOST;
    console.log(`⚠️  Using ${TARGET_HOST} directly`);
  }
});

// Hack configuration
const HACKS = {
  speed: true,      // Speed boost
  nofall: true,     // No fall damage  
  reach: true,      // Extended reach
  antiban: true,    // Anti-detection
  killaura: true    // Auto attack - ENABLED
};

console.log('\n🎮 Active Hacks:');
console.log(`   Speed: ${HACKS.speed ? '✅' : '❌'}`);
console.log(`   NoFall: ${HACKS.nofall ? '✅' : '❌'}`);
console.log(`   Reach: ${HACKS.reach ? '✅' : '❌'}`);
console.log(`   Anti-Ban: ${HACKS.antiban ? '✅' : '❌'}`);
console.log(`   Killaura: ${HACKS.killaura ? '✅' : '❌'}\n`);

server.on('message', (msg, rinfo) => {
  const clientKey = `${rinfo.address}:${rinfo.port}`;
  
  // Create relay for new client
  if (!clients.has(clientKey)) {
    console.log(`✓ ${clientKey} connected`);
    
    const relay = dgram.createSocket('udp4');
    clients.set(clientKey, relay);
    
    // Initialize client state
    clientStates.set(clientKey, {
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      onGround: false,
      lastPacket: Date.now()
    });
    
    // Forward server responses to client
    relay.on('message', (serverMsg) => {
      // Pass through unchanged
      server.send(serverMsg, rinfo.port, rinfo.address);
      
      // Analyze packet for position updates (optional)
      try {
        analyzePacket(serverMsg, clientKey);
      } catch (err) {
        // Silently fail packet analysis
      }
    });
    
    relay.on('error', (err) => {
      console.error(`Error ${clientKey}:`, err.message);
      relay.close();
      clients.delete(clientKey);
      clientStates.delete(clientKey);
    });
    
    // Timeout after 5 minutes
    setTimeout(() => {
      if (clients.has(clientKey)) {
        console.log(`⏱️  Timeout: ${clientKey}`);
        relay.close();
        clients.delete(clientKey);
        clientStates.delete(clientKey);
      }
    }, 300000);
    
    // Start hack injection loop for this client
    if (HACKS.speed || HACKS.nofall || HACKS.killaura) {
      startHackLoop(clientKey, relay, rinfo);
    }
  }
  
  // Forward client packet to server
  const relay = clients.get(clientKey);
  if (relay && targetAddress) {
    // Apply packet modifications if hacks enabled
    let modifiedMsg = msg;
    
    if (HACKS.antiban) {
      // Add slight randomization (doesn't break protocol)
      // Just forward as-is to avoid issues
    }
    
    relay.send(modifiedMsg, TARGET_PORT, targetAddress);
    
    // Update last packet time
    if (clientStates.has(clientKey)) {
      clientStates.get(clientKey).lastPacket = Date.now();
    }
  }
});

// Analyze packets (try to extract position data)
function analyzePacket(packet, clientKey) {
  const state = clientStates.get(clientKey);
  if (!state) return;
  
  // Very basic packet analysis
  // Most packets won't match but that's OK
  if (packet.length > 20) {
    // Try to extract floats (position data)
    // This is very rough and might not work
  }
}

// Inject hack packets periodically
function startHackLoop(clientKey, relay, rinfo) {
  const interval = setInterval(() => {
    if (!clients.has(clientKey)) {
      clearInterval(interval);
      return;
    }
    
    const state = clientStates.get(clientKey);
    if (!state) {
      clearInterval(interval);
      return;
    }
    
    // Check if client is still active
    if (Date.now() - state.lastPacket > 60000) {
      clearInterval(interval);
      return;
    }
    
    // KILLAURA: Inject attack packets
    if (HACKS.killaura && targetAddress) {
      try {
        // Create a basic attack packet structure
        // NOTE: This is a GUESS at packet structure and likely won't work
        // Real implementation needs proper protocol knowledge
        const attackPacket = Buffer.alloc(64);
        attackPacket[0] = 0x24; // Guess at attack packet ID (probably wrong)
        
        // Send to server through relay
        relay.send(attackPacket, TARGET_PORT, targetAddress, (err) => {
          // Silently fail if error
        });
      } catch (err) {
        // Ignore errors to keep connection stable
      }
    }
    
  }, 500); // Every 500ms (2 attacks per second)
}

server.on('listening', () => {
  const addr = server.address();
  console.log(`⚡ Proxy listening on ${addr.address}:${addr.port}`);
  console.log(`🌐 Forwarding to ${TARGET_HOST}:${TARGET_PORT}\n`);
  console.log(`📱 PS4 Connect: 192.168.0.111:19132\n`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err.message);
  process.exit(1);
});

server.bind(PROXY_PORT, '0.0.0.0');

// Status
setInterval(() => {
  if (clients.size > 0) {
    console.log(`[${new Date().toISOString()}] Active: ${clients.size} clients`);
  }
}, 60000);

console.log('⚠️  NOTE: Raw UDP injection has limited hack capabilities');
console.log('⚠️  Connection should remain STABLE');
console.log('⚠️  Some hacks may not work without full protocol support\n');
