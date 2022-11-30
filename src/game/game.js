import Phaser from 'phaser'
import gridEngine from 'grid-engine'

import BootScene from '@/game/scenes/BootScene'
import PlayScene from '@/game/scenes/PlayScene'

function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [BootScene, PlayScene],
    plugins: {
      scene: [
        {
          key: 'gridEngine',
          plugin: gridEngine,
          mapping: 'gridEngine'
        }
      ]
    }
  })
}

export default launch
export { launch }
