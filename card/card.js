const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 768;
const CANVAS_HEIGHT = 768;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let uploadedImage = null;

// 背景画像を選ぶためのセレクター
function getSelectedBackground() {
  const selector = document.getElementById("background-selector");
  return selector ? selector.value : "template.png";
}

// アップロード画像読み込み
document.getElementById("custom-image").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImage = new Image();
    uploadedImage.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function drawCard() {
  const name = document.getElementById("name").value;
  const favoritePlayer = document.getElementById("favorite-player").value;
  const favoritePerson = document.getElementById("favorite-person").value;
  const arenaFood = document.getElementById("arena-food").value;
  const years = document.getElementById("years").value;
  const favoriteSeat = document.getElementById("favorite-seat").value;
  const kyotoReason = document.getElementById("kyoto-reason").value;
  const playerReason = document.getElementById("player-reason").value;
  const freeSpace = document.getElementById("free-space").value;
  const xUrl = document.getElementById("x-url").value;
  const instaUrl = document.getElementById("insta-url").value;

  const selectedBackground = getSelectedBackground();
  const bgImage = new Image();
  bgImage.src = "" + selectedBackground;

  bgImage.onload = () => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(bgImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.font = "18px Meiryo";
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "top";

    // 入力欄描画
    drawField("名前: " + name, 30, 30, 708, 30);
    drawField("好きな選手: " + favoritePlayer, 30, 80, 340, 30);
    drawField("ハンナリーズで好きな人: " + favoritePerson, 398, 80, 340, 30);
    drawField("好きなアリーナ飯: " + arenaFood, 30, 130, 340, 30);
    drawField("好きな座席: " + favoriteSeat, 398, 130, 340, 30);
    drawField("ハンナリーズ歴: " + years + "年", 600, 30, 140, 30);

    drawMultilineField("京都を好きになったきっかけ: " + kyotoReason, 30, 190, 708, 60);
    drawMultilineField("選手を好きになったきっかけ: " + playerReason, 30, 270, 708, 60);
    drawMultilineField("フリースペース: " + freeSpace, 30, 350, 708, 100);

    // QRコードと画像
    if (xUrl) drawQR(xUrl, 600, 620, "X");
    if (instaUrl) drawQR(instaUrl, 680, 620, "Instagram");
    if (uploadedImage) {
      uploadedImage.onload = () => {
        ctx.drawImage(uploadedImage, 600, 480, 140, 120);
      };
      if (uploadedImage.complete) {
        ctx.drawImage(uploadedImage, 600, 480, 140, 120);
      }
    }
  };
}

// 単行フィールド
function drawField(text, x, y, width, height) {
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, width, height);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#000000";
  ctx.fillText(text, x + 8, y + 6);
}

// 複数行フィールド
function drawMultilineField(text, x, y, width, height) {
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, width, height);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#000000";
  const lineHeight = 22;
  const words = text.split(/(\s+|。|、|，|．|・|\/)/);
  let line = '';
  let lineY = y + 6;
  const maxWidth = width - 16;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x + 8, lineY);
      line = words[n];
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x + 8, lineY);
}

// QRコード描画
function drawQR(text, x, y, label = "") {
  const tempDiv = document.createElement("div");
  const qr = new QRCode(tempDiv, {
    text: text,
    width: 100,
    height: 100,
    correctLevel: QRCode.CorrectLevel.H
  });

  const qrImg = tempDiv.querySelector("img");

  qrImg.onload = () => {
    ctx.drawImage(qrImg, x, y, 64, 64);
    drawQRLabel(label, x, y + 70);
  };
  if (qrImg.complete) {
    ctx.drawImage(qrImg, x, y, 64, 64);
    drawQRLabel(label, x, y + 70);
  }
}

function drawQRLabel(label, x, y) {
  const fontSize = 14;
  ctx.font = `${fontSize}px Meiryo`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const textWidth = ctx.measureText(label).width;
  const padding = 4;

  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x + 32 - textWidth / 2 - padding, y - 2, textWidth + padding * 2, fontSize + 6);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, x + 32, y);
  ctx.textAlign = "start";
}

// 保存ボタン用
function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
