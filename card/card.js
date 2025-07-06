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

    // アップロード画像（左上）
    if (uploadedImage) {
      if (uploadedImage.complete) {
        ctx.drawImage(uploadedImage, 20, 20, 180, 180);
      } else {
        uploadedImage.onload = () => {
          ctx.drawImage(uploadedImage, 20, 20, 180, 180);
        };
      }
    }

    ctx.font = "24px Meiryo";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#000000";

    // レイアウト調整用変数
    let currentY = 30;
    const margin = 35;

    // 名前
    drawField("名前: " + name, 230, currentY, 508, 60);
    currentY += 60 + margin;
    // 好きな選手・好きな人
    drawField("好きな選手: " + favoritePlayer, 230, currentY, 508, 60);
    currentY += 60 + margin;

    // ハンナリーズ歴（幅調整済）
    drawField("ハンナリーズ歴: " + years + "年", 30, currentY, 340, 50);

    ctx.font = "18px Meiryo";
    drawField("ハンナリーズで好きな人: ," + favoritePerson, 398, currentY, 340, 50);
    currentY += 50 + margin;

    // アリーナ飯・好きな座席
    drawMultilineField("好きなアリーナ飯: ¥n" + arenaFood, 30, currentY, 340, 50);
    drawMultilineField("好きな座席: ¥n" + favoriteSeat, 398, currentY, 340, 50);
    currentY += 50 + margin;
    
    // 京都を好きになったきっかけ
    drawMultilineField("京都を好きになったきっかけ: " + kyotoReason, 30, currentY, 708, 95);
    currentY += 95 + margin;

    // 選手を好きになったきっかけ
    drawMultilineField("選手を好きになったきっかけ: " + playerReason, 30, currentY, 708, 95);
    currentY += 95 + margin;

    // フリースペース
    drawMultilineField("フリースペース: " + freeSpace, 30, currentY, 448, 95);
    currentY += 95 + margin;

    // QRとラベル
    if (xUrl) drawQR(xUrl, 500, 630, "X");
    if (instaUrl) drawQR(instaUrl, 630, 630, "Instagram");
  };
}

// 角丸背景
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

// 単行フィールド
function drawField(text, x, y, width, height) {
  const padding = 10;
  const radius = 10;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  drawRoundedRect(ctx, x - padding, y - padding, width + padding * 2, height + padding * 2, radius);
  ctx.fillStyle = "#000000";
  ctx.fillText(text, x, y);
}

// 複数行フィールド
function drawMultilineField(text, x, y, width, height) {
  const padding = 10;
  const radius = 10;
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  drawRoundedRect(ctx, x - padding, y - padding, width + padding * 2, height + padding * 2, radius);
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

// QRコード + ラベル
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
    ctx.drawImage(qrImg, x, y, 100, 100);
    drawQRLabel(label, x, y + 106);
  };
  if (qrImg.complete) {
    ctx.drawImage(qrImg, x, y, 100, 100);
    drawQRLabel(label, x, y + 106);
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

// 保存
function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
