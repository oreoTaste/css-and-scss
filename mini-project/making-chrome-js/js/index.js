const pendingDB = [],
  finishedDB = [],
  tasks = document.querySelector(".tasks"),
  pending = document.querySelector(".pending"),
  finished = document.querySelector(".finished"),
  currentTime = document.querySelector(".current-time"),
  dave = document.querySelector(".dave"),
  content = document.querySelector(".content"),
  user = document.querySelector(".js-user"),
  userName = document.querySelector(".user-name");

/* ------------------init configuration start------------------*/
function loadStorageToDB() {
  const pendings = JSON.parse(localStorage.getItem("pending"));
  const finished = JSON.parse(localStorage.getItem("finished"));
  const name = localStorage.getItem("user");

  if (pendings) {
    pendingDB.push(...pendings);
  }
  if (finished) {
    finishedDB.push(...finished);
  }
  if (name) {
    user.innerText = name;
    dave.classList.add("hidden");
    content.classList.add("animation");
    userName.classList.remove("hidden");
  }
}

function handleDBToPaint() {
  if (pendingDB) {
    pendingDB.forEach((db) => paintDB("pending", db));
  }
  if (finishedDB) {
    finishedDB.forEach((db) => paintDB("finished", db));
  }
}

function paintDB(str, db) {
  const divs = createDiv(
    createButton(),
    createMove(),
    db.value,
    db["data-time"]
  );
  if (str === "pending") {
    pending.appendChild(divs);
  } else if (str === "finished") {
    finished.appendChild(divs);
  }
}

function cleanDB() {
  pendingDB.splice(0, pendingDB.length);
  finishedDB.splice(0, finishedDB.length);
}
function setClock() {
  const now = new Date();
  const hours = `${
    now.getHours() < 10 ? 0 + `${now.getHours()}` : `${now.getHours()}`
  }`;
  const minutes = `${
    now.getMinutes() < 10 ? 0 + `${now.getMinutes()}` : `${now.getMinutes()}`
  }`;
  const seconds = `${
    now.getSeconds() < 10 ? 0 + `${now.getSeconds()}` : `${now.getSeconds()}`
  }`;

  currentTime.innerText = hours + ":" + minutes + ":" + seconds;
}
/* ------------------init configuration end------------------*/

function init() {
  loadStorageToDB();
  handleDBToPaint();
  cleanDB();
  setInterval(setClock, 1000);
}

init();

/* ------------------Tasks configuration start------------------*/

function createButton() {
  const del = document.createElement("button");
  del.innerHTML = "X";
  del.addEventListener("click", (event) => {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    saveParents();
  });
  return del;
}

function createMove() {
  const move = document.createElement("button");
  move.innerHTML = "🚩";
  move.addEventListener("click", (event) => {
    if (event.target.parentNode.parentNode === finished) {
      pending.appendChild(event.target.parentNode);
    } else {
      finished.appendChild(event.target.parentNode);
    }
    saveParents();
  });
  return move;
}

function createDiv(del, move, val, time) {
  const divs = document.createElement("div");
  divs.setAttribute("value", val);
  divs.setAttribute("data-time", time);
  divs.innerHTML = val;
  divs.appendChild(del);
  divs.appendChild(move);
  return divs;
}

const saveParent = (parent) => {
  const element = parent.querySelectorAll("div");
  let bucket = [];
  Array.prototype.forEach.call(element, (el) => {
    bucket.push({
      value: el.getAttribute("value"),
      "data-time": el.getAttribute("data-time")
    });
  });
  return bucket;
};

const saveParents = () => {
  localStorage.setItem("pending", JSON.stringify(saveParent(pending)));
  localStorage.setItem("finished", JSON.stringify(saveParent(finished)));
};

const putPending = (event) => {
  const div = createDiv(
    createButton(),
    createMove(),
    event.target.value,
    Date.now()
  );
  pending.appendChild(div);
  event.target.value = "";
  saveParents();
};

const saveOnDB = (e) => {
  console.log("changed");
  localStorage.setItem("user", e.target.value);
  user.innerText = e.target.value;
  e.target.classList.add("hidden");
  content.classList.add("animation");
  userName.classList.remove("hidden");
};
/* ------------------Tasks configuration end------------------*/

tasks.addEventListener("change", putPending);
dave.addEventListener("change", saveOnDB);
