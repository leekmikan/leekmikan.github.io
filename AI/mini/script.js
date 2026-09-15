const startButton =
    document.getElementById("startButton");

const diagnoseButton =
    document.getElementById("diagnoseButton");

const retryButton =
    document.getElementById("retryButton");

const finalButton =
    document.getElementById("finalButton");

const friendButton =
    document.getElementById("friendButton");

const shareButton =
    document.getElementById("shareButton");

const copyButton =
    document.getElementById("copyButton");


const nameInput =
    document.getElementById("nameInput");

const diagnosis =
    document.getElementById("diagnosis");

const resultSection =
    document.getElementById("resultSection");

const loading =
    document.getElementById("loading");

const loadingText =
    document.getElementById("loadingText");


const resultName =
    document.getElementById("resultName");

const resultTitle =
    document.getElementById("resultTitle");

const resultIcon =
    document.getElementById("resultIcon");

const resultText =
    document.getElementById("resultText");

const resultNumber =
    document.getElementById("resultNumber");

const scoreNumber =
    document.getElementById("scoreNumber");

const scoreBar =
    document.getElementById("scoreBar");

const traits =
    document.getElementById("traits");

const rareBadge =
    document.getElementById("rareBadge");


/* =========================
   診断データ
========================= */

const results = [

    {
        icon: "🧪",
        title: "謎の才能を持つ人",

        text:
            "本人は普通だと思っていますが、なぜか人の記憶に残ります。投稿内容よりも「この人なんか面白いな」と思われるタイプです。",

        traits:
            ["謎の存在感", "記憶に残る", "独自路線"]
    },

    {
        icon: "🗿",
        title: "インターネットの住人",

        text:
            "ネット上にかなり長く存在しているような雰囲気があります。初対面なのに「昔から知っている気がする」と思われがちです。",

        traits:
            ["ネット適性◎", "古参感", "謎の安心感"]
    },

    {
        icon: "👁️",
        title: "静かに見ている人",

        text:
            "あまり喋らなくても存在感があります。実は周囲から「何を考えているのか気になる」と思われている可能性があります。",

        traits:
            ["観察力", "無言の圧", "ミステリアス"]
    },

    {
        icon: "🧠",
        title: "考えすぎる人",

        text:
            "投稿する前に文章を何度も読み返すタイプ。慎重さは長所ですが、考えている間に投稿タイミングを逃しているかもしれません。",

        traits:
            ["慎重派", "深読み", "文章力"]
    },

    {
        icon: "🔥",
        title: "突然すごいことをする人",

        text:
            "普段は普通なのに、突然とんでもないものを投稿するタイプ。その落差によって妙に注目されます。",

        traits:
            ["ギャップ", "爆発力", "予測不能"]
    },

    {
        icon: "🐈",
        title: "なぜか許される人",

        text:
            "多少変なことをしても「まあ、この人なら……」で済まされる謎の能力があります。これはかなり強いです。",

        traits:
            ["愛され属性", "自由人", "謎の信頼"]
    },

    {
        icon: "📡",
        title: "情報を集めすぎる人",

        text:
            "興味を持ったものについて調べ始めると止まりません。気づいたら他人より妙に詳しくなっています。",

        traits:
            ["情報収集", "探究心", "深掘り"]
    },

    {
        icon: "🎲",
        title: "何をするか分からない人",

        text:
            "次に何を投稿するのか予測できません。その不安定さが逆に魅力になっています。",

        traits:
            ["予測不能", "自由", "レアキャラ"]
    },

    {
        icon: "🥤",
        title: "TLの清涼飲料水",

        text:
            "タイムラインにいるとなんとなく安心します。濃すぎず薄すぎず、しかしいなくなると少し寂しい。そんな存在です。",

        traits:
            ["爽やか", "安心感", "TL適性"]
    },

    {
        icon: "🌙",
        title: "深夜3時のポエム投稿者",

        text:
            "昼間は普通なのに、深夜になると急に意味深なことを言い始める可能性があります。",

        traits:
            ["夜型", "意味深", "情緒"]
    },

    {
        icon: "👑",
        title: "TLの王",

        text:
            "あなたの投稿には妙な説得力があります。根拠がなくても「まあ、そういうことなんだろう」と思わせる力があります。",

        traits:
            ["カリスマ", "謎の説得力", "王"]
    },

    {
        icon: "🕵️",
        title: "裏で世界を操る黒幕",

        text:
            "表では何もしていないように見えますが、実は全て計画通り……という設定です。本人にはその自覚がありません。",

        traits:
            ["黒幕", "計画性", "たぶん無関係"]
    },

    {
        icon: "📚",
        title: "謎に詳しい人",

        text:
            "なぜそんなことを知っているのか、と周囲から思われるタイプです。本人にとっては普通の知識だったりします。",

        traits:
            ["雑学", "専門知識", "深掘り"]
    },

    {
        icon: "💥",
        title: "投稿がだいたい事件",

        text:
            "普通の投稿をしているつもりなのに、なぜか毎回ちょっとした事件になります。才能なのか事故なのかは不明です。",

        traits:
            ["事件性", "話題性", "事故率"]
    },

    {
        icon: "🧙",
        title: "ネットの魔法使い",

        text:
            "よく分からない技術や知識を持っています。説明を求められると、さらによく分からない説明が返ってきます。",

        traits:
            ["技術力", "謎知識", "魔法"]
    },

    {
        icon: "🫥",
        title: "存在しているのに幻",

        text:
            "アカウントは確かに存在しています。しかし気づいたら投稿していて、気づいたら消えています。",

        traits:
            ["ステルス", "低浮上", "幻"]
    },

    {
        icon: "🧃",
        title: "謎のジュース",

        text:
            "何味なのか最後まで分かりません。でもなぜか一度飲んだ人はもう一度飲みたくなります。",

        traits:
            ["謎", "中毒性", "説明不能"]
    },

    {
        icon: "🦆",
        title: "ネット上のアヒル",

        text:
            "特に理由はありません。診断プログラムがあなたをアヒルだと判断しました。",

        traits:
            ["アヒル", "かわいい", "理由なし"]
    },

    {
        icon: "🚨",
        title: "危険人物（※たぶん違う）",

        text:
            "診断結果だけを見るとかなり危険です。しかし具体的に何が危険なのかは誰にも分かりません。",

        traits:
            ["要注意", "謎", "たぶん安全"]
    },

    {
        icon: "🌌",
        title: "インターネットそのもの",

        text:
            "あなたはもうネットを利用しているのではありません。ネットの一部です。",

        traits:
            ["概念", "ネット", "人類卒業"]
    }

];


