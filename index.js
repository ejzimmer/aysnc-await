const robot = { snoozeAgain: 2 };
robot.setAlarm = () => {
  console.log('Alarm set for 7:00');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('WAKE UP!');
      resolve(true);
    }, 10000);
  });
}

robot.snooze = () => {
  console.log('snoozing...');
  robot.snoozeAgain--;

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('WAKE UP AGAIN!');
      resolve(robot.snoozeAgain);
    }, 5000)
  })
}

robot.makeBreakfast = () => new Promise(resolve => {
  setTimeout(() => {
    console.log('doing other thing');
    resolve();
  });
});
robot.brushMyTeeth = robot.makeBreakfast;

function * morningRobot() {
  let snooze = yield robot.setAlarm('7:00');

  while (snooze) {
    snooze = yield robot.snooze();
  }

  yield robot.makeBreakfast();
  yield robot.brushMyTeeth();
}

function await(next) {
  if (next.done) {
    return;
  }
  next.value.then(response => {
    await(it.next(response))
  });
}

const it = morningRobot();
await(it.next());
