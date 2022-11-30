const mapStore = ref({
  current: null
})

export default () => {
  return {
    map: mapStore.value,
    tileSize: 32
  }
}