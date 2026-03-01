"use strict";

/**
 * 飲みゲー（カード枚数はCARDS.lengthで自動）
 * - index.html に #card-icon がある（<div id="card-icon" class="card-icon"></div>）
 * - PNGを ./icons/ に置く（例：./icons/bear.png）
 */

// -------------------- Cards --------------------
const CARDS = [
  { title: "カメレオン", category: "トーク", rule: "出題者が、色を指定。〇色の服や小物を身に着けている人が1口飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が1口飲む。" },
  { title: "誕生日ボーイ&ガール", category: "リアルタイム", rule: "残り枚数に含まれる数字が誕生日に入ってる人が飲む。（例：残り12枚なら。誕生日に12が入ってる人が飲む。該当がいなければ引いた人が1口飲む。）" },
  { title: "サントリー", category: "リアルタイム", rule: "この飲み会中に、3回目にこのお題が引かれた時、引いた人は1杯飲み干す。1・2回目は、飲まなくてOK。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "金銭感覚チェック", category: "アイデア", rule: "今目の前にある、飲み物か食べ物の１品の金額を言う。誤差10パーいないならセーフ。間違えたら1口飲む。ドンピシャなら、1度パスできるバリアゲット。" },
  { title: "じゃんけん王", category: "その他", rule: "全員でじゃんけん。負けた人が1口飲む（あいこはやり直し）。" },
  { title: "共通点探し", category: "アイデア", rule: "引いた人が“全員の共通点”を1つ即答。10秒で出なければ全員1口。" },
  { title: "指差し", category: "投票", rule: "せーので指差し。一番指さされた人が1口飲む（同票なら同率1位の複数人が飲む）。" },
  { title: "独裁", category: "その他", rule: "引いた人以外、全員が2口飲む。" },
  { title: "変わり種", category: "縛り", rule: "引いた人は、次酒を頼む時まだ誰も頼んでいないメニューを頼まないといけない。" },
  { title: "○○縛り", category: "縛り", rule: "引いた人は、今飲んでるお酒と同じものを次も頼む。" },
  { title: "右隣or左隣or自分！？", category: "席順", rule: "今の時間を見る。分数が奇数なら引いた人の右隣が1口飲む。偶数なら左隣が1口飲む。ぞろ目なら引いた人が2口飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）が飲む。向かいが不明なら“目が合った人”が1口飲む。" },
  { title: "偶数席", category: "席順", rule: "座席を1番から順に数えて“偶数席”の人が1口飲む（数え方は引いた人から時計回りor反時計回り）。" },
  { title: "奇数席", category: "席順", rule: "座席を1番から順に数えて“奇数席”の人が1口飲む（数え方は引いた人から時計回りor反時計回り）。" },
  { title: "ひよってる奴いる？", category: "投票", rule: "今飲んでるお酒で、一番アルコール度数が低そうな人が2口飲む" },
  { title: "最年長or最年少", category: "リアルタイム", rule: "残り枚数が奇数なら最年長。偶数なら最年少が飲む。" },
  { title: "地雷", category: "その他", rule: "引いた人が、NGワードを決める。次にそれを言った人は2杯飲む。" },
  { title: "10秒チャレンジ", category: "瞬発力", rule: "みんなで、ストップウォッチをスタート。10秒から一番遠かった人が1杯飲む。" },
  { title: "メデゥーサ", category: "瞬発力", rule: "引いた人と最初に目が合った人が1口飲む。10秒誰とも目が合わなければ引いた人が飲む。" },
  { title: "遅刻", category: "トーク", rule: "今日の飲み会に一番遅刻した人が1口飲む。" },
  { title: "人気者", category: "リアルタイム", rule: "全員スマホを出す。一番最近LINEの通知が来てる人が1口飲む。" },
  { title: "キス", category: "トーク", rule: "一番最近キスした人が1口飲む（言いたくない人は1口で回避OK）。" },
  { title: "ラッパー", category: "アイデア", rule: "引いた人が早口言葉を決める。順番に言い、噛んだ人が1口飲む。" },
  { title: "〇〇を探せ！", category: "瞬発力", rule: "引いた人がお題を決める。一番探すのが遅かった人が、1口飲む。（赤色のモノを探せ。）" },
  { title: "究極の選択", category: "トーク", rule: "1杯飲み干すか、このメンバーの誰にも言ったことのない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "縛り", rule: "引いた人は、次飲む時指定された量の2倍飲む。" },
  { title: "お残しチェック", category: "リアルタイム", rule: "今いちばんグラスにお酒が残ってる人が飲み干す（無理なら2口＋水）。" },
  { title: "ロック画面", category: "リアルタイム", rule: "一番○○なロック画面の人が1口飲む。（○○は引いた人が決める、映ってる人数が多い、楽しそう等）" },
  { title: "道ずれ", category: "その他", rule: "このカードを引いた人と指名した人が1口飲む（1～3口引いた人が決める）" },
  { title: "お手洗い", category: "リアルタイム", rule: "一番最近トイレ行った人が1口が飲む。" },
  { title: "電池残量（多いor少ない）", category: "リアルタイム", rule: "引いた人が飲んでいるのが、ビールかサワー系ならスマホの電池残量が一番多い人がそれ以外なら電池残量が一番少ない人が1口飲む。" },
  { title: "メンズorレディース", category: "リアルタイム", rule: "残り枚数が奇数なら男性。偶数なら女性が全員1口飲む。" },
  { title: "一斉に乾杯", category: "瞬発力", rule: "全員“グラスを上げる”。上げるのが一番遅かった人が1口飲む。" },
  { title: "連想ゲーム", category: "アイデア", rule: "引いた人がお題を1つ。時計回りで1つずつ連想を言う。詰まった人が1口飲む（3秒以内）。" },
  { title: "セーフティ", category: "休憩", rule: "このカードはセーフ。飲まなくてOK。代わりに水を1口飲む（任意）。" },
  { title: "なにした", category: "トーク", rule: "直近一週間で○○した人は1口飲む（○○は引いた人が決める）。" },
  { title: "二択ジャッジ", category: "投票", rule: "引いた人が二択を出す。引いた人が回答を考え、他の人は予想。外れた人は1口飲む。（このメンバーで旅行行くなら北海道or沖縄？）" },
  { title: "多数決", category: "投票", rule: "引いた人が質問を1つ。少数派が1口飲む。（きのこ派orたけのこ派）" },
  { title: "ワンワード", category: "アイデア", rule: "引いた人がお題を1つ。全員漢字1語で答える。被った人が1口飲む。（例：夏といえば？→ 海／祭／蝉）" },
  { title: "メガシャキ", category: "瞬発力", rule: "引いた人がスタートと言う。その後一番早くまばたきした人が2口飲む。" },
  { title: "予告編", category: "アイデア", rule: "引いた人が映画のあらすじを説明。正解した場合、回答者、出題者以外1口のむ。（30秒以内に誰も答えられなかったら出題者が2口飲む）" },
  { title: "3・2・1", category: "瞬発力", rule: "全員でせーので1〜3の数字を指で出す。一番少数派の数字の人が1口飲む（同数なら全員）。" },
];
// -------------------- Category Icons --------------------
const CATEGORY_ICONS = {
  "瞬発力": "./icons/category_speed.png",
  "アイデア": "./icons/category_idea.png",
  "投票": "./icons/category_vote.png",
  "リアルタイム": "./icons/category_realtime.png",
  "トーク": "./icons/category_talk.png",
  "縛り": "./icons/category_restrict.png",
  "休憩": "./icons/category_break.png",
  "その他": "./icons/category_other.png",

  default: "./icons/category_other.png"
};

// -------------------- DOM --------------------
const el = (id) => document.getElementById(id);

const screens = {
  deck: el("screen-deck"),
  reveal: el("screen-reveal"),
  finished: el("screen-finished"),
};

// -------------------- Utils --------------------
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setScreen(screenId) {
  const list = [screens.deck, screens.reveal, screens.finished].filter(Boolean);
  for (const node of list) {
    node.classList.remove("screen-active");
    node.setAttribute("aria-hidden", "true");
    try { node.inert = true; } catch (e) {}
  }

  const target = el(screenId);
  if (!target) return;

  target.classList.add("screen-active");
  target.setAttribute("aria-hidden", "false");
  try { target.inert = false; } catch (e) {}
}

// -------------------- State --------------------
let deck = [];
let drawnCount = 0;

// -------------------- UI --------------------
function setTotals() {
  const total = String(CARDS.length);
  ["total", "total2", "total3", "total4", "total5"].forEach((id) => {
    const node = el(id);
    if (node) node.textContent = total;
  });
}

function updateCounters() {
  const remain = String(deck.length);
  const drawn = String(drawnCount);
  const r1 = el("remain");
  const r2 = el("remain2");
  const d = el("drawn");
  if (r1) r1.textContent = remain;
  if (r2) r2.textContent = remain;
  if (d) d.textContent = drawn;
}

function renderIconForCard(card) {
  const box = el("card-icon");
  if (!box) return;

  const src = ICONS[card.title] || ICONS.default || "";
  box.innerHTML = "";
  if (!src) return;

  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.decoding = "async";
  img.loading = "eager";
  img.onerror = () => {
    if (img.src.endsWith("target.png")) return;
    img.src = ICONS.default;
  };

  box.appendChild(img);
}

function newGame() {
  deck = shuffle(CARDS.map((c) => ({ ...c })));
  drawnCount = 0;
  setTotals();
  updateCounters();
  setScreen("screen-deck");
}

function showCard(card) {
  const idx = el("card-index");
  const title = el("card-title");
  const subtitle = el("card-subtitle");
  const rule = el("card-rule");

  if (idx) idx.textContent = String(drawnCount);
  if (title) title.textContent = card.title;
  if (subtitle) subtitle.textContent = card.category;
  if (rule) rule.textContent = card.rule;

  renderIconForCard(card);
  updateCounters();
  setScreen("screen-reveal");
}

function drawCard() {
  if (deck.length === 0) {
    setScreen("screen-finished");
    return;
  }
  const card = deck.pop();
  drawnCount += 1;
  showCard(card);
}

function bindEvents() {
  const btnDraw = el("btn-draw");
  const btnNext = el("btn-next");
  const btnReset = el("btn-reset");
  const btnRestart = el("btn-restart");
  const btnFinishBack = el("btn-finish-back");

  if (btnDraw) btnDraw.addEventListener("click", drawCard);
  if (btnNext) btnNext.addEventListener("click", drawCard);

  if (btnReset) btnReset.addEventListener("click", () => {
    if (confirm("最初からやり直しますか？（カードはシャッフルされます）")) newGame();
  });

  if (btnRestart) btnRestart.addEventListener("click", newGame);
  if (btnFinishBack) btnFinishBack.addEventListener("click", () => setScreen("screen-deck"));
}

(function boot() {
  try {
    bindEvents();
    newGame();
  } catch (e) {
    console.error("script.js 起動エラー:", e);
    alert("スクリプトでエラーが出ています。F12→Consoleを確認してください。");
  }
})();
