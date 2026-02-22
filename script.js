"use strict";

/**
 * 飲みゲー：カード20枚（即決系・その場で完結）
 * - 揉めやすい/内輪すぎる/長引くお題は排除
 * - 「その場で決まる」「誰が飲むか明確」を優先
 * - 井口さん指定の差し替え4枚（カラー指定/ルールメーカー/選べ（セーフ）/指名じゃんけん）反映済み
 */

const CARDS = [
  // --- 井口さん指定 ---
  { title: "白熊", category: "服装", rule: "白い服や小物を身に着けている人が飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "誕生日が近い人（今月 or 来月）の人が飲む。該当がいなければ引いた人が飲む。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が飲む（あいこはやり直し）。" },
  { title: "共通点探し", category: "即決", rule: "全員で共通点を1つ即答。10秒で出なければ全員1口。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が飲む（同票なら同票の人が飲む）。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が飲む。" },

  // --- 追加（全部その場で決まる系） ---
  { title: "右隣", category: "席順", rule: "引いた人の右隣が飲む。" },
  { title: "左隣", category: "席順", rule: "引いた人の左隣が飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）の人が飲む。向かいが不明なら“目が合った人”が飲む。" },

  { title: "じゃんけん弱者", category: "即決", rule: "全員でじゃんけん。勝った人が飲む（あいこはやり直し）。" },

  { title: "偶数席", category: "席順", rule: "座席を1番から順に数えて“偶数席”の人が飲む（数え方は引いた人が宣言）。" },
  { title: "奇数席", category: "席順", rule: "座席を1番から順に数えて“奇数席”の人が飲む（数え方は引いた人が宣言）。" },

  { title: "最年長", category: "プロフィール", rule: "この場で一番年上の人が飲む。年齢非公開なら“自称最年長”が飲む（逃げられない）。" },
  { title: "最年少", category: "プロフィール", rule: "この場で一番年下の人が飲む。年齢非公開なら“自称最年少”が飲む。" },

  // --- 差し替え4枚（わかりやすい＆その場対応OK） ---
  { title: "カラー指定", category: "即決", rule: "引いた人が色を1つ宣言（例：黒）。その色が“服・小物・スマホケース”に入ってる人が飲む。該当なしなら引いた人が飲む。" },
  { title: "ルールメーカー", category: "その場対応", rule: "引いた人が“今この場に合うミニルール”を1つ作る（例：『笑ったら飲む』）。次の1周が終わったら解除。" },
  { title: "選べ（セーフ）", category: "その場対応", rule: "引いた人が“飲む人”を1人選ぶ（恨み禁止）。ただし同じ人を2回連続で選んだら、引いた人も飲む。" },
  { title: "指名じゃんけん", category: "即決", rule: "引いた人が相手を1人指名してじゃんけん。負けた方が飲む（あいこは決着まで）。" }
];

// 念のため20枚固定チェック
if (CARDS.length !== 20) {
  console.warn(`CARDSが20枚ではありません：${CARDS.length}枚`);
}

// --- state ---
let deck = [];
let drawnCount = 0;

// --- elements ---
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
const cardSubtitleEl = el("card-subtitle");
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
  screenDeck.classList.remove("screen-active");
  screenReveal.classList.remove("screen-active");
  screenFinished.classList.remove("screen-active");
  which.classList.add("screen-active");
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
  if (deck.length === 0) {
    setScreen(screenFinished);
  } else {
    drawCard();
  }
}

function backToDeck() {
  setScreen(screenDeck);
}

// --- events ---
btnDraw.addEventListener("click", drawCard);
btnNext.addEventListener("click", nextFromReveal);
btnBack.addEventListener("click", backToDeck);

btnReset.addEventListener("click", () => {
  if (confirm("最初からやり直しますか？（カードはシャッフルされます）")) {
    newGame();
  }
});

btnRestart.addEventListener("click", newGame);
btnFinishBack.addEventListener("click", () => setScreen(screenDeck));

// --- init ---
newGame();
