const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 768;
canvas.height = 768;

let uploadedImage = null;

document.getElementById("custom-image").addEventListener("change", function (e) {
  const reader = new FileReader();
  reader.onload = function (event) {
    uploadedImage = new Image();
    uploadedImage.src = event.target.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

function getSelectedBackground() {
  const selected = document.querySelector('input[name="background"]:checked');
  return selected ? selected.value : "template.png";
}

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
  bgImage.src = selectedBackground;

  bgImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "18px Meiryo";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";

    drawField("名前: " + name, 30, 30, 708, 30);
    drawField("好きな選手: " + favoritePlayer, 30, 80, 340, 30);
    drawField("ハンナリーズで好きな人: " + favoritePerson, 398, 80, 340, 30);
    drawField("好きなアリーナ飯: " + arenaFood, 30, 130, 340, 30);
    drawField("好きな座席: " + favoriteSeat, 398, 130, 340, 30);
    drawField("ハンナリーズ歴: " + years + "年", 600, 180, 140, 30);

    drawMultilineField("京都を好きになったきっかけ: " + kyotoReason, 30, 230, 708, 60);
    drawMultilineField("選手を好きになったきっかけ: " + playerReason, 30, 310, 708, 60);
    drawMultilineField("フリースペース: " + freeSpace, 30, 390, 708, 100);

    if (xUrl) drawQR(xUrl, 550, 620, "X");
    if (instaUrl) drawQR(instaUrl, 630, 620, "Instagram");

    if (uploadedImage) {
      uploadedImage.onload = () => {
        ctx.drawImage(uploadedImage, 550, 480, 140, 120);
      };
      if (uploadedImage.complete) {
        ctx.drawImage(uploadedImage, 550, 480, 140, 120);
      }
    }
  };
}

// 🔶 角丸の背景矩形を描く
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

// ✅ 単行フィールド描画（角丸＋半透明＋余白）
function drawField(text, x, y, width, height) {
  const padding = 10;
  const radius = 10;
  const boxX = x - padding;
  const boxY = y - padding;
  const boxWidth = width + padding * 2;
  const boxHeight = height + padding * 2;

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);

  ctx.fillStyle = "#000000";
  ctx.fillText(text, x, y);
}

// ✅ 複数行フィールド描画（角丸＋半透明＋余白）
function drawMultilineField(text, x, y, width, height) {
  const padding = 10;
  const radius = 10;
  const boxX = x - padding;
  const boxY = y - padding;
  const boxWidth = width + padding * 2;
  const boxHeight = height + padding * 2;

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, radius);

  ctx.fillStyle = "#000000";
  const lineHeight = 22;
  const words = text.split(/(\s+|。|、|，|．|・|\/)/);
  let line = '';
  let lineY = y;
  const maxWidth = width;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, lineY);
      line = words[n];
      lineY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, lineY);
}

// ✅ QRコード描画とラベル
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

// ✅ QRコード下のラベル
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

// ✅ 保存ボタン押下時
function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
