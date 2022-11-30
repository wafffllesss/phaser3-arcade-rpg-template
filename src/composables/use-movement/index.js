const { player } = usePlayer()
const { delay } = useUtils()
const { map } = useMap()
let phaser = null

const idleFrames = {
  down: 0,
  left: 1,
  up: 2,
  right: 3
}

const createPlayerAnimation = (name, startFrame, endFrame) => {
  console.log('stix', phaser)
  phaser.anims.create({
    key: name,
    frames: phaser.anims.generateFrameNames('playerSprite', {
      prefix: 'default-',
      suffix: '.png',
      start: startFrame,
      end: endFrame,
    }),
    frameRate: 10,
    repeat: -1,
    yoyo: true,
  })
}

const movePlayer = (cursor, grid) => {
  let direction = null

  if(player.state.turning) {
    player.state.moving = false
    player.sprite.setFrame(`default-${idleFrames[player.state.facing]}.png`)
    return
  }

  if(cursor.down.isDown){
    direction = 'down'
  }
  else if(cursor.left.isDown){
    direction = 'left'
  }
  else if(cursor.up.isDown){
    direction = 'up'
  }
  else if(cursor.right.isDown){
    direction = 'right'
  }
  if(direction) {
    // Check if is facing
    if(player.state.facing === direction) {
      player.state.moving = true
      grid.move('player', direction)
    }
    // Stop and turn
    else {
      // player.sprite.anims.stop()
      player.sprite.setFrame(`default-${idleFrames[direction]}.png`)
      player.state.facing = direction
      player.state.turning = true
      delay('turning', 200, () => {
        player.state.turning = false
      })
    }
  }
}

const enableMovements = (that) => {
  phaser = that

  // Animations
  createPlayerAnimation('walk-down', 6, 9)
  createPlayerAnimation('walk-left', 15, 18)
  createPlayerAnimation('walk-up', 24, 27)
  createPlayerAnimation('walk-right', 33, 36)

  // Events
  that.gridEngine.movementStarted().subscribe(({ direction }) => {
    player.sprite.anims.play(`walk-${direction}`);
  })
  that.gridEngine.movementStopped().subscribe(({ direction }) => {
    player.sprite.anims.stop()
    if(idleFrames[direction]) player.sprite.setFrame(`default-${idleFrames[direction]}.png`)
    player.state.moving = false
  })
}

export default () => {
  return {
    enableMovements,
    createPlayerAnimation,
    movePlayer
  }
}