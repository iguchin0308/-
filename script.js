"use strict";

/**
 * 飲みゲー：40枚デッキ（井口さん指定反映）
 * - バリア2枚 / ガードマン2枚
 * - 視線泥棒 削除
 * - 電池残量：多い人 / 少ない人 の2枚
 * - なにした 追加
 *
 * この script.js は、以前渡した index.html のIDに合わせています：
 * btn-draw / btn-next / btn-back / btn-reset / btn-restart / btn-finish-back
 * remain / drawn / remain2
 * card-title / card-subtitle / card-rule / card-index
 * screen-deck / screen-reveal / screen-finished
 */

const CARDS = [
  { title: "白熊", category: "服装", rule: "白い服や小物を身に着けている人が飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "誕生日が近い人（今月 or 来月）が飲む。該当がいなければ引いた人。" },

  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む。" },

  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が飲む（あいこはやり直し）。" },
  { title: "共通点探し", category: "即決", rule: "引いた人が“全員の共通点”を1つ即答。10秒で出なければ全員1口。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が飲む（同票なら同票の人）。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が飲む。" },

  { title: "右隣", category: "席順", rule: "引いた人の右隣が飲む。" },
  { title: "左隣", category: "席順", rule: "引いた人の左隣が飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）が飲む。向かいが不明なら“目が合った人”が飲む。" },

  { title: "偶数席", category: "席順", rule: "座席を1番から数えて“偶数席”が飲む（数え方は引いた人が決める）。" },
  { title: "奇数席", category: "席順", rule: "座席を1番から数えて“奇数席”が飲む（数え方は引いた人が決める）。" },

  { title: "最年長", category: "プロフィール", rule: "この場で一番年上が飲む。" },
  { title: "最年少", category: "プロフィール", rule: "この場で一番年下が飲む。" },

  { title: "メデゥーサ", category: "心理戦", rule: "引いた人と最初に目が合った人が飲む。10秒誰とも目が合わなければ引いた人。" },
  { title: "遅刻", category: "当日ネタ", rule: "今日の飲み会に一番遅刻した人が飲む。" },
  { title: "人気者", category: "即決", rule: "全員スマホを出す。一番最初にLINE/DMの通知が来た人が飲む（来なければ引いた人）。" },
  { title: "キス", category: "当日ネタ", rule: "一番最近キスした人が飲む（言いたくない人は1口で回避OK）。" },
  { title: "ラッパー", category: "チャレンジ", rule: "引いた人が早口言葉を決める。順番に言い、噛んだ人が飲む。" },
  { title: "乾杯", category: "全体", rule: "全員飲む（1口でOK）。" },
  { title: "究極の選択", category: "選択", rule: "2口飲むか、このメンバーの誰にも言ったことのない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "引いた人が2口飲む。" },

  { title: "お残しダメよ", category: "量チェック", rule: "いちばんグラスにお酒が残ってる人が飲み干す（無理なら2口＋水）。" },

  // 盛り上がる系（残すやつ）
  { title: "瞬間ミラー", category: "心理戦", rule: "引いた人が突然ポーズ。最後に真似できた人が飲む（判定は場の空気）。" },
  { title: "二択ジャッジ", category: "即決", rule: "引いた人が二択を出す（例：犬派/猫派）。少数派が飲む。" },
  { title: "多数決", category: "即決", rule: "引いた人が質問を1つ。少数派が飲む。" },
  { title: "3・2・1", category: "即決", rule: "全員でせーので1〜3の数字を指で出す。一番少ない数字を出した人が飲む（同数なら同数）。" },
  { title: "ワンワード", category: "即決", rule: "引いた人が“お題”を1つ。全員1語で答える。被った人が飲む。" },

  // 電池残量（2枚）
  { title: "電池残量（少ない）", category: "即決", rule: "スマホの電池残量が一番少ない人が飲む（同率なら同率）。" },
  { title: "電池残量（多い）", category: "即決", rule: "スマホの電池残量が一番多い人が飲む（同率なら同率）。" },

  { title: "一斉に乾杯", category: "全体", rule: "全員“グラスを上げる”。上げるのが一番遅かった人が飲む。" },
  { title: "連想ゲーム", category: "チャレンジ", rule: "引いた人がお題を1つ。時計回りで連想を言う。詰まった人が飲む（3秒以内）。" },
  { title: "セーフティ", category: "休憩", rule: "このカードはセーフ。飲まなくてOK。代わりに水を一口（任意）。" },

  // バリア 2枚
  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },
  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },

  // ガードマン 2枚
  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化（身代わりなし）。" },
  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化（身代わりなし）。" },

  // なにした
  { title: "なにした", category: "即決", rule: "直近1週間で○○した人は飲む（○○は引いた人が決める）。" }
];

// --- state ---
let deck = [];
let drawnCount = 0;

// --- safe get element ---
const el = (id) => document.getElementById(id);

const screenDeck = el("screen-deck");
const screenReveal = el("screen-reveal");
const screenFinished = el("screen-finished");

const remainEl = el("remain");
const drawnEl = el("drawn");
const remain2El = el("remain2");

const btnDraw = el("btn-draw");
const btnReset = el("btn-reset");
const btnBack = el("btn-back");
const btnNext = el("btn-next");
const btnRestart = el("btn-restart");
const btnFinishBack = el("btn-finish-back");

const cardIndexEl = el("card-index");
const cardTitleEl = el("card-title");
const cardSubtitleEl = el("card-subtitle"); // index.html側はsubtitle想定
const cardRuleEl = el("card-rule");

// --- helpers ---
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setScreen(which) {
  screenDeck?.classList.remove("screen-active");
  screenReveal?.classList.remove("screen-active");
  screenFinished?.classList.remove("screen-active");
  which?.classList.add("screen-active");
}

function updateCounters() {
  remainEl.textContent = String(deck.length);
  drawnEl.textContent = String(drawnCount);
  remain2El.textContent = String(deck.length);
}

function newGame() {
  deck = shuffle(CARDS.map((c) => ({ ...c })));
  drawnCount = 0;
  updateCounters();
  setScreen(screenDeck);
}

function drawCard() {
  if (deck.length === 0) {
    setScreen(screenFinished);
    return;
  }
  const card = deck.pop();
  drawnCount += 1;

  cardIndexEl.textContent = String(drawnCount);
  cardTitleEl.textContent = card.title;
  cardSubtitleEl.textContent = card.category;
  cardRuleEl.textContent = card.rule;

  updateCounters();
  setScreen(screenReveal);
}

function nextFromReveal() {
  if (deck.length === 0) setScreen(screenFinished);
  else drawCard();
}

function backToDeck() {
  setScreen(screenDeck);
}

// --- wiring (ここが無いとボタン押しても動かない) ---
btnDraw?.addEventListener("click", drawCard);
btnNext?.addEventListener("click", nextFromReveal);
btnBack?.addEventListener("click", backToDeck);

btnReset?.addEventListener("click", () => {
  if (confirm("最初からやり直しますか？（カードはシャッフルされます）")) newGame();
});
btnRestart?.addEventListener("click", newGame);
btnFinishBack?.addEventListener("click", () => setScreen(screenDeck));

// init
console.log(`飲みゲー：カード枚数 = ${CARDS.length}枚`);
newGame();
