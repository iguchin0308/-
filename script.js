"use strict";

/**
 * 飲みゲー（カード枚数はCARDS.lengthで自動）
 * - index.html に #card-icon がある（<div id="card-icon" class="card-icon"></div>）
 * - PNGを ./icons/ に置く（例：./icons/bear.png）
 */

// -------------------- Cards --------------------
const CARDS = [
  { title: "カメレオン", category: "服装", rule: "出題者が、色を指定。〇色の服や小物を身に着けている人が1口飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が1口飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "残り枚数に含まれる数字が誕生日に入ってる人が飲む。（例：残り38枚なら。誕生日に3か8が入ってる人が飲む。該当がいなければ引いた人が1口飲む。" },

  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "金銭感覚チェック", category: "即決", rule: "今目の前にある、飲み物か食べ物の金額を言う。誤差10パーいないならセーフ。間違えたら1口飲む。ドンピシャなら、バリアゲット。" },
  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が1口飲む（あいこはやり直し）。" },
  { title: "共通点探し", category: "即決", rule: "引いた人が“全員の共通点”を1つ即答。10秒で出なければ全員1口。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が1口飲む（同票なら同票の複数人が飲む）。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が2口飲む。" },
  { title: "変わり種", category: "縛り", rule: "引いた人は、次酒を頼む時まだ誰も頼んでいないメニューを頼まないといけない。" },
  { title: "○○縛り", category: "縛り", rule: "引いた人は、今飲んでるお酒と同じものを次も頼む。" },
  { title: "右隣", category: "席順", rule: "引いた人の右隣が1口飲む。" },
  { title: "左隣", category: "席順", rule: "引いた人の左隣が1口飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）が飲む。向かいが不明なら“目が合った人”が1口飲む。" },
  { title: "偶数席", category: "席順", rule: "座席を1番から順に数えて“偶数席”の人が1口飲む（数え方は引いた人から時計回りor反時計回り）。" },
  { title: "奇数席", category: "席順", rule: "座席を1番から順に数えて“奇数席”の人が1口飲む（数え方は引いた人から時計回りor反時計回り））。" },
  { title: "ひよってる奴いる？", category: "縛り", rule: "今飲んでるお酒で、一番アルコール度数が低そうな人が2口飲む" },
  { title: "最年長", category: "プロフィール", rule: "この場で一番年上の人が1口飲む。" },
  { title: "最年少", category: "プロフィール", rule: "この場で一番年下の人が1口飲む。" },

  { title: "メデゥーサ", category: "心理戦", rule: "引いた人と最初に目が合った人が1口飲む。10秒誰とも目が合わなければ引いた人が飲む。" },
  { title: "遅刻", category: "当日ネタ", rule: "今日の飲み会に一番遅刻した人が1口飲む。" },
  { title: "人気者", category: "即決", rule: "全員スマホを出す。一番最近LINE/DMの通知が来た人が1口飲む（来なければ引いた人が飲む）。" },
  { title: "キス", category: "当日ネタ", rule: "一番最近キスした人が1口飲む（言いたくない人は1口で回避OK）。" },
  { title: "ラッパー", category: "チャレンジ", rule: "引いた人が早口言葉を決める。順番に言い、噛んだ人が1口飲む。" },

  { title: "乾杯", category: "全体", rule: "全員1口飲む。" },
  { title: "究極の選択", category: "選択", rule: "1杯飲み干すか、このメンバーの誰にも言ったことのない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "引いた人は、次飲む時指定された量の2倍飲む。" },
  { title: "お残しチェック", category: "量チェック", rule: "今いちばんグラスにお酒が残ってる人が飲み干す（無理なら2口＋水）。" },

  { title: "ロック画面", category: "即決", rule: "一番○○なロック画面の人が1口飲む。（○○は引いた人が決める）" },
  { title: "道ずれ", category: "即決", rule: "このカードを引いた人と指名した人が1口飲む（1～3口引いた人が決める）" },
  { title: "お手洗い", category: "即決", rule: "一番最近トイレ行った人が1口が飲む。（○○は引いた人が決める）" },
  { title: "電池残量（少ない）", category: "即決", rule: "スマホの電池残量が一番少ない人が1口飲む。" },
  { title: "電池残量（多い）", category: "即決", rule: "スマホの電池残量が一番多い人が1口飲む。" },
  { title: "メンズorレディース", category: "全体", rule: "残り枚数が奇数なら男性。偶数なら女性が飲む。" },
  { title: "一斉に乾杯", category: "全体", rule: "全員“グラスを上げる”。上げるのが一番遅かった人が1口飲む。" },
  { title: "連想ゲーム", category: "チャレンジ", rule: "引いた人がお題を1つ。時計回りで1つずつ連想を言う。詰まった人が1口飲む（3秒以内）。" },
  { title: "セーフティ", category: "休憩", rule: "このカードはセーフ。飲まなくてOK。代わりに水を1口飲む（任意）。" },

  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },
  { title: "バリア", category: "効果", rule: "引いた人は『次に自分が飲む指示』を1回だけ無効化できる（いつ使ってもOK）。" },

  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化。" },
  { title: "ガードマン", category: "効果", rule: "引いた人は『自分以外の1人』を指名して守れる。指名された人が次に飲む指示を受けたら、その1回だけ無効化。" },

  { title: "なにした", category: "即決", rule: "直近一週間で○○した人は1口飲む（○○は引いた人が決める）。" },

  { title: "二択ジャッジ", category: "即決", rule: "引いた人が二択を出す。引いた人が回答を考え、他の人は予想。外れた人は1口飲む。" },
  { title: "多数決", category: "即決", rule: "引いた人が質問を1つ。少数派が1口飲む。" },
  { title: "ワンワード", category: "即決", rule: "引いた人がお題を1つ。全員漢字1語で答える。被った人が1口飲む。" },
  { title: "メガシャキ", category: "即決", rule: "引いた人がスタートと言う。その後一番早く瞬きした人が2口飲む。" },
  { title: "予告編", category: "即決", rule: "引いた人が映画のあらすじを説明。正解した場合、回答者、出題者以外1口のむ。（30秒以内に誰も答えられなかったら出題者が2口飲む）" },
  { title: "3・2・1", category: "即決", rule: "全員でせーので1〜3の数字を指で出す。一番少数派の数字の人が1口飲む（同数なら全員）。" },
];

