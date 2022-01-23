const intreWindow = document.getElementById("intre_window");
const sSelector = document.getElementById("s_contaner");
const selector = document.getElementById("selector");
const corner = document.querySelectorAll(".corner");
const imgInput = document.getElementById("img_input");
const preview = document.getElementById("preview");
const closeBtn = document.getElementById("close");
const imgResize = document.getElementById("img_resize");
const imgSizeInput = document.getElementById("img_size_input");
const pvuBtn = document.getElementById("pvu_btn");
const downloadBtn = document.getElementById("download_btn");
const crapBtn = document.getElementById("crap_btn");
const upload_imagge = document.getElementById("upload_imagge");
const root = document.querySelector(":root");
/* ------------------------------------------------
----- adjustment width height make ------*/
let wHeight = window.innerHeight,
  wWidth = window.innerWidth;
// who is smallar
let minSize = (wHeight > wWidth ? wWidth : wHeight) - 20;
root.style.setProperty("--width", `${minSize}px`);
root.style.setProperty("--height", `${minSize}px`);

/*----------------------------------------------------*/

let selectWidth = 100;
let inkb = 512;
let squir = false;

// set inkb value
imgSizeInput.addEventListener("keyup", (e) => {
  if (!imgSizeInput.value || 0 >= imgSizeInput.value) {
    inkb = 512;
    return;
  }
  inkb = Number(imgSizeInput.value);
});

upload_imagge.addEventListener("click", () => imgInput.click());
hover(upload_imagge);
hover(crapBtn);
hover(pvuBtn);
hover(closeBtn);
hover(downloadBtn);

// touch hover effect
function hover(element) {
  element.addEventListener("touchstart", () => {
    element.classList.add("active");
  });
  element.addEventListener("touchend", () => {
    element.classList.remove("active");
  });
  element.addEventListener("mouseenter", () => {
    element.classList.add("active");
  });
  element.addEventListener("mouseleave", () => {
    element.classList.remove("active");
  });
}

// set sides css propatys
function cssSides() {
  root.style.setProperty("--sl", `${sids.l}px`);
  root.style.setProperty("--sr", `${sids.r}px`);
  root.style.setProperty("--st", `${sids.t}px`);
  root.style.setProperty("--sb", `${sids.b}px`);
}
let $$cvs = document.createElement("canvas");
let $$ctx = $$cvs.getContext("2d");
let sids = {
  r: 25,
  l: 25,
  t: 25,
  b: 25,
};

const cnr = [selector, corner[0], corner[1], corner[2], corner[3]];
let isCorner = false;

cnr.forEach((elmt, i) => {
  let lx, ly, dx, dy;
  elmt.addEventListener("touchstart", (e) => {
    lx = e.touches[0].clientX;
    ly = e.touches[0].clientY;
  });

  elmt.addEventListener("touchmove", (e) => {
    dx = e.touches[0].clientX - lx;
    dy = e.touches[0].clientY - ly;
    lx = e.touches[0].clientX;
    ly = e.touches[0].clientY;

    // ------- touch movement -------
    if (elmt != selector) {
      isCorner = true;
    }
    if (elmt === corner[0] && sids.l + dx > 0 && sids.t + dy > 0) {
      if (squir) {
        let min = Math.floor((dx + dy) / 2);
        sids.l += min;
        sids.t += min;
      } else {
        sids.l += dx;
        sids.t += dy;
      }
      cssSides();
    } else if (elmt === corner[1] && sids.r - dx > 0 && sids.t + dy > 0) {
      if (squir) {
        let min = Math.floor((-dx + dy) / 2);
        sids.r += min;
        sids.t += min;
      } else {
        sids.r += -dx;
        sids.t += dy;
      }
      cssSides();
    } else if (elmt === corner[2] && sids.r - dx > 0 && sids.b - dy > 0) {
      if (squir) {
        let min = Math.floor((-dx + -dy) / 2);
        sids.r += min;
        sids.b += min;
      } else {
        sids.r += -dx;
        sids.b += -dy;
      }
      cssSides();
    } else if (elmt === corner[3] && sids.l + dx > 0 && sids.b - dy > 0) {
      if (squir) {
        let min = Math.floor((dx + -dy) / 2);
        sids.l += min;
        sids.b += min;
      } else {
        sids.l += dx;
        sids.b += -dy;
      }
      cssSides();
    } else if (
      !isCorner &&
      sids.l + dx > 0 &&
      sids.t + dy > 0 &&
      sids.r - dx > 0 &&
      sids.b - dy > 0
    ) {
      this.dx = Math.floor(dx);
      this.dy = Math.floor(dy);
      sids.l += this.dx;
      sids.r += -this.dx;
      sids.t += this.dy;
      sids.b += -this.dy;
      cssSides();
    }
  });
  elmt.addEventListener("touchend", (e) => {
    if (elmt != selector) {
      isCorner = false;
    }
  });
});
const img = new Image();
let ratio = 0,
  nsize = 0;

