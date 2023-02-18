window.onload = function() {
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  let lastHole = null; // Initialize lastHole to null
  let timeUp = false;
  let score = 0;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
      console.log('Ah nah thats the same one bud');
      return randomHole(holes);
    }
    lastHole = hole;
    return hole;
  }

  function peep(level) {
    const time = randomTime(200, 1000);
    const numberOfMoles = level + Math.floor(Math.random() * 3); // Choose a random number between level and level+2
    const selectedHoles = [];
    for (let i = 0; i < numberOfMoles; i++) {
      let hole = randomHole(holes);
      while (selectedHoles.includes(hole)) {
        hole = randomHole(holes);
      }
      selectedHoles.push(hole);
      hole.classList.add('up');
    }
    const moles = document.querySelectorAll('.mole'); // re-assign moles variable with the updated list of moles
    moles.forEach(mole => mole.addEventListener('click', startGame));

    setTimeout(() => {
      selectedHoles.forEach(hole => {
        hole.classList.remove('up');
      });
      if (!timeUp) peep(level);
    }, time);
  }

  function startGame(event) {
    if (!event.isTrusted) return; // cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }

  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    peep(1);
  });
}
