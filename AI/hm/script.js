(function(){
  // 初期ペア(\u エスケープで文字を厳密に指定)
  var DEFAULT_PAIRS = [
    ["\u4E00","\u30FC"], 
    ["\u4E8C","\u30CB"], 
    ["\u30BF","\u5915"], 
    ["\u30A8","\u5DE5"], 
    ["\u30ED","\u53E3"], 
    ["\u30C8","\u535C"],
    ["\u3078","\u30D8"],
    ["\u30AB","\u529B"],
    ["\u30e0","\u53b6"],
    ["a","\u0430"],
    ["A","\u0391"],
    ["B","\u0392"],
    ["E","\u0395"],
    ["Z","\u0396"],
    ["H","\u0397"],
    ["I","\u0399"],
    ["K","\u039A"],
    ["M","\u039C"],
    ["N","\u039D"],
    ["O","\u039F"],
    ["P","\u03A1"],
    ["T","\u03A4"],
    ["X","\u03A7"],
    ["o","\u03BF"],
    ["V","\u2164"],
    ["e","\u0435"],
    ["p","\u0440"],
    ["y","\u0443"],
    ["x","\u0445"],
    ["s","\u0455"],
    ["i","\u0456"],
    ["o","\u043E"],
    ["Y","\u04AE"],
    ["Y","\u04AE"],
  ];
  var DEFAULT_PAIRS_V2 = [
["\u4E00","\u30FC"], 
    ["\u4E8C","\u30CB"], 
    ["\u30BF","\u5915"], 
    ["\u30A8","\u5DE5"], 
    ["\u30ED","\u53E3"], 
    ["\u30C8","\u535C"],
    ["\u3078","\u30D8"],
    ["\u30AB","\u529B"],
    ["\u30e0","\u53b6"],
    ["a","\u0430"],
    ["A","\u0391"],
    ["B","\u0392"],
    ["E","\u0395"],
    ["Z","\u0396"],
    ["H","\u0397"],
    ["I","\u0399"],
    ["K","\u039A"],
    ["M","\u039C"],
    ["N","\u039D"],
    ["O","\u039F"],
    ["P","\u03A1"],
    ["T","\u03A4"],
    ["X","\u03A7"],
    ["o","\u03BF"],
    ["V","\u2164"],
    ["e","\u0435"],
    ["p","\u0440"],
    ["y","\u0443"],
    ["x","\u0445"],
    ["s","\u0455"],
    ["i","\u0456"],
    ["o","\u043E"],
    ["Y","\u04AE"],
    ["Y","\u04AE"],

    ["h","\u04BB"],
    ["G","\u050C"],
    ["Ԛ","\u051A"],
    ["q","\u051B"],
    ["W","\u051C"],
    ["w","\u051D"],
    ["d","\u0501"],
    ["I","\u04CF"],
    ["I","\u04C0"],
  ];
  var KEY = "charSwapPairs";
  var pairs = load();
  var hm_count = 0;

  var $in = document.getElementById("in");
  var $out = document.getElementById("out");
  var $status = document.getElementById("status");
  var $list = document.getElementById("pairs");
  var $pa = document.getElementById("pa");
  var $pb = document.getElementById("pb");
  var $msg = document.getElementById("addMsg");
  var $hm = document.getElementById("hm_alpha");

  function load(){
    try{
      var raw = localStorage.getItem(KEY);
      if(raw){
        var p = JSON.parse(raw);
        if(Array.isArray(p) && p.length) return p;
      }
    }catch(e){}
    return DEFAULT_PAIRS.map(function(p){return p.slice();});
  }
  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(pairs)); }catch(e){}
  }

  function cp(ch){
    return "U+" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4,"0");
  }

  function buildMap(){
    var m = new Map();
    pairs.forEach(function(p){
      m.set(p[0], p[1]);
      m.set(p[1], p[0]);
    });
    return m;
  }

  function convert(){
    var map = buildMap();
    var text = $in.value;
    hm_count = 0;
    if(!text){
      $out.textContent = "ここに結果が表示されます";
      $out.classList.add("empty");
      return;
    }
    var res = Array.from(text).map(function(c){
      if(map.has(c)){
        var rt = map.get(c);
        if(/^[a-zA-Z]$/.test(rt)){
          hm_count++;
        }
        return rt;
      }else{
        return c;
      }
    }).join("");
    $out.textContent = res;
    $out.classList.remove("empty");
    $hm.innerText = hm_count;
  }

  function renderPairs(){
    $list.innerHTML = "";
    pairs.forEach(function(p, i){
      var li = document.createElement("li");
      li.innerHTML = '<span class="ch"></span><span>⇄</span><span class="ch"></span><span class="code"></span>';
      var chs = li.querySelectorAll(".ch");
      chs[0].textContent = p[0];
      chs[1].textContent = p[1];
      li.querySelector(".code").textContent = cp(p[0]) + " ⇄ " + cp(p[1]);
      var b = document.createElement("button");
      b.className = "del";
      b.textContent = "削除";
      b.addEventListener("click", function(){
        pairs.splice(i,1);
        save(); renderPairs(); convert();
      });
      li.appendChild(b);
      $list.appendChild(li);
    });
  }

  function copyText(t){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(t).catch(function(){ return fallbackCopy(t); });
    }
    return fallbackCopy(t);
  }
  function fallbackCopy(t){
    return new Promise(function(resolve, reject){
      var ta = document.createElement("textarea");
      ta.value = t;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try{ ok = document.execCommand("copy"); }catch(e){}
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  var timer;
  function doCopy(){
    if($out.classList.contains("empty")) return;
    copyText($out.textContent).then(function(){
      $status.textContent = "コピーしました";
    }).catch(function(){
      $status.textContent = "コピーに失敗しました。テキストを選択して手動でコピーしてください。";
    }).then(function(){
      clearTimeout(timer);
      timer = setTimeout(function(){ $status.textContent = ""; }, 2000);
    });
  }

  $out.addEventListener("click", doCopy);
  $out.addEventListener("keydown", function(e){
    if(e.key === "Enter" || e.key === " "){ e.preventDefault(); doCopy(); }
  });
  $in.addEventListener("input", convert);

  document.getElementById("addBtn").addEventListener("click", function(){
    var a = Array.from($pa.value.trim());
    var b = Array.from($pb.value.trim());
    if(a.length !== 1 || b.length !== 1){
      $msg.textContent = "それぞれ1文字ずつ入力してください。"; return;
    }
    if(a[0] === b[0]){
      $msg.textContent = "同じ文字同士は追加できません。"; return;
    }
    var dup = pairs.some(function(p){
      return (p[0]===a[0] && p[1]===b[0]) || (p[0]===b[0] && p[1]===a[0]);
    });
    if(dup){ $msg.textContent = "そのペアは既に登録されています。"; return; }
    pairs.push([a[0], b[0]]);
    save(); renderPairs(); convert();
    $pa.value = ""; $pb.value = "";
    $msg.textContent = "追加しました: " + a[0] + " ⇄ " + b[0];
  });

  document.getElementById("resetBtn").addEventListener("click", function(){
    pairs = DEFAULT_PAIRS.map(function(p){return p.slice();});
    save(); renderPairs(); convert();
    $msg.textContent = "初期ペアに戻しました。";
  });

  document.getElementById("resetBtn2").addEventListener("click", function(){
    pairs = DEFAULT_PAIRS_V2.map(function(p){return p.slice();});
    save(); renderPairs(); convert();
    $msg.textContent = "初期ペア+に設定しました。";
  });

  renderPairs();
  convert();
})();