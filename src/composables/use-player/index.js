const player = ref({
  id: null,
  sprite: null,
  info: {
    name: 'wafffllesss',
    level: {
      current: 1,
      exp: 0,
    },
  },
  state: {
    facing: 'down',
    moving: false,
    turning: false,
  }
})

export default () => {
  return {
    player: player.value
  }
}