/* =========================
   レア結果
========================= */

const rareResults = [

    {
        icon: "🪐",
        title: "インターネットの神",

        text:
            "おめでとうございます。診断システムが処理を諦めました。あなたはもはや診断する側です。",

        traits:
            ["超レア", "神", "処理不能"]
    },

    {
        icon: "💀",
        title: "存在してはいけない結果",

        text:
            "本来この結果は存在しないはずでした。なぜ表示されたのかは分かりません。",

        traits:
            ["ERROR", "極レア", "何これ"]
    }

];


/* =========================
   ローディング
========================= */

const loadingMessages = [

    "インターネット上の行動を解析中……",

    "謎のデータベースに接続中……",

    "あなたの雰囲気を数値化中……",

    "過去の投稿を勝手に想像中……",

    "それっぽい結果を生成中……",

    "あと少し……"
];


/* =========================
   共通
========================= */

function random(max) {

    return Math.floor(
        Math.random() * max
    );
}


/* =========================
   好感度
========================= */

function calculateScore(name) {

    let value = 0;

    for (let i = 0; i < name.length; i++) {

        value +=
            name.charCodeAt(i) *
            (i + 1);
    }

    value +=
        Date.now() +
        random(100000);

    /*
        通常は -50 ～ 1000
    */

    return (
        Math.abs(value) % 1051
    ) - 50;
}


/* =========================
   診断
========================= */

