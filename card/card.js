const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

// 画像アップロード
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

  const selectedBG = document.getElementById("background-selector").value;
  const bgImage = new Image();
  bgImage.src = "" + selectedBG;

  bgImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px Meiryo";
    ctx.textBaseline = "top";
    ctx.textAlign = "start";

    let y = 30;
    const lineGap = 36;

    drawTextWithBackground("名前: " + name, 30, y); y += lineGap;
    drawTextWithBackground("好きな選手: " + favoritePlayer, 30, y); y += lineGap;
    drawTextWithBackground("ハンナリーズで好きな人: " + favoritePerson, 30, y); y += lineGap;
    drawTextWithBackground("好きなアリーナ飯: " + arenaFood, 30, y); y += lineGap;
    drawTextWithBackground("ハンナリーズ歴: " + years + "年", 30, y); y += lineGap;
    drawTextWithBackground("好きな座席: " + favoriteSeat, 30, y); y += lineGap;

    y += 10;
    drawMultilineTextWithBackground("京都を好きになったきっかけ: " + kyotoReason, 30, y); y += lineGap * 3;
    drawMultilineTextWithBackground("選手を好きになったきっかけ: " + playerReason, 30, y); y += lineGap * 3;
    drawMultilineTextWithBackground("フリースペース: " + freeSpace, 30, y); y += lineGap * 3;

    // QRコード＋ラベル
    if (xUrl) drawQR(xUrl, 400, canvas.height - 130, "X");
    if (instaUrl) drawQR(instaUrl, 500, canvas.height - 130, "Instagram");

    // アップロード画像
    if (uploadedImage) {
      uploadedImage.onload = () => {
        ctx.drawImage(uploadedImage, 400, 30, 160, 160);
      };
      if (uploadedImage.complete) {
        ctx.drawImage(uploadedImage, 400, 30, 160, 160);
      }
    }
  };
}

// テキスト＋背景（1行用）
function drawTextWithBackground(text, x, y) {
  const padding = 6;
  const textMetrics = ctx.measureText(text);
  const width = textMetrics.width + padding * 2;
  const height = 28;

  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x - padding, y - 2, width, height);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, x, y);
}

// テキスト＋背景（複数行用）
function drawMultilineTextWithBackground(text, x, y) {
  const maxWidth = 540;
  const lineHeight = 28;
  const padding = 6;
  const words = text.split(/(\s+|。|、|，|．|・|\/)/);
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth && n > 0) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#000000";
      ctx.fillRect(x - padding, y - 2, ctx.measureText(line).width + padding * 2, lineHeight);
      ctx.globalAlpha = 1.0;

      ctx.fillStyle = "#ffffff";
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  // 最後の行
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x - padding, y - 2, ctx.measureText(line).width + padding * 2, lineHeight);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#ffffff";
  ctx.fillText(line, x, y);
}

// QRコード生成＋ラベル付き描画
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
    ctx.drawImage(qrImg, x, y, 80, 80);
    drawQRLabel(label, x, y + 85);
  };

  if (qrImg.complete) {
    ctx.drawImage(qrImg, x, y, 80, 80);
    drawQRLabel(label, x, y + 85);
  }
}

// QRラベル描画
function drawQRLabel(label, x, y) {
  const fontSize = 16;
  ctx.font = `${fontSize}px Meiryo`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const textWidth = ctx.measureText(label).width;
  const padding = 4;

  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#000000";
  ctx.fillRect(x + 40 - textWidth / 2 - padding, y - 2, textWidth + padding * 2, fontSize + 6);
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, x + 40, y);
  ctx.textAlign = "start";
}

// 画像保存
function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