imgInput.addEventListener("change", (e) => {
  if (!e.target.files[0]) return;
  sids = {
    r: 25,
    l: 25,
    t: 25,
    b: 25,
  };
  ratio = 0;
  nsize = 0;
  cssSides();
  let Img = URL.createObjectURL(e.target.files[0]);
  img.src = Img;
  img.onload = () => {
    sSelector.style.display = "flex";
    fullScreen();
    let scale = selectWidth / img.width;
    let w = img.width,
    h = img.height,
    ss = sSelector.style;
    
    if (h > w) {
      ratio = h / minSize;
      nsize = w / ratio;
      ss.backgroundSize = `${nsize}px ${minSize}px`;
      ss.width = `${nsize}px`;
      ss.height = `${minSize}px`;
      let margin = Math.floor(minSize - nsize) / 2;
      if (squir) {
        sids.t = 25 + margin;
        sids.b = 25 + margin;
        root.style.setProperty("--st", `${25 + margin}px`);
        root.style.setProperty("--sb", `${25 + margin}px`);
      }
    } else {
      ratio = w / minSize;
      nsize = h / ratio;
      ss.backgroundSize = `${minSize}px ${nsize}px`;
      ss.width = `${minSize}px`;
      ss.height = `${nsize}px`;
      let margin = Math.floor(minSize - nsize) / 2;
      if (squir) {
        sids.l = 25 + margin;
        sids.r = 25 + margin;
        root.style.setProperty("--sl", `${25 + margin}px`);
        root.style.setProperty("--sr", `${25 + margin}px`);
      }
    }

    ss.backgroundImage = `url('${Img}')`;
  };
});

crapBtn.addEventListener("click", () => {
  preview.style.display = "flex";

  let left = selector.offsetLeft,
    top = selector.offsetTop,
    wid = selector.clientWidth,
    hei = selector.clientHeight,
    scaleN = wid / selectWidth,
    cw,
    ch;

  function maekImgPerfectSize() {
    if (squir) {
      $$cvs.width = selectWidth;
      $$cvs.height = selectWidth;
      cw = selectWidth;
      ch = selectWidth;
    } else {
      $$cvs.width = selectWidth;
      scaleN = selector.clientWidth / selectWidth;
      $$cvs.height = hei / scaleN;
      cw = selectWidth;
      ch = hei / scaleN;
    }
    $$ctx.clearRect(0, 0, $$cvs.width, $$cvs.height);
    $$ctx.drawImage(
      img,
      left * ratio,
      top * ratio,
      wid * ratio,
      hei * ratio,
      0,
      0,
      $$cvs.width,
      $$cvs.height
    );
    return (newImgSrc = $$ctx.canvas.toDataURL(img, "image/jpeg"));
  }
  while (maekImgPerfectSize().length / 1000 < inkb * 1.35) {
    selectWidth += 100;
  }
  while (maekImgPerfectSize().length / 1000 > inkb * 1.35) {
    selectWidth -= 10;
  }

  if (squir) {
    imgResize.style.backgroundSize = `${minSize}px ${minSize}px`;
  } else {
    let scl = ch / cw;
    imgResize.style.backgroundSize = `${minSize}px ${minSize * scl}px`;
    root.style.setProperty("--width", `${minSize}px`);
    root.style.setProperty("--height", `${minSize * scl}px`);
  }

  imgResize.style.backgroundImage = `url(${maekImgPerfectSize()})`;

  downloadBtn.addEventListener("click", () => {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob($$cvs.msToBlob(), "your-image.png");
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = $$cvs.toDataURL();
      a.download = "your-image.png";
      a.click();
      document.body.removeChild(a);
    }
  });
});

// canvas propatys -----------

pvuBtn.addEventListener("click", () => {
  preview.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  preview.style.display = "none";
});

// full sereen mood
function getFullScreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
}

document.body.addEventListener("click", () => {});

intreWindow.addEventListener("click", () => {
  fullScreen();
  intreWindow.style.display = "none";
});

function fullScreen() {
  if (getFullScreen()) return;
  if (!getFullScreen()) {
    document.documentElement
      .requestFullscreen()
      .catch(console.log());
  }
}
