const delays = {}
const delay = (delay_id, time, action) => {
  if(delays[delay_id]) {
    clearTimeout(delays[delay_id])
  }
  delays[delay_id] = setTimeout(action, time)
}
const clearDelay = (delay_id) => {
  clearTimeout(delays[delay_id])
}

export default () => {
  return {
    delay,
    clearDelay
  }
}