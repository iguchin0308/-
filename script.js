"use strict";

/**
 * 飲みゲー（40枚）
 * 目的：その場で即決・盛り上がるカード中心
 */

const CARDS = [
  // --- ベース ---
  { title: "白熊", category: "服装", rule: "白い服や小物を身に着けている人が飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "誕生日が近い人（今月 or 来月）が飲む。該当がいなければ引いた人が飲む。" },

  // 水チェイサー2枚
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },

  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が飲む（あいこはやり直し）。" },
  { title: "共通点探し", category: "即決", rule: "引いた人が“全員の共通点”を1つ即答。10秒で出なければ全員1口。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が飲む（同票なら同票の複数人が飲む）。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が飲む。" },

  { title: "右隣", category: "席順", rule: "引いた人の右隣が飲む。" },
  { title: "左隣", category: "席順", rule: "引いた人の左隣が飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）が飲む。向かいが不明なら“目が合った人”が飲む。" },

  { title: "偶数席", category: "席順", rule: "座席を1番から順に数えて“偶数席”の人が飲む（数え方は引いた人が決める）。" },
  { title: "奇数席", category: "席順", rule: "座席を1番から順に数えて“奇数席”の人が飲む（数え方は引いた人が決める）。" },

  { title: "最年長", category: "プロフィール", rule: "この場で一番年上の人が飲む。" },
  { title: "最年少", category: "プロフィール", rule: "この場で一番年下の人が飲む。" },

  { title: "メデゥーサ", category: "心理戦", rule: "引いた人と最初に目が合った人が飲む。10秒誰とも目が合わなければ引いた人が飲む。" },
  { title: "遅刻", category: "当日ネタ", rule: "今日の飲み会に一番遅刻した人が飲む。" },
  { title: "人気者", category: "即決", rule: "全員スマホを出す。一番最初にLINE/DMの通知が来た人が飲む（来なければ引いた人が飲む）。" },
  { title: "キス", category: "当日ネタ", rule: "一番最近キスした人が飲む（言いたくない人は1口で回避OK）。" },
  { title: "ラッパー", category: "チャレンジ", rule: "引いた人が早口言葉を決める。順番に言い、噛んだ人が飲む。" },
  { title: "乾杯", category: "全体", rule: "全員飲む（1口でOK）。" },
  { title: "究極の選択", category: "選択", rule: "2口飲むか、このメンバーの誰にも言ったことのない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "引いた人が2口飲む。" },

  { title: "お残しダメよ", category: "量チェック", rule: "今いちばんグラスにお酒が残ってる人が飲み干す（無理なら2口＋水）。" },

  // 電池残量：多い/少ない
  { title: "電池残量（少ない）", category: "即決", rule: "スマホの電池残量が一番少ない人が飲む（同率なら同率）。" },
  { title: "電池残量（多い）", category: "即決", rule: "スマホの電池残量が一番多い人が飲む（同率なら同率）。" },

  { title: "一斉に乾杯", category: "全体", rule: "全員“グラスを上げる”。上げるのが一番遅かった人が飲む。" },
  { title: "連想ゲーム", category: "チャレンジ", rule: "引いた人がお題を1つ。時計回りで1つずつ連想を言う。詰まった人が飲む（3秒以内）。" },
  { title: "セーフティ", category: "休憩", rule: "このカードはセーフ。飲まなくてOK。代わりに水を一口（任意）。" },

  // バリア2枚
  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },
  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },

  // ガードマン2枚
  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化。" },
  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化。" },

  // なにした
  { title: "なにした", category: "即決", rule: "直近一週間で○○した人は飲む（○○は引いた人が決める）。" },

  // --- ここから追加（即決・盛り上がる系で40枚まで補完） ---
  { title: "瞬間ミラー", category: "心理戦", rule: "引いた人が突然ポーズ。最後に真似できた人が飲む（判定は場の空気）。" },
  { title: "二択ジャッジ", category: "即決", rule: "引いた人が二択を出す（例：犬派/猫派）。少数派が飲む。" },
  { title: "多数決", category: "即決", rule: "引いた人が質問を1つ。少数派が飲む。" },
  { title: "ワンワード", category: "即決", rule: "引いた人が“お題”を1つ。全員1語で答える。被った人が飲む。" },

  { title: "3・2・1", category: "即決", rule: "全員でせーので1〜3の数字を指で出す。一番少ない数字の人が飲む（同数なら同数）。" },
];

// ---- DOM helpers ----
const el = (id) => document.getElementById(id);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// ---- State ----
let deck = [];
let drawnCount = 0;

// ---- UI ----
function setTotals() {
  const total = String(CARDS.length);
  ["total","total2","total3","total4","total5"].forEach((id) => {
    const node = el(id);
    if (node) node.textContent = total;
  });
}

function setScreen(name) {
  const deckScr = el("screen-deck");
  const revScr = el("screen-reveal");
  const finScr = el("screen-finished");

  if (deckScr) deckScr.classList.remove("screen-active");
  if (revScr) revScr.classList.remove("screen-active");
  if (finScr) finScr.classList.remove("screen-active");

  const target = el(name);
  if (target) target.classList.add("screen-active");
}

function updateCounters() {
  if (el("remain")) el("remain").textContent = String(deck.length);
  if (el("remain2")) el("remain2").textContent = String(deck.length);
  if (el("drawn")) el("drawn").textContent = String(drawnCount);
}

function newGame() {
  deck = shuffle(CARDS.map((c) => ({ ...c })));
  drawnCount = 0;
  setTotals();
  updateCounters();
  setScreen("screen-deck");
}

function showCard(card) {
  if (el("card-index")) el("card-index").textContent = String(drawnCount);
  if (el("card-title")) el("card-title").textContent = card.title;
  if (el("card-subtitle")) el("card-subtitle").textContent = card.category;
  if (el("card-rule")) el("card-rule").textContent = card.rule;

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

// ---- Events ----
function bindEvents() {
  el("btn-draw")?.addEventListener("click", drawCard);

  el("btn-next")?.addEventListener("click", () => {
    if (deck.length === 0) setScreen("screen-finished");
    else drawCard();
  });

  el("btn-back")?.addEventListener("click", () => setScreen("screen-deck"));

  el("btn-reset")?.addEventListener("click", () => {
    const ok = confirm("最初からやり直しますか？（カードはシャッフルされます）");
    if (ok) newGame();
  });

  el("btn-restart")?.addEventListener("click", newGame);
  el("btn-finish-back")?.addEventListener("click", () => setScreen("screen-deck"));
}

// ---- Boot ----
(function boot(){
  try{
    console.log(`飲みゲー：カード枚数 = ${CARDS.length}枚`);
    bindEvents();
    newGame();
  } catch (e) {
    console.error("script.js 起動エラー:", e);
    alert("スクリプトでエラーが出ています。PCでF12→Consoleを確認してください。");
  }
})();
