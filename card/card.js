const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");
let uploadedImage = null;

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
  const hobby = document.getElementById("hobby").value;
  const message = document.getElementById("message").value;
  const bgImage = new Image();
  const selectedBG = document.getElementById("background-selector").value;
  bgImage.src = "card/" + selectedBG;
  alert(bgImage.src);

  bgImage.onload = () => {
    alert("3");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    // テキスト
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("名前: " + name, 30, 50);
    ctx.fillText("趣味: " + hobby, 30, 90);
    ctx.fillText("一言: " + message, 30, 130);

    // 任意画像を追加
    if (uploadedImage) {
      ctx.drawImage(uploadedImage, 400, 20, 150, 150);
    }

    // SNS QR生成
    const xUrl = document.getElementById("x-url").value;
    const instaUrl = document.getElementById("insta-url").value;

    if (xUrl) drawQR(xUrl, 30, 280);
    if (instaUrl) drawQR(instaUrl, 150, 280);
  };
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
    ctx.drawImage(qrImg, x, y, 100, 100);
  };
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "自己紹介カード.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
