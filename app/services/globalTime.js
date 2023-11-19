function globalTime() {
  const nowDate = Date.now();
  const now = new Date(nowDate);

  console.log('Hora de apertura de mercados:')
  console.log('Tokio: 18:00pm');
  console.log('Hong Kong: 19:00pm');
  console.log('New York: 8:00am');
  console.log('Costa Rica: ' + now);
}

export { globalTime };
