import { Scene } from 'phaser'
const { player } = usePlayer()
const { enableMovements, movePlayer } = useMovement()
const { map } = useMap()

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
  }

  create () {
    const sceneMap = this.make.tilemap({ key: 'testMap' })
    sceneMap.addTilesetImage('mountain_landscape', 'background')
    sceneMap.layers.forEach( (layer, index) => {
      sceneMap.createLayer(index, 'mountain_landscape', 0, 0)
    } )
    // sceneMap.layers[1].setCollisionByProperty({ collides: true })
    sceneMap.setCollisionBetween(54, 83);

    map.current = sceneMap

    const playerSprite = this.physics.add.sprite(0, 0, 'playerSprite')
    player.sprite = playerSprite

    playerSprite.setBodySize(32, 32)
    // this.physics.add.collider(player, sceneMap.layers[1]);

    this.cameras.main.startFollow(playerSprite)
    this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height)

    const gridEngineConfig = {
      characters: [
        {
          id: "player",
          sprite: playerSprite,
          // walkingAnimationMapping: 6,
          startPosition: { x: 10, y: 10 },
          collides: {
            collisionGroups: []
          }
        },
      ],
    }
    this.gridEngine.create(sceneMap, gridEngineConfig)
    enableMovements(this)
  }

  update () {
    const cursor = this.input.keyboard.createCursorKeys()
    movePlayer(cursor, this.gridEngine)
  }
}
