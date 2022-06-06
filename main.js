const sSelector = document.getElementById("s_contaner");
const selector = document.getElementById("selector");
const corner = document.querySelectorAll(".corner");
const imgInput = document.getElementById("img_input");
const preview = document.getElementById("preview");
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
/* ------------------------------------------------
----- adjustment width height make ------*/
let wHeight = window.innerHeight,
  wWidth = window.innerWidth;
// who is smallar
let minSize = (wHeight > wWidth ? wWidth : wHeight) - 20;

/*----------------------------------------------------*/
let $$cvs = document.createElement("canvas");
let $$ctx = $$cvs.getContext("2d");
let sites = {
  w: undefined,
  h: undefined,
  tx: undefined,
  ty: undefined,
};
let selectWidth = 100;
let inkb = 512;
let squir = false;
const img = new Image();
let margin, w, h, newCreateImg, ssw, ssh, ratio, nsize, Img;

// set inkb value
imgSizeInput.addEventListener("keyup", (e) => {
  if (!imgSizeInput.value || 0 >= imgSizeInput.value) {
    inkb = 512;
    return;
  }
  inkb = Number(imgSizeInput.value);
});
inputW.addEventListener("keyup", () => {
  if (!inputW.value || 0 >= inputW.value) {
    return;
  } else if (inputW.value > ssw) {
    sites.w = ssw;
  } else {
    sites.w = Number(inputW.value);
  }
  sites.tx = (ssw - sites.w) / 2;
  setCss();
});
inputH.addEventListener("keyup", () => {
  if (!inputH.value || 0 >= inputH.value) {
    return;
  } else if (inputH.value > ssh) {
    sites.h = ssh;
  }else {
    sites.h = Number(inputH.value);
  }
  sites.ty = (ssh - sites.h) / 2;
  setCss();
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
function setCss() {
  selector.style.transform = `translateX(${sites.tx}px) translateY(${sites.ty}px)`;
  selector.style.width = `${sites.w}px`;
  selector.style.height = `${sites.h}px`;
  inputW.value = sites.w;
  inputH.value = sites.h;
}
const cnr = [
  selector,
  corner[0],
  corner[1],
  corner[2],
  corner[3],
  mide[0],
  mide[1],
  mide[2],
  mide[3],
];

let isCorner = false;

cnr.forEach((elmt) => {
  let lx, ly, dx, dy, down = false;

  elmt.addEventListener("touchstart", (e) => {
    eStart({clientX: e.touches[0].clientX, clientY: e.touches[0].clientY});
  });
  elmt.addEventListener("touchmove", (e) => {
    eMove({clientX: e.touches[0].clientX, clientY: e.touches[0].clientY});
  });
  elmt.addEventListener("touchend", eEnd);

  elmt.addEventListener("click", eStart);
  elmt.addEventListener("mousemove", eMove);
  elmt.addEventListener("mouseup", eEnd);


  function eStart(e) {
    down = down ? false : true;
    lx = e.clientX;
    ly = e.clientY;

  }
  function eMove(e) {
    if (down) {
      dx = e.clientX - lx;
      dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      
      // protact sides when colluction
      function pT() {
        return sites.ty + dy >= 0;
      }
      function pR() {
        return sites.tx + dx + sites.w <= ssw;
      }
      function pB() {
        return sites.ty + dy + sites.h <= ssh;
      }
      function pL() {
        return sites.tx + dx >= 0;
      }
      // ------- touch movement -------
      if (elmt != selector) {
        isCorner = true;
      }
      if (elmt === corner[0] && pT() && pL()) {
        sites.w += -dx;
        sites.h += -dy;
        sites.tx += dx;
        sites.ty += dy;
        setCss();
      } else if (elmt === corner[1] && pT() && pR()) {
        sites.w += dx;
        sites.h += -dy;
        sites.ty += dy;
        setCss();
      } else if (elmt === corner[2] && pR() && pB()) {
        sites.w += dx;
        sites.h += dy;
        setCss();
      } else if (elmt === corner[3] && pB() && pL()) {
        sites.w += -dx;
        sites.h += dy;
        sites.tx += dx;
        setCss();
      } else if (elmt === mide[0] && pT()) {
        sites.h += -dy;
        sites.ty += dy;
        setCss();
      } else if (elmt === mide[1] && pR()) {
        sites.w += dx;
        setCss();
      } else if (elmt === mide[2] && pB()) {
        sites.h += dy;
        setCss();
      } else if (elmt === mide[3] && pL()) {
        sites.w += -dx;
        sites.tx += dx;
        setCss();
      } else if (!isCorner && pB() && pL() && pT() && pR()) {
        sites.tx += dx;
        sites.ty += dy;
        setCss();
      }
    }
  }
  function eEnd() {
    if (elmt != selector) {
      isCorner = false;
    }
  }
});

imgInput.addEventListener("change", (e) => {
  if (!e.target.files[0]) return;

  Img = URL.createObjectURL(e.target.files[0]);
  img.src = Img;
  img.onload = () => {
    sSelector.style.display = "flex";
    contentOther.style.display = "block";
    let ss = sSelector.style;
    w = img.width;
    h = img.height;

    if (h > w) {
      ratio = h / minSize;
      nsize = w / ratio;
      ss.backgroundSize = `${nsize}px ${minSize}px`;
      ss.width = `${nsize}px`;
      ss.height = `${minSize}px`;
    } else {
      ratio = w / minSize;
      nsize = h / ratio;
      ss.backgroundSize = `${minSize}px ${nsize}px`;
      ss.width = `${minSize}px`;
      ss.height = `${nsize}px`;
    }
    ssw = sSelector.clientWidth;
    ssh = sSelector.clientHeight;
    sites.w = ssw * 0.75;
    sites.h = ssh * 0.75;
    sites.tx = ssw * 0.125;
    sites.ty = ssh * 0.125;
    setCss();
    ss.backgroundImage = `url('${Img}')`;
  };
});

crapBtn.addEventListener("click", () => {
  if (!Img) return;
  preview.style.display = "flex";
  let scaleN = Math.floor(sites.w / selectWidth),
  cw,
  ch;

  function maekImgPerfectSize() {
    $$cvs.width = selectWidth;
    scaleN = selector.clientWidth / selectWidth;
    ch = sites.h / scaleN;
    $$cvs.height = ch;
    cw = selectWidth;

    $$ctx.clearRect(0, 0, $$cvs.width, $$cvs.height);
    $$ctx.drawImage(
      img,
      sites.tx * ratio,
      sites.ty * ratio,
      sites.w * ratio,
      sites.h * ratio,
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

  let scl = ch / cw;
  imgResize.style.backgroundSize = `${minSize}px ${minSize * scl}px`;
  imgResize.style.width = `${minSize}px`;
  imgResize.style.height = `${minSize * scl}px`;

  newCreateImg = maekImgPerfectSize();
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
