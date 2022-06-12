const sSelector = document.getElementById("s_contaner");
const selector = document.getElementById("selector");
const imgInput = document.getElementById("img_input");
const preview = document.getElementById("preview-window");
const closeBtn = document.getElementById("close");
const instraction = document.getElementById("instraction");
const iKnow = document.getElementById("i_know");
const imgResize = document.getElementById("img_resize");
const mide = document.querySelectorAll(".mide");
const imgSizeInput = document.getElementById("img_size_input");
const pvuBtn = document.getElementById("pvu_btn");
const downloadBtn = document.getElementById("download_btn");
const crapBtn = document.getElementById("crap_btn");
const upload_imagge = document.getElementById("upload_imagge");
const inputW = document.getElementById("input_w");
const inputH = document.getElementById("input_h");
const contentOther = document.getElementById("content_other");
const mainWindow = document.getElementById("main-window");
const closeMainWindw = document.getElementById("close-main-windw");
const selectedImg = document.getElementById("selected-img");
const upload_imagge_2 = document.getElementById("upload_imagge_2");
const img_only_size = document.getElementById("img_only_size");
const backImg = document.getElementById("back-img");
const root = document.querySelector(":root");
/* ------------------------------------------------*/

/* ------------------ maim function -------------------- */
const setPrty = (name, delta, dirXis) => {
  const w_h = dirXis ? sSelector.clientWidth : sSelector.clientHeight;
  if (w_h >= dlmov[name[2]] + delta && 0 <= dlmov[name[2]] + delta) {
    root.style.setProperty(name, `${(dlmov[name[2]] += delta)}px`);
    inputW.value = selector.clientWidth;
    inputH.value = selector.clientHeight;
  }
};
/* -------------------------------------------------------- */

/* --------------------- variables ---------------- */
const dlmov = {
  l: 0,
  r: 0,
  t: 0,
  b: 0,
};
let selectWidth = 100;
let lx, ly, dx, dy;
let down = false;
let inkb = 100;
let fileNames = [];
/* -------------------------------------------------------- */

/*----- adjustment width height make ------*/
let wHeight = window.innerHeight,
  wWidth = window.innerWidth;
// who is smallar
let ratioX = (wHeight > wWidth ? wWidth : wHeight) - 100;

/*----------------------------------------------------*/
let $cvs = document.createElement("canvas");
let $ctx = $cvs.getContext("2d");

const img = new Image();
let newCreateImg = false, ratio, ratioY, Img;

// set inkb value
imgSizeInput.addEventListener("keyup", (e) => {
  if (!parseInt(imgSizeInput.value) || 0 >= parseInt(imgSizeInput.value)) {
    inkb = 100;
    return;
  }
  inkb = Number(imgSizeInput.value);
});

inputW.addEventListener("keyup", () => {
  if (parseInt(inputW.value) <= 0 || inputW.value == "") {
    inputW.value = 0;
  } else if (sSelector.clientWidth <= parseInt(inputW.value)) {
    inputW.value = sSelector.clientWidth;
  }
  inputW.value = parseInt(inputW.value);
  let hf = (sSelector.clientWidth - parseInt(inputW.value)) / 2;
  root.style.setProperty("--l", `${(dlmov.l = hf)}px`);
  root.style.setProperty("--r", `${(dlmov.r = hf)}px`);
});

inputH.addEventListener("keyup", () => {
  if (parseInt(inputH.value) <= 0 || inputH.value == "") {
    inputH.value = 0;
  } else if (sSelector.clientHeight <= parseInt(inputH.value)) {
    inputH.value = sSelector.clientHeight;
  }
  inputH.value = parseInt(inputH.value);
  let hf = (sSelector.clientHeight - parseInt(inputH.value)) / 2;
  root.style.setProperty("--t", `${(dlmov.t = hf)}px`);
  root.style.setProperty("--b", `${(dlmov.b = hf)}px`);
});

