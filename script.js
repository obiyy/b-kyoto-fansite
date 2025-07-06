// ハンバーガーメニューのトグル
document.addEventListener('DOMContentLoaded', function() {
  alert("ファンサイトへようこそ");
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  toggleBtn.addEventListener('click', function() {
    alert("ファンサイトへようこそ");
    navMenu.classList.toggle('show');
  });
});