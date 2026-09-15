const startButton = document.getElementById("startButton");
const diagnoseButton = document.getElementById("diagnoseButton");
const retryButton = document.getElementById("retryButton");
const finalButton = document.getElementById("finalButton");
const shareButton = document.getElementById("shareButton");

const nameInput = document.getElementById("nameInput");
const diagnosis = document.getElementById("diagnosis");
const resultSection = document.getElementById("resultSection");
const loading = document.getElementById("loading");

const loadingText = document.getElementById("loadingText");

const resultName = document.getElementById("resultName");
const resultTitle = document.getElementById("resultTitle");
const resultIcon = document.getElementById("resultIcon");
const resultText = document.getElementById("resultText");
const resultNumber = document.getElementById("resultNumber");

const scoreNumber = document.getElementById("scoreNumber");
const scoreBar = document.getElementById("scoreBar");
const traits = document.getElementById("traits");


/* =========================
   診断データ
========================= */

const results = [
    {
        icon: "🧪",
        title: "謎の才能を持つ人",
        text: "本人は普通だと思っていますが、なぜか人の記憶に残ります。投稿内容よりも「この人なんか面白いな」と思われるタイプです。",
        traits: ["謎の存在感", "記憶に残る", "独自路線"]
    },
    {
        icon: "🗿",
        title: "インターネットの住人",
        text: "ネット上にかなり長く存在しているような雰囲気があります。初対面なのに「昔から知っている気がする」と思われがちです。",
        traits: ["ネット適性◎", "古参感", "謎の安心感"]
    },
    {
        icon: "👁️",
        title: "静かに見ている人",
        text: "あまり喋らなくても存在感があります。実は周囲から「何を考えているのか気になる」と思われている可能性があります。",
        traits: ["観察力", "無言の圧", "ミステリアス"]
    },
    {
        icon: "🧠",
        title: "考えすぎる人",
        text: "投稿する前に文章を何度も読み返すタイプ。慎重さは長所ですが、考えている間に投稿タイミングを逃しているかもしれません。",
        traits: ["慎重派", "深読み", "文章力"]
    },
    {
        icon: "🔥",
        title: "突然すごいことをする人",
        text: "普段は普通なのに、突然とんでもないものを投稿するタイプ。その落差によって妙に注目されます。",
        traits: ["ギャップ", "爆発力", "予測不能"]
    },
    {
        icon: "🐈",
        title: "なぜか許される人",
        text: "多少変なことをしても「まあ、この人なら……」で済まされる謎の能力があります。これはかなり強いです。",
        traits: ["愛され属性", "自由人", "謎の信頼"]
    },
    {
        icon: "📡",
        title: "情報を集めすぎる人",
        text: "興味を持ったものについて調べ始めると止まりません。気づいたら他人より妙に詳しくなっています。",
        traits: ["情報収集", "探究心", "深掘り"]
    },
    {
        icon: "🎲",
        title: "何をするか分からない人",
        text: "次に何を投稿するのか予測できません。その不安定さが逆に魅力になっています。",
        traits: ["予測不能", "自由", "レアキャラ"]
    }
];


const loadingMessages = [
    "インターネット上の行動を解析中……",
    "謎のデータベースに接続中……",
    "それっぽい結果を生成中……",
    "あなたの雰囲気を数値化中……",
    "もう少しだけお待ちください……"
];


/* =========================
   スクロール
========================= */

startButton.addEventListener("click", () => {
    diagnosis.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        nameInput.focus();
    }, 700);
});


/* =========================
   診断
========================= */

function random(max) {
    return Math.floor(Math.random() * max);
}


function calculateScore(name) {

    let value = 0;

    for (let i = 0; i < name.length; i++) {
        value += name.charCodeAt(i) * (i + 1);
    }

    value += Date.now();

    return 50 + (Math.abs(value) % 51);
}


function diagnose() {

    let name = nameInput.value.trim();

    if (!name) {
        name = "名無し";
    }

    diagnosis.classList.add("hidden");
    loading.classList.remove("hidden");

    let messageIndex = 0;

    loadingText.textContent = loadingMessages[0];

    const messageTimer = setInterval(() => {

        messageIndex++;

        if (messageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[messageIndex];
        }

    }, 550);


    setTimeout(() => {

        clearInterval(messageTimer);

        const result = results[random(results.length)];
        const score = calculateScore(name);

        resultName.textContent = `「${name}」さんの診断結果`;

        resultTitle.textContent = result.title;
        resultIcon.textContent = result.icon;

        resultText.textContent = result.text;

        resultNumber.textContent =
            "No." +
            String(random(999)).padStart(3, "0");

        scoreNumber.textContent = score;

        scoreBar.style.width = "0%";

        traits.innerHTML = "";

        result.traits.forEach(trait => {

            const element = document.createElement("span");

            element.className = "trait";
            element.textContent = "#" + trait;

            traits.appendChild(element);
        });


        loading.classList.add("hidden");

        resultSection.classList.remove("hidden");

        resultSection.scrollIntoView({
            behavior: "smooth"
        });


        setTimeout(() => {
            scoreBar.style.width = score + "%";
        }, 300);

    }, 2700);
}


/* =========================
   ボタン
========================= */

diagnoseButton.addEventListener("click", diagnose);

nameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        diagnose();
    }

});


retryButton.addEventListener("click", () => {

    resultSection.classList.add("hidden");
    diagnosis.classList.remove("hidden");

    diagnosis.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        nameInput.focus();
    }, 600);

});


finalButton.addEventListener("click", () => {

    diagnosis.classList.remove("hidden");
    resultSection.classList.add("hidden");

    diagnosis.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        nameInput.focus();
    }, 600);

});


/* =========================
   SNS共有
========================= */

shareButton.addEventListener("click", async () => {

    const name = resultName.textContent;
    const title = resultTitle.textContent;
    const score = scoreNumber.textContent;

    const shareText =
        `${name}\n` +
        `診断結果：${title}\n` +
        `謎の好感度：${score}/100\n\n` +
        `あなたも診断してみてください。`;

    if (navigator.share) {

        try {

            await navigator.share({
                title: "あなたのネット上の印象診断",
                text: shareText,
                url: location.href
            });

        } catch (error) {
            // ユーザーが共有画面を閉じた場合などは何もしない
        }

    } else {

        try {

            await navigator.clipboard.writeText(
                shareText + "\n" + location.href
            );

            shareButton.textContent =
                "結果をコピーしました！";

            setTimeout(() => {
                shareButton.textContent =
                    "結果をSNSで共有する";
            }, 1800);

        } catch (error) {

            alert(
                "共有できませんでした。結果をスクリーンショットしてSNSに投稿してみてください。"
            );

        }

    }

});