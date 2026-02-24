"use strict";

/**
 * 飲みゲー（カード枚数はCARDS.lengthで自動）
 * 目的：その場で即決・盛り上がるカード中心
 *
 * 仕様：
 * - 戻るボタンなし（btn-back を使わない）
 * - reveal 画面でカードごとにPNGアイコン表示（#card-icon）
 * - ない場合でもエラーにならない
 * - PNGが404なら default にフォールバック
 *
 * ✅ 前提：
 * - index.html に #card-icon がある（あなたのHTMLはOK）
 * - PNGを ./icons/ フォルダに置く（例：./icons/bear.png）
 *   ※フォルダ名/ファイル名はあなたの実物に合わせて変更してOK
 */

// -------------------- Cards --------------------
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
  { title: "究極の選択", category: "選択", rule: "2杯飲むか、このメンバーの誰にも言ったことのない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "引いた人が2杯飲む。" },
  { title: "お残しチェック", category: "量チェック", rule: "今いちばんグラスにお酒が残ってる人が飲み干す（無理なら2口＋水）。" },

  // ★追加：ロック画面
  { title: "ロック画面", category: "即決", rule: "一番○○なロック画面の人が飲む。（○○は引いた人が決める：人が多く映ってる／幸せそう／盛れてる等）" },

  // 電池残量：多い/少ない
  { title: "電池残量（少ない）", category: "即決", rule: "スマホの電池残量が一番少ない人が飲む。" },
  { title: "電池残量（多い）", category: "即決", rule: "スマホの電池残量が一番多い人が飲む。" },

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

  { title: "二択ジャッジ", category: "即決", rule: "引いた人が二択を出す（例：犬派/猫派）。引いた人が回答を考え、他の人は予想。外れた人は飲む。" },
  { title: "多数決", category: "即決", rule: "引いた人が質問を1つ。少数派が飲む。（例：1か月後に旅行するなら沖縄or北海道）" },
  { title: "ワンワード", category: "即決", rule: "引いた人が“お題”を1つ。全員漢字1語で答える。被った人が飲む。（例：夏といえば？→海）" },
  { title: "3・2・1", category: "即決", rule: "全員でせーので1〜3の数字を指で出す。一番少数派の数字の人が飲む（同数なら同数）。" },
];

// -------------------- Icons (PNG) --------------------
// ✅ あなたのPNGファイル名に合わせてここを編集するだけでOK。
// 例：/icons にPNGを置いた想定（index.html と同階層に icons フォルダ）
const ICONS = {
  // 画像セットに合わせた “自己判断” 紐付け（好みで調整してOK）
  "白熊": "./icons/bear.png",
  "ずっとも": "./icons/seat_heart.png",
  "誕生日ボーイ&ガール": "./icons/cake.png",
  "水チェイサー": "./icons/water.png",
  "じゃんけん王": "./icons/crown_hand.png",
  "共通点探し": "./icons/venn.png",
  "指差し": "./icons/point.png",
  "独裁": "./icons/spotlight.png",
  "右隣": "./icons/arrow_right.png",
  "左隣": "./icons/arrow_left.png",
  "向かい": "./icons/facing.png",
  "偶数席": "./icons/arrow_right.png",
  "奇数席": "./icons/arrow_left.png",
  "最年長": "./icons/crown.png",
  "最年少": "./icons/baby.png",
  "メデゥーサ": "./icons/medusa_eye.png",
  "遅刻": "./icons/spotlight.png",
  "人気者": "./icons/phone_heart.png",
  "キス": "./icons/seat_heart.png",
  "ラッパー": "./icons/mic.png",
  "乾杯": "./icons/clink.png",
  "究極の選択": "./icons/choice.png",
  "倍々ファイト": "./icons/crown_hand.png",
  "お残しチェック": "./icons/glass_level.png",
  "ロック画面": "./icons/lockscreen.png",
  "電池残量（少ない）": "./icons/battery_low.png",
  "電池残量（多い）": "./icons/battery_full.png",
  "一斉に乾杯": "./icons/clink.png",
  "連想ゲーム": "./icons/venn.png",
  "セーフティ": "./icons/check.png",
  "バリア": "./icons/shield.png",
  "ガードマン": "./icons/guard.png",
  "なにした": "./icons/point.png",
  "二択ジャッジ": "./icons/choice.png",
  "多数決": "./icons/venn.png",
  "ワンワード": "./icons/phone_heart.png",
  "3・2・1": "./icons/point.png",

  default: "./icons/target.png",
};

// -------------------- DOM --------------------
const el = (id) => document.getElementById(id);

// 画面要素（存在しなくても落ちない）
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

  list.forEach((node) => {
    node.classList.remove("screen-active");
    node.setAttribute("aria-hidden", "true");
    // inertが効くブラウザでは、非表示画面のフォーカス/クリックを無効化できる
    try {
      node.inert = true;
    } catch (_) {}
  });

  const target = el(screenId);
  if (!target) return;

  target.classList.add("screen-active");
  target.setAttribute("aria-hidden", "false");
  try {
    target.inert = false;
  } catch (_) {}
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

/**
 * PNGアイコン描画
 * - 404のときは default にフォールバック
 * - 画像がなくても落ちない
 */
function renderIconForCard(card) {
  const box = el("card-icon");
  if (!box) return;

  const src = ICONS[card.title] || ICONS.default || "";

  // 毎回クリア
  box.textContent = "";

  if (!src) return;

  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.decoding = "async";
  img.loading = "eager";

  // 404などのときは default に差し替え
  img.onerror = () => {
    if (img.src.endsWith(ICONS.default)) return;
    img.src = ICONS.default;
  };

  // CSS任せでも破綻しない最低限
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.display = "block";
  img.style.objectFit = "contain";
  img.style.maxWidth = "120px";
  img.style.maxHeight = "120px";
  img.style.margin = "6px auto 10px";

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

// -------------------- Events --------------------
function bindEvents() {
  el("btn-draw")?.addEventListener("click", drawCard);

  // 「次のカードへ」= 次を引く（残り0なら drawCard() が終了画面へ）
  el("btn-next")?.addEventListener("click", drawCard);

  el("btn-reset")?.addEventListener("click", () => {
    const ok = confirm("最初からやり直しますか？（カードはシャッフルされます）");
    if (ok) newGame();
  });

  el("btn-restart")?.addEventListener("click", newGame);
  el("btn-finish-back")?.addEventListener("click", () => setScreen("screen-deck"));
}

// -------------------- Boot --------------------
(function boot() {
  try {
    console.log(`飲みゲー：カード枚数 = ${CARDS.length}枚`);
    bindEvents();
    newGame();
  } catch (e) {
    console.error("script.js 起動エラー:", e);
    alert("スクリプトでエラーが出ています。PCでF12→Consoleを確認してください。");
  }
})();