function diagnose() {

    let name =
        nameInput.value.trim();

    if (!name) {
        name = "名無し";
    }


    diagnosis.classList.add("hidden");

    resultSection.classList.add("hidden");

    loading.classList.remove("hidden");


    let messageIndex = 0;

    loadingText.textContent =
        loadingMessages[0];


    const messageTimer =
        setInterval(() => {

            messageIndex++;

            if (
                messageIndex <
                loadingMessages.length
            ) {

                loadingText.textContent =
                    loadingMessages[
                        messageIndex
                    ];
            }

        }, 450);


    setTimeout(() => {

        clearInterval(messageTimer);


        /*
            3%の確率でレア結果
        */

        const isRare =
            Math.random() < 0.03;


        const result =
            isRare
                ? rareResults[
                    random(
                        rareResults.length
                    )
                ]
                : results[
                    random(results.length)
                ];


        let score =
            calculateScore(name);


        /*
            レア結果なら極端な数値
        */

        if (isRare) {

            score =
                random(2) === 0
                    ? 999
                    : -50;
        }


        resultName.textContent =
            `「${name}」さんの診断結果`;


        resultTitle.textContent =
            result.title;


        resultIcon.textContent =
            result.icon;


        resultText.textContent =
            result.text;


        resultNumber.textContent =
            "No." +
            String(
                random(9999)
            ).padStart(4, "0");


        scoreNumber.textContent =
            score;


        /*
            好感度バー
        */

        let barScore =
            Math.max(
                0,
                Math.min(
                    100,
                    score
                )
            );

        scoreBar.style.width =
            "0%";


        /*
            レア表示
        */

        if (isRare) {

            rareBadge.classList.remove(
                "hidden"
            );

        } else {

            rareBadge.classList.add(
                "hidden"
            );
        }


        /*
            タグ
        */

        traits.innerHTML = "";


        result.traits.forEach(
            trait => {

                const element =
                    document.createElement(
                        "span"
                    );

                element.className =
                    "trait";

                element.textContent =
                    "#" + trait;

                traits.appendChild(
                    element
                );
            }
        );


        loading.classList.add(
            "hidden"
        );


        resultSection.classList.remove(
            "hidden"
        );


        resultSection.scrollIntoView({
            behavior: "smooth"
        });


        setTimeout(() => {

            scoreBar.style.width =
                barScore + "%";

        }, 300);


    }, 2800);
}


/* =========================
   診断開始
========================= */

startButton.addEventListener(
    "click",
    () => {

        diagnosis.scrollIntoView({
            behavior: "smooth"
        });

        setTimeout(() => {

            nameInput.focus();

        }, 700);

    }
);


/* =========================
   ボタン
========================= */

diagnoseButton.addEventListener(
    "click",
    diagnose
);


nameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            diagnose();

        }

    }
);


/* =========================
   再診断
========================= */

function resetDiagnosis() {

    resultSection.classList.add(
        "hidden"
    );

    diagnosis.classList.remove(
        "hidden"
    );

    diagnosis.scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {

        nameInput.focus();

    }, 600);
}


retryButton.addEventListener(
    "click",
    resetDiagnosis
);


finalButton.addEventListener(
    "click",
    resetDiagnosis
);


friendButton.addEventListener(
    "click",
    resetDiagnosis
);


/* =========================
   Xシェア
========================= */

shareButton.addEventListener(
    "click",
    () => {

        const name =
            resultName.textContent;

        const title =
            resultTitle.textContent;

        const score =
            scoreNumber.textContent;


        const shareText =
            `【あなたのネット上の印象診断】\n\n` +
            `${name}の印象は……\n` +
            `『${title}』でした！\n\n` +
            `謎の好感度：${score}%\n\n` +
            `#ネットの印象診断 #謎診断`;


        const xUrl =
            "https://twitter.com/intent/tweet" +
            "?text=" +
            encodeURIComponent(
                shareText
            ) +
            "&url=" +
            encodeURIComponent(
                location.href
            );


        window.open(
            xUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* =========================
   結果コピー
========================= */

copyButton.addEventListener(
    "click",
    async () => {

        const text =

            `${resultName.textContent}\n` +

            `『${resultTitle.textContent}』\n` +

            `謎の好感度：${scoreNumber.textContent}%\n\n` +

            `#ネットの印象診断 #謎診断\n` +

            location.href;


        try {

            await navigator.clipboard.writeText(
                text
            );

            copyButton.textContent =
                "✓ コピーしました！";


            setTimeout(() => {

                copyButton.textContent =
                    "結果をコピーする";

            }, 1800);

        } catch (error) {

            alert(
                "コピーできませんでした。"
            );

        }

    }
);