// -------------------- Icons --------------------
const ICONS = {
  // 1. 白熊
  "白熊": "./icons/bear.png",

  // 2. ずっとも
  "ずっとも": "./icons/seat_heart.png",

  // 3. 誕生日（※CARDSのtitleに合わせる）
  "誕生日ボーイ&ガール": "./icons/cake.png",

  // 4. 水チェイサー（2枚あっても同じでOK）
  "水チェイサー": "./icons/water.png",

  // 5. じゃんけん王
  "じゃんけん王": "./icons/crown_hand.png",

  // 6. 共通点探し
  "共通点探し": "./icons/venn.png",

  // 7. 指差し
  "指差し": "./icons/point.png",

  // 8. 独裁
  "独裁": "./icons/spotlight.png",

  // 9. 右隣
  "右隣": "./icons/arrow_right.png",

  // 10. 左隣
  "左隣": "./icons/arrow_left.png",

  // 11. 向かい
  "向かい": "./icons/facing.png",

  // 12. 最年長
  "最年長": "./icons/crown.png",

  // 13. 最年少
  "最年少": "./icons/baby.png",

  // 14. メデゥーサ
  "メデゥーサ": "./icons/medusa_eye.png",

  // 15. 人気者
  "人気者": "./icons/phone_heart.png",

  // 16. ラッパー
  "ラッパー": "./icons/mic.png",

  // 17. 乾杯
  "乾杯": "./icons/clink.png",

  // 18. 究極の選択
  "究極の選択": "./icons/choice.png",

  // 19. お残しチェック
  "お残しチェック": "./icons/glass_level.png",

  // 20. ロック画面
  "ロック画面": "./icons/lockscreen.png",

  // 21. 電池残量（少ない）
  "電池残量（少ない）": "./icons/battery_low.png",

  // 22. 電池残量（多い）
  "電池残量（多い）": "./icons/battery_full.png",

  // 23. セーフティ
  "セーフティ": "./icons/check.png",

  // 24. バリア（2枚あっても同じでOK）
  "バリア": "./icons/shield.png",

  // 25. ガードマン（2枚あっても同じでOK）
  "ガードマン": "./icons/guard.png",

  // ここに無いカードは全部これになる
  default: "./icons/target.png",
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
