function damagedOrSunk (board, attacks){

  let ships = {}
  board.map((x, i) => x.map((y, j) => {
    let cell = board[i][j]
    if (cell) {
      ships[cell] = ++ships[cell] || 1
    }
  }))
  
  let state = Object.assign({}, ships)
  for (let [x, y] of attacks) {
    let cell = board[board.length-y][x-1]
    if (cell && state[cell]) {
      state[cell] -= 1
    }
  }
  
  let sunk = Object.keys(state).filter(x => state[x] == 0).length;
  let damaged = Object.keys(state).filter(x => state[x] != ships[x]).length - sunk
  let notTouched = Object.keys(ships).length-sunk-damaged
  
  return {sunk,damaged,notTouched,points: sunk-notTouched+damaged*0.5}
}
