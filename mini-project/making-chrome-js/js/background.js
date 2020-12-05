const background = document.querySelector(".background");

/* ------------------background configuration start------------------*/
async function setBackgroundCommand() {
  if (background.complete) {
    await loadImage(
      `mini-project/making-chrome-js/img/img${1 + Math.floor(Math.random() * 5)}.jpg`,
      background
    );
  }
}

async function loadImage(url, elem) {
  return new Promise((resolve, reject) => {
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = url;
  });
}
/* ------------------background configuration end------------------*/

setBackgroundCommand();
setInterval(setBackgroundCommand, 10000);
