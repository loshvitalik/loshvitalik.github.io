export const PAW_PRINTS = "🐾";
const FADE_IN_INTERVAL = 10;
const FADE_IN_INIT_DELAY = 500;
export const TOTAL_FADE_IN_TIME = FADE_IN_INIT_DELAY + FADE_IN_INTERVAL * 20;

export function formatDateDayMonth(date) {
  return ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2);
}

export function formatDateTime(date) {
  return ("0" + date.getDate()).slice(-2) + "." +
    ("0" + (date.getMonth() + 1)).slice(-2) + "." +
    date.getFullYear() + " " +
    ("0" + date.getHours()).slice(-2) + ":" +
    ("0" + date.getMinutes()).slice(-2);
}

export function fadeIn(element) {
  var op = 0.05;
  element.style.display = 'block';
  setTimeout(() => {
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.05;
    }, FADE_IN_INTERVAL)
  }, FADE_IN_INIT_DELAY);
}