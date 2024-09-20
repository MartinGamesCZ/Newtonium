export function getPort() {
  // Get random port between 1024 and 65535
  return Math.floor(Math.random() * (65535 - 1024)) + 1024
}
