window.onload = () => {
  document.getElementById('generator-function')
    .addEventListener('click', highlightGenerator, { once: true });
};

function highlightGenerator(event) {
  event.stopPropagation();
  this.classList.add('highlighted');

  this.addEventListener('click', 
                        function (event) {
                          event.stopPropagation(); 
                          this.classList.remove('highlighted');
                          goLineByLine(startActions);
                        }, 
                        { once: true });
}

function goLineByLine(actions) {
  let actionIndex = -1;
  let currentLine;
  const lines = document.querySelectorAll('.line');
  document.querySelector('body').addEventListener('click', nextLine);

  function nextLine() {
    if (currentLine) {
      toggleHighlight(currentLine);
      hideComment(currentLine);
    }

    actionIndex++;
    if (actionIndex > actions.length - 1) {
      document.querySelector('body').removeEventListener('click', nextLine);
      return;
    }

    const currentAction = actions[actionIndex];
    currentLine = lines[currentAction.line];

    toggleHighlight(currentLine);
    showComment(currentLine, currentAction.comment);

    if (currentAction.action) {
      (currentAction.action)();
    }
  }
}

function toggleHighlight(line) {
  line.classList.toggle('current-line');
}

function showComment(line, comment) {
  if (comment) {
    const commentDiv = document.createElement('span');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `/* ${comment} */`;

    line.appendChild(commentDiv);
  }
}

function hideComment(line) {
  const comment = line.querySelector('.comment');  
  if (comment) {
    comment.remove();
  }
}

function sleep() {
  document.getElementById('pictures').innerHTML = `        
    <div class="sleeping">
      <div class="z">Z</div>
      <div class="z">Z</div>
      <div class="z">Z</div>
    </div>`;
}

function alarm() {
  document.getElementById('pictures').innerHTML = `
    <img src="wake-up-machine.gif" />
    <button class="alarm-button" onclick="snooze()">Snooze</button>
    <button class="alarm-button" onclick="wakeUp()">Wake up</button>`;
}
function toggleBreakfast() {
  togglePicture('breakfast', 'breakfast-machine.gif');
}
function toggleTeeth() {
  togglePicture('teeth', 'toothbrush.gif');
}

function togglePicture(id, image) {
  const picture = document.getElementById(id);
  if (picture) {
    picture.remove();
  } else {
    document.getElementById('pictures').innerHTML = `<img id="${id}" src="${image}" />`;
  }
}

function makeEditable() {
  document.querySelector('article').contentEditable = true;
}

function snooze() {
  document.getElementById('pictures').innerHTML = '';
  goLineByLine(snoozeActions);
}

function wakeUp() {
  document.getElementById('pictures').innerHTML = '';
  goLineByLine(awakeActions);
}

const startActions = [
  { line: 0, comment: undefined },
  { line: 1 },
  { line: 2 },
  { line: 2, action: sleep },
  { line: 1, comment: 'it.next() = { value: setAlarmPromise, done: false }' },
  { line: 7, comment: 'next = { value: setAlarmPromise, done: false }' },
  { line: 9, comment: 'next = { value: setAlarmPromise, done: false }' },
  { line: 9, action: alarm },
];

const snoozeActions = [
  { line: 10, comment: 'response = true' },
  { line: 2, comment: 'snooze = true' },
  { line: 3, comment: 'snooze = true' },
  { line: 4, action: sleep },
  { line: 10, comment: 'it.next(response) = { value: snoozePromise, done: false }' },
  { line: 7, comment: 'next = { value: snoozePromise, done: false }' },
  { line: 9, comment: 'next = { value: snoozePromise, done: false }' },
  { line: 9, action: alarm },
];

const awakeActions = [
  { line: 10, comment: 'response = false' },
  { line: 4, comment: 'snooze = false' },
  { line: 3, comment: 'snooze = false' },
  { line: 5, action: toggleBreakfast },
  { line: 10, comment: 'it.next(response) = { value: breakfastPromise, done: false }' },
  { line: 7, comment: 'next = { value: breakfastPromise, done: false }' },
  { line: 9, comment: 'next = { value: breakfastPromise, done: false }' },
  { line: 10, action: toggleBreakfast, comment: 'response = undefined' },
  { line: 5 },
  { line: 6, action: toggleTeeth },
  { line: 10, comment: 'it.next(response) = { value: brushTeethPromise, done: false }' },
  { line: 7, comment: 'next = { value: brushTeethPromise, done: false }' },
  { line: 9, comment: 'next = { value: brushTeethPromise, done: false }' },
  { line: 10, action: toggleTeeth, comment: 'response = undefined' },
  { line: 6 },
  { line: 10, comment: 'it.next(response) = { value: undefined, done: true }' },
  { line: 7, comment: 'next = { value: undefined, done: true }' },
  { line: 8, action: makeEditable },
];
