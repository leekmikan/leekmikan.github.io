function Mexport(){
	let acv = [];
	for(let i = 0;i < 16;i++){
		if(document.getElementById("p" + i).checked){
			acv.push(i);
		}
	}
	pt_adj = Number(document.getElementById("pitch").value);
	sf_adj = Number(document.getElementById("scale").value);
	b_vol = Number(document.getElementById("vol").value);
	all_tone = Number(document.getElementById("ins").value) + 1;
	all_tone = (all_tone == 0) ? -1 : all_tone;
	sp = Number(document.getElementById("speed").value);
	if(sel == scale.length - 1){
		for(let i = 0;i < 12;i++){
			israndom[i] = document.getElementById("mo" + i).checked ? true : false;
			scale[sel][i] = Number(document.getElementById("num" + i).value);
		}
	}else{
		for(let i = 0;i < 12;i++){
			israndom[i] = false;
		}
	}
	Read();
	if(acv.length == 0){
		acv = null;
	}
	Export(acv);
}
var scale = [
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1 ],
	[ 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 1 ],
	[ 0, 0, 0, 0, -1, 0, 0, 2, 0, -1, 0, 1 ],
	[ 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
	[ 0, 0, 2, 0, -1, 0, 0, 0, 0, 2, 0, -1 ],
	[ 0, 0, -1, 0, 2, 0, 0, -1, 0, 1, 0, -1 ],
	[ 0, 0, 0, 0, -1, 1, 0, 0, 0, -1, 0, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1 ],
	[ 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, -1 ],
	[ 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0 ],
	[ 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1 ],
	[ 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ],
	[ 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, -1, 0, -1, 0, 0, 0, 0, -1, 0, -1 ],
	[ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, -1, 0, -1, 0, 0, -1, 0, -1, 0, -1 ],
	[ 0, 0, -1, 0, -1, 0, 0, -1, 0, 0, 0, -1 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0 ],
	[ 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, -1, 0, 0, 0, 0, 0, 0, -1, 0, -1 ],
	[ 0, 0, 0, 0, -1, 1, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, -1, 0, -1, -1, 0, -1, 0, -1, 0, -2 ],
	[ 0, 0, -1, 0, -1, 0, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0 ],
	[ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, 0, 0, -1, 0, 0, -1, 0, -1, 0, -1 ],
	[ 0, 0, -1, 0, -1, -1, 0, -1, 0, -1, 0, -1 ],
	[ 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0 ],
	[ 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, -1 ],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
];
var israndom = [false,false,false,false,false,false,false,false,false,false,false,false];
function change_s(i){
	sel = i;
	conf_tones = scale[i];
	document.getElementById("sc").innerText = document.getElementById("scb").getElementsByTagName("button")[i].innerText;
	Cname();
}
let sel = 0;
const ins_name =[
"指定なし",
"Acoustic Grand Piano	アコースティック・グランド・ピアノ",
"Bright Acoustic Piano	ブライト・アコースティック・ピアノ",
"Electric Grand Piano	エレクトリック・グランド・ピアノ",
"Honky-tonk Piano	ホンキー・トンク・ピアノ",
"Electric Piano 1	エレクトリック・ピアノ1",
"Electric Piano 2	エレクトリック・ピアノ2",
"Harpsichord	ハープシコード",
"Clavi	クラビ",
"Celesta	チェレスタ",
"Glockenspiel	グロッケン",
"Music box	ミュージック・ボックス（オルゴール）",
"Vibraphone	ビブラフォン",
"Marimba	マリンバ",
"Xylophone	シロフォン",
"Tubular Bells	チューブラ・ベル",
"Dulcimer	ダルシマー",
"Drawbar Organ	ドローバー・オルガン",
"Percussive Organ	パーカッシブ・オルガン",
"Rock Organ	ロック・オルガン",
"Church organ	チャーチ・オルガン",
"Reed organ	リード・オルガン",
"Accordion	アコーディオン",
"Harmonica	ハーモニカ",
"Tango Accordion	タンゴ・アコーディオン",
"Acoustic Guitar (nylon)	アコースティック・ギター（ナイロン）",
"Acoustic Guitar (steel)	アコースティック・ギター（スティール）",
"Electric Guitar (jazz)	エレクトリック・ギター（ジャズ）",
"Electric Guitar (clean)	エレクトリック・ギター（クリーン）",
"Electric Guitar (muted)	エレクトリック・ギター（ミュート）",
"Overdriven Guitar	オーバードライブ・ギター",
"Distortion Guitar	ディストーション・ギター",
"Guitar harmonics	ギター・ハーモニクス",
"Acoustic Bass	アコースティック・ベース",
"Electric Bass (finger)	エレクトリック・ベース（フィンガー）",
"Electric Bass (pick)	エレクトリック・ベース（ピック）",
"Fretless Bass	フレットレス・ベース",
"Slap Bass 1	スラップ・ベース1",
"Slap Bass 2	スラップ・ベース2",
"Synth Bass 1	シンセ・ベース1",
"Synth Bass 2	シンセ・ベース2",
"Violin	バイオリン",
"Viola	ビオラ",
"Cello	チェロ",
"Contrabass	コントラバス",
"Tremolo Strings	トレモロ・ストリングス",
"Pizzicato Strings	ピチカート・ストリングス",
"Orchestral Harp	オーケストラ・ハープ",
"Timpani	ティンパニー",
"String Ensembles 1	ストリング・アンサンブル1",
"String Ensembles 2	ストリング・アンサンブル2",
"SynthStrings 1	シンセ・ストリングス1",
"SynthStrings 2	シンセ・ストリングス2",
"Choir Aahs	ボイス（アー）",
"Voice Oohs	ボイス（ウー）",
"Synth Voice	シンセ・ボイス",
"Orchestra Hit	オーケストラ・ヒット",
"Trumpet	トランペット",
"Trombone	トロンボーン",
"Tuba	チューバ",
"Muted Trumpet	ミュート・トランペット",
"French Horn	フレンチ・ホルン",
"Brass Section	ブラス・セクション",
"Synth Brass 1	シンセ・ブラス1",
"Synth Brass 2	シンセ・ブラス2",
"Soprano Sax	ソプラノ・サックス",
"Alto Sax	アルト・サックス",
"Tenor Sax	テナー・サックス",
"Baritone Sax	バリトン・サックス",
"Oboe	オーボエ",
"English Horn	イングリッシュ・ホルン",
"Bassoon	バスーン",
"Clarinet	クラリネット",
"Piccolo	ピッコロ",
"Flute	フルート",
"Recorder	リコーダー",
"Pan Flute	パン・フルート",
"Blown Bottle	ボトル・ブロウ",
"Shakuhachi	尺八",
"Whistle	ホイッスル（口笛）",
"Ocarina	オカリナ",
"Lead 1 (square)	リード1（矩形波）",
"Lead 2 (sawtooth)	リード2（鋸歯状波）",
"Lead 3 (calliope)	リード3（calliope 蒸気オルガン）",
"Lead 4 (chiff)	リード4（chiff）",
"Lead 5 (charang)	リード5（charang）",
"Lead 6 (voice)	リード6（ボイス）",
"Lead 7 (fifths)	リード7（5度）",
"Lead 8 (bass + lead)	リード8（ベース＋リード）",
"Pad 1 ((new age)	パッド1（ニュー・エイジ）",
"Pad 2 (warm)	パッド2（ウォーム）",
"Pad 3 (polysynth)	パッド3（ポリシンセ）",
"Pad 4 (choir)	パッド4（クワイア）",
"Pad 5 (bowed)	パッド5（bowed）",
"Pad 6 (metallic)	パッド6（メタリック）",
"Pad 7 (halo)	パッド7（halo）",
"Pad 8 (sweep)	パッド8（スウィープ）",
"FX 1 (rain)	FX1（雨）",
"FX 2 (soundtrack)	FX2（サウンドトラック）",
"FX 3 (crystal)	FX3（クリスタル）",
"FX 4 (atmosphere)	FX4（アトモスフィア）",
"FX 5 (brightness)	FX5（ブライトネス）",
"FX 6 (goblins)	FX6（ゴブリン）",
"FX 7 (echoes)	FX7（エコー）",
"FX 8 (sci-fi)	FX8（SF）",
"Sitar	シタール",
"Banjo	バンジョー",
"Shamisen	三味線",
"Koto	琴",
"Kalimba	カリンバ",
"Bag pipe	バグ・パイプ",
"Fiddle	フィドル",
"Shanai	シャナイ",
"Tinkle Bell	ティンカ・ベル",
"Agogo	アゴゴ",
"Steel Drums	スティール・ドラム",
"Woodblock	ウッド・ブロック",
"Taiko Drum	太鼓",
"Melodic Tom	メロディック・タム",
"Synth Drum	シンセ・ドラム",
"Reverse Cymbal	リバース・シンバル",
"Guitar Fret Noise	ギター・フレット・ノイズ",
"Breath Noise	ブレス・ノイズ",
"Seashore	海辺",
"Bird Tweet	鳥のさえずり",
"Telephone Ring	電話のベル",
"Helicopter	ヘリコプター",
"Applause	拍手喝采",
"Gunshot	ガン・ショット",
];
const mj_pname = ["G♭","D♭","A♭","E♭","B♭","F","C","G","D","A","E","B","F#"];
const mn_pname = ["E♭","B♭","F","C","G","D","A","E","B","F#","C#","G#","D#"];
function Cname(){
	let pt_adj = Number(document.getElementById("pitch").value);
	let str = document.getElementById("code").value;
	let idf = str.indexOf("#SF");
	let tmp = "";
	while(str[idf] != "\n" && idf < str.length){
		tmp += str[idf];
		idf++;
	}
	let sf_f = Rval("#SF ", tmp);
	if(sf_f < -99 || sf_f > 99) sf_f = 0;
	let sf_adj = Number(document.getElementById("scale").value);
	let scale_name = document.getElementById("sc").innerText;
	let base_p = (sf_f + 6 + 1200) % 12;
	if(base_p == 0 && sf_f >= 0) base_p = 12;
	let base_p_after = (7 * pt_adj + sf_adj + sf_f + 6 + 1200) % 12;
	if(base_p_after == 0 && sf_adj + sf_f >= 0) base_p_after = 12;
	let rt = "";
	if(sel == 0){
		switch(sf_adj){
			case -3:
				rt = mj_pname[base_p] + "メジャー　→　" + mn_pname[base_p_after] + "マイナー<br>" + mn_pname[base_p] + "マイナー　→　---";
				break;
			case 0:
				rt = mj_pname[base_p] + "メジャー　→　" + mj_pname[base_p_after] + "メジャー<br>" + mn_pname[base_p] + "マイナー　→　" + mn_pname[base_p_after] + "マイナー";
				break;
			case 3:
				rt = mj_pname[base_p] + "メジャー　→　---<br>" + mn_pname[base_p] + "マイナー　→　" + mj_pname[base_p_after] + "メジャー";
				break;
			default:
				rt = mj_pname[base_p] + "メジャー　→　---<br>" + mn_pname[base_p] + "マイナー　→　---";
				break;
		}
	}else if(sf_adj == 0){
		rt = mj_pname[base_p] + "メジャー/" + mn_pname[base_p] + "マイナー　→　" + mj_pname[base_p_after] + scale_name;
	}else{
		rt = "---";
	}
	document.getElementById("cname").innerHTML = rt;
}
document.getElementById("code").addEventListener('input', Cname);