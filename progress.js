// progress.js
function createProgress(win) {
  const INCREMENT = 0.01
  const INTERVAL_DELAY = 100 //ms

  let progress = 0
  const progressInterval = setInterval(() => {
    win.setProgressBar(progress)

    if (progress >= 1) {
      clearInterval(progressInterval)
      progress = 0
    } else {
      progress += INCREMENT
    }
  }, INTERVAL_DELAY)
}

module.exports = createProgress;