upload_imagge.addEventListener("click", () => imgInput.click());
upload_imagge_2.addEventListener("click", () => img_only_size.click());
hover(upload_imagge);
hover(iKnow); 
hover(crapBtn);
hover(pvuBtn);
hover(closeBtn);
hover(downloadBtn);
hover(closeMainWindw);
hover(selector);
hover(upload_imagge_2);

// touch hover effect
function hover(element) {
  element.addEventListener("touchstart", () => {
    element.classList.add("hover");
  });
  element.addEventListener("touchend", () => {
    element.classList.remove("hover");
  });
  element.addEventListener("mouseenter", () => {
    element.classList.add("hover");
  });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("hover");
  });
}

closeMainWindw.addEventListener("click", () => {
  mainWindow.classList.remove("active");
  imgInput.value = "";
  newCreateImg = false;
});

const corner = document.querySelectorAll(".corner");
const mLR = document.querySelectorAll(".mlr");
const mTB = document.querySelectorAll(".mtb");

const mov = {
  l: 1,
  r: 1,
  t: 1,
  b: 1,
};

let mouse_down = false;
corner.forEach((e, i) => {
  hover(e);
  e.addEventListener("touchstart", _start);
  e.addEventListener("touchend", _end);
  e.addEventListener("mousedown", _start);
  e.addEventListener("mouseup", _end);

  function _start() {
    mouse_down = true;
    if (i === 0) {
      mov.l = 1;
      mov.t = 1;
    } else if (i === 1) {
      mov.r = 1;
      mov.t = 1;
    } else if (i === 2) {
      mov.r = 1;
      mov.b = 1;
    } else if (i === 3) {
      mov.l = 1;
      mov.b = 1;
    }
  }
  function _end() {
    mouse_down = false;
    mov.l = 0;
    mov.r = 0;
    mov.t = 0;
    mov.b = 0;
  }
});
mLR.forEach((e, i) => {
  hover(e);
  e.addEventListener("touchstart", _start);
  e.addEventListener("touchend", _end);
  e.addEventListener("mousedown", _start);
  e.addEventListener("mouseup", _end);

  function _start() {
    mouse_down = true;
    if (i === 0) mov.r = 1;
    else mov.l = 1;
  }
  function _end() {
    mouse_down = false;
    mov.r = 0;
    mov.l = 0;
  }
});
mTB.forEach((e, i) => {
  hover(e);
  e.addEventListener("touchstart", _start);
  e.addEventListener("touchend", _end);
  e.addEventListener("mousedown", _start);
  e.addEventListener("mouseup", _end);

  function _start() {
    mouse_down = true;
    if (i === 0) mov.t = 1;
    else mov.b = 1;
  }
  function _end() {
    mouse_down = false;
    mov.t = 0;
    mov.b = 0;
  }
});

selector.addEventListener("mousedown", (e) => {
  mouse_down = true;
  s_start(e);
});
selector.addEventListener("mousemove", (e) => {
  if (mouse_down) s_move(e);
});
selector.addEventListener("mouseup", () => {
  mouse_down = false;
});
selector.addEventListener("mouseleave", () => {
  mouse_down = false;
});

