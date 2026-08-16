/**
 * Vortex Hacks Module
 * Packet injection and modification for Bedrock Edition
 */

class VortexHacks {
  constructor(player, server) {
    this.player = player;
    this.server = server;
    this.enabled = {
      killaura: false,
      fly: false,
      speed: false,
      reach: false,
      nofall: false,
      antiban: true // Always on
    };
    
    this.playerPos = { x: 0, y: 0, z: 0 };
    this.nearbyEntities = [];
    
    console.log('🎮 Vortex Hacks initialized');
  }

  // Track player position
  updatePosition(packet) {
    if (packet.position) {
      this.playerPos = packet.position;
    }
  }

  // Track nearby entities for killaura
  updateEntities(packet) {
    if (packet.entities) {
      this.nearbyEntities = packet.entities;
    }
  }

  // Killaura - auto attack nearby players
  processKillaura() {
    if (!this.enabled.killaura) return;

    for (const entity of this.nearbyEntities) {
      const distance = this.getDistance(entity.position, this.playerPos);
      
      if (distance < 6 && entity.type === 'player') {
        // Send attack packet
        this.player.write('attack', {
          targetId: entity.id,
          position: entity.position
        });
        
        // Add delay for anti-ban
        if (this.enabled.antiban) {
          setTimeout(() => {}, 50 + Math.random() * 50);
        }
      }
    }
  }

  // Fly - creative flight
  processFly(packet) {
    if (!this.enabled.fly) return packet;

    if (packet.name === 'move_player') {
      packet.params.onGround = false;
      packet.params.mode = 2; // Flying mode
    }
    
    return packet;
  }

  // Speed - faster movement
  processSpeed(packet) {
    if (!this.enabled.speed) return packet;

    if (packet.name === 'move_player') {
      const speedMultiplier = 1.5;
      
      if (packet.params.velocity) {
        packet.params.velocity.x *= speedMultiplier;
        packet.params.velocity.z *= speedMultiplier;
      }
    }
    
    return packet;
  }

  // NoFall - prevent fall damage
  processNoFall(packet) {
    if (!this.enabled.nofall) return packet;

    if (packet.name === 'move_player') {
      packet.params.onGround = true;
    }
    
    return packet;
  }

  // Anti-ban - randomize movements
  processAntiBan(packet) {
    if (!this.enabled.antiban) return packet;

    if (packet.name === 'move_player') {
      // Add slight random variations
      if (packet.params.position) {
        packet.params.position.x += (Math.random() - 0.5) * 0.01;
        packet.params.position.z += (Math.random() - 0.5) * 0.01;
      }
      
      // Randomize rotation slightly
      if (packet.params.rotation) {
        packet.params.rotation.yaw += (Math.random() - 0.5) * 2;
      }
    }
    
    return packet;
  }

  // Process outgoing packets (client -> server)
  processOutgoing(packet) {
    this.updatePosition(packet.params);
    
    let modifiedPacket = packet;
    modifiedPacket = this.processFly(modifiedPacket);
    modifiedPacket = this.processSpeed(modifiedPacket);
    modifiedPacket = this.processNoFall(modifiedPacket);
    modifiedPacket = this.processAntiBan(modifiedPacket);
    
    return modifiedPacket;
  }

  // Process incoming packets (server -> client)
  processIncoming(packet) {
    this.updateEntities(packet.params);
    return packet;
  }

  // Enable/disable hacks
  toggle(hack) {
    if (this.enabled.hasOwnProperty(hack)) {
      this.enabled[hack] = !this.enabled[hack];
      console.log(`${hack}: ${this.enabled[hack] ? 'ON' : 'OFF'}`);
    }
  }

  // Helper: Calculate distance
  getDistance(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  }

  // Tick loop for continuous hacks
  tick() {
    this.processKillaura();
  }
}

module.exports = VortexHacks;
