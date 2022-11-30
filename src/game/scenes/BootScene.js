import { Scene } from 'phaser'
import background from '@/game/assets/world/test-map.png'
import testMap from '@/game/assets/world/tilemaps/test-map.json'

export default class BootScene extends Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.load.image('background', 'assets/world/mountain_landscape.png')
    this.load.tilemapTiledJSON('testMap', testMap)
    this.load.atlas('playerSprite', 'assets/characters/default.png', 'assets/characters/default.json');
    // this.load.spritesheet('playerSprite', playerSprite, { frameWidth: 48, frameHeight: 72 })
  }

  create () {
    this.scene.start('PlayScene')
  }
}
