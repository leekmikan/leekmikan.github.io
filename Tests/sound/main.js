let wh = 0;
let fps = 0;
let sample = 0;
let start = false;
let tm = 0;
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const ctx = new AudioContext();
const gain = ctx.createGain();
gain.value = 0.5;
gain.connect(ctx.destination);
window.addEventListener('load', function(){
    opt();
    start = true;
});
function init(){
    //videoのstream
    let stream = null;
    //video設定値
    const constraints = {
        audio: false,
        video: {
            width: wh,
            height: wh,
            //フロントカメラの場合
            //facingMode: 'user',
            //リアカメラの場合
            facingMode: { exact: "environment" },
        },
    }
    //カメラ起動
    async function startCamera(constraints) {
        try {
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
            };
        } catch (err) {
            //エラーハンドリング
            console.error(err);
        }
    }
    //初期処理
    startCamera(constraints);
}
function opt(){
    sample = Number(document.getElementById("sp").value);
    fps = Number(document.getElementById("fps").value);
    wh = Math.ceil(Math.sqrt(sample / fps));
    document.getElementById("canvas").width = wh;
    document.getElementById("canvas").height = wh;
    init();
}
window.onclick = function(){
    makewave();
    makewave();
    document.getElementById("main").style.display = "block";
    document.getElementById("sub").style.display = "none";
}
function makewave(){
    if(start){
        const video = document.getElementById('video');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        const audioBuffer = ctx.createBuffer(2,wh * wh * 3,sample);
        const wave = audioBuffer.getChannelData(0);
        const wave2 = audioBuffer.getChannelData(1);
        let j = 0;
        for (let i = 0; i < data.length; i++) {
            if(i % 4 != 3){
                if(j % 2 == 0){
                    wave[Math.floor(j / 2)] = data[i] / 128 - 1;
                }else{
                    wave2[Math.floor(j / 2)] = data[i] / 128 - 1;
                }
                j++;
            }
        }
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.onended = makewave;
        source.connect(gain);
        source.start(tm);
        tm += 3 * wh * wh / 2 / sample / 1.001;
    }
}