selector.addEventListener("touchstart", (e) => {
  s_start({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
});
selector.addEventListener("touchmove", (e) => {
  s_move({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
});

function s_start(e) {
  lx = e.clientX;
  ly = e.clientY;
}
function s_move(e) {
  dx = e.clientX - lx;
  dy = e.clientY - ly;
  lx = e.clientX;
  ly = e.clientY;

  if (mov.t) setPrty("--t", dy, false);
  if (mov.r) setPrty("--r", -dx, true);
  if (mov.b) setPrty("--b", -dy, false);
  if (mov.l) setPrty("--l", dx, true);

  if (!mov.l && !mov.r && !mov.t && !mov.b) {
    setPrty("--t", dy, false);
    setPrty("--r", -dx, true);
    setPrty("--b", -dy, false);
    setPrty("--l", dx, true);
  }
}

imgInput.addEventListener("change", (e) => {
  if (!e.target.files[0]) return;

  fileNames = [];
  fileNames.push(e.target.files[0].name);
  mainWindow.classList.add("active");
  Img = URL.createObjectURL(e.target.files[0]);
  img.src = Img;

  img.onload = () => {
    let w = img.width;
    let h = img.height;

    if (h > w) {
      ratioY = w / ratio;
      ratio = h / ratioX;
      root.style.setProperty("--ratioX", `${ratioY}px`);
      root.style.setProperty("--ratioY", `${ratioX}px`);
    } else {
      ratio = w / ratioX;
      ratioY = h / ratio;
      root.style.setProperty("--ratioX", `${ratioX}px`);
      root.style.setProperty("--ratioY", `${ratioY}px`);
    }
    backImg.style.backgroundImage = `url('${Img}')`;
    selectedImg.style.backgroundImage = `url('${Img}')`;
    inputW.value = sSelector.clientWidth;
    inputH.value = sSelector.clientHeight;
  };
});

function mkQuality(sizeInKb) {
  let deltaW = img.width / sSelector.clientWidth;
  let deltaH = img.height / sSelector.clientHeight;
  let temp = selector.clientWidth / selector.clientHeight;

  function mkImgPerfectSize(alpha = 1) {
    $cvs.width = 1 * alpha * temp;
    $cvs.height = 1 * alpha;

    $ctx.clearRect(0, 0, $cvs.width, $cvs.height);
    $ctx.drawImage(
      img,
      dlmov.l * deltaW,
      dlmov.t * deltaH,
      selector.clientWidth * deltaW,
      selector.clientHeight * deltaH,
      0,
      0,
      $cvs.width,
      $cvs.height
    );
      return $ctx.canvas.toDataURL("image/jpeg", 0.1);
  }

  let alpha = 1;
  let _i_ = mkImgPerfectSize(alpha).length / 1350; 

  for (;_i_ < sizeInKb; alpha += 1000, _i_ = mkImgPerfectSize(alpha).length / 1350);
  for (; _i_ > sizeInKb; alpha -= 200, _i_ = mkImgPerfectSize(alpha).length / 1350);
  for (; _i_ < sizeInKb; alpha += 50, _i_ = mkImgPerfectSize(alpha).length / 1350);
  for (; _i_ > sizeInKb; alpha -= 10, _i_ = mkImgPerfectSize(alpha).length / 1350);

  return mkImgPerfectSize(alpha);
}

crapBtn.addEventListener("click", () => {
  if (!Img) return;
  preview.style.display = "flex";
  newCreateImg = true;
  imgResize.src = mkQuality(inkb);
  let r = selector.clientWidth / selector.clientHeight; 

  let previewImgW = selector.clientWidth;
  let previewImgH = selector.clientHeight;

  
  imgResize.style.backgroundSize = `${previewImgW * 5}px ${previewImgH * 5}px`;
  if (r < 1) {
    imgResize.style.width = `auto`;
    imgResize.style.height = `100%`;
  } else { 
    imgResize.style.width = `100%`; 
    imgResize.style.height = `auto`;
  }
});

downloadBtn.addEventListener("click", () => {
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob($cvs.msToBlob("image/jpeg", 0.1), `SB~${fileNames[0]}`);
  } else {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = $cvs.toDataURL("image/jpeg", 0.1);
    a.download = `SB~${fileNames[0]}`;
    a.click();
    document.body.removeChild(a);
  }
});

iKnow.addEventListener("click", () => {
  instraction.style.display = "none";
});
pvuBtn.addEventListener("click", () => {
  if (!newCreateImg) {
    instraction.style.display = "flex";
    return;
  }
  preview.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  preview.style.display = "none";
});
