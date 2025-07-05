const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

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
  // 入力取得
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

  const bgImage = new Image();
  const selectedBG = document.getElementById("background-selector").value;
  bgImage.src = "" + selectedBG;

  bgImage.onload = () => {
    // 背景描画
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "20px Meiryo";
    ctx.fillStyle = "#ffffff";

    let y = 50;
    const lineHeight = 30;

    // 文字列描画
    ctx.fillText("名前: " + name, 30, y); y += lineHeight;
    ctx.fillText("好きな選手: " + favoritePlayer, 30, y); y += lineHeight;
    ctx.fillText("ハンナリーズで好きな人: " + favoritePerson, 30, y); y += lineHeight;
    ctx.fillText("好きなアリーナ飯: " + arenaFood, 30, y); y += lineHeight;
    ctx.fillText("ハンナリーズ歴: " + years + "年", 30, y); y += lineHeight;
    ctx.fillText("好きな座席: " + favoriteSeat, 30, y); y += lineHeight;

    y += 10;
    wrapText("京都を好きになったきっかけ: " + kyotoReason, 30, y); y += lineHeight * 3;
    wrapText("選手を好きになったきっかけ: " + playerReason, 30, y); y += lineHeight * 3;
    wrapText("フリースペース: " + freeSpace, 30, y); y += lineHeight * 3;

    // QRコード描画
    if (xUrl) drawQR(xUrl, 400, canvas.height - 130); // 右下に配置
    if (instaUrl) drawQR(instaUrl, 500, canvas.height - 130);

    // 自由画像
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

// テキストを折り返して描画
function wrapText(text, x, y) {
  const maxWidth = 540;
  const lineHeight = 24;
  const words = text.split(/(\s+|。|、|，|．|・|\/)/);
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function drawQR(text, x, y) {
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
  };

  // 画像がすでに生成済みの場合
  if (qrImg.complete) {
    ctx.drawImage(qrImg, x, y, 80, 80);
  }
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
