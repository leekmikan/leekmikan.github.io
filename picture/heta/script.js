document.addEventListener('DOMContentLoaded', () => {
  const bgmSelect = document.getElementById('bgmSelect');
  const playBtn = document.getElementById('playBtn');
  const stopBtn = document.getElementById('stopBtn');
  const audioPlayer = document.getElementById('audioPlayer');

  // ループ再生を有効化
  audioPlayer.loop = true;

  // 曲を変更したときの処理
  bgmSelect.addEventListener('change', () => {
    const selectedSrc = bgmSelect.value;
    if (selectedSrc) {
      audioPlayer.src = selectedSrc;
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });

  // 再生ボタン
  playBtn.addEventListener('click', () => {
    if (audioPlayer.src && bgmSelect.value !== "") {
      audioPlayer.play();
    } else {
      alert("曲をえらんでから押してね！");
    }
  });

  // 停止ボタン
  stopBtn.addEventListener('click', () => {
    audioPlayer.pause();
  });
});