"use strict";

/**
 * 飲みゲー
 * ICONS フォルダ前提（./ICONS/xxx.png）
 */

// -------------------- Cards --------------------
const CARDS = [
  { title: "白熊", category: "服装", rule: "白い服や小物を身に着けている人が飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "誕生日が近い人（今月 or 来月）が飲む。該当がいなければ引いた人が飲む。" },

  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む（休憩カード）。" },

  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が飲む。" },
  { title: "共通点探し", category: "即決", rule: "全員の共通点を10秒以内に答える。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が飲む。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が飲む。" },

  { title: "右隣", category: "席順", rule: "右隣が飲む。" },
  { title: "左隣", category: "席順", rule: "左隣が飲む。" },
  { title: "向かい", category: "席順", rule: "向かいの人が飲む。" },
  { title: "偶数席", category: "席順", rule: "偶数席が飲む。" },
  { title: "奇数席", category: "席順", rule: "奇数席が飲む。" },

  { title: "最年長", category: "プロフィール", rule: "最年長が飲む。" },
  { title: "最年少", category: "プロフィール", rule: "最年少が飲む。" },

  { title: "メデゥーサ", category: "心理戦", rule: "目が合った人が飲む。" },
  { title: "遅刻", category: "当日ネタ", rule: "一番遅刻した人が飲む。" },
  { title: "人気者", category: "即決", rule: "通知が一番早く来た人が飲む。" },
  { title: "キス", category: "当日ネタ", rule: "最近キスした人が飲む。" },
  { title: "ラッパー", category: "チャレンジ", rule: "噛んだ人が飲む。" },

  { title: "乾杯", category: "全体", rule: "全員飲む。" },
  { title: "究極の選択", category: "選択", rule: "2杯飲むか秘密を言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "2杯飲む。" },
  { title: "お残しチェック", category: "量チェック", rule: "一番残ってる人が飲み干す。" },

  { title: "ロック画面", category: "即決", rule: "一番○○なロック画面の人が飲む。" },
  { title: "電池残量（少ない）", category: "即決", rule: "電池が一番少ない人が飲む。" },
  { title: "電池残量（多い）", category: "即決", rule: "電池が一番多い人が飲む。" },

  { title: "一斉に乾杯", category: "全体", rule: "一番遅かった人が飲む。" },
  { title: "連想ゲーム", category: "チャレンジ", rule: "詰まった人が飲む。" },
  { title: "セーフティ", category: "休憩", rule: "飲まなくてOK。" },

  { title: "バリア", category: "効果", rule: "次の1回無効化。" },
  { title: "バリア", category: "効果", rule: "次の1回無効化。" },

  { title: "ガードマン", category: "効果", rule: "1人守れる。" },
  { title: "ガードマン", category: "効果", rule: "1人守れる。" },

  { title: "なにした", category: "即決", rule: "該当者が飲む。" },
  { title: "二択ジャッジ", category: "即決", rule: "外れた人が飲む。" },
  { title: "多数決", category: "即決", rule: "少数派が飲む。" },
  { title: "ワンワード", category: "即決", rule: "被った人が飲む。" },
  { title: "3・2・1", category: "即決", rule: "少数派が飲む。" },
];

// -------------------- ICONS --------------------
const ICONS = {
  "白熊": "./ICONS/bear.png",
  "向かい": "./ICONS/facing.png",
  "偶数席": "./ICONS/arrow_right.png",
  "奇数席": "./ICONS/arrow_left.png",
  "最年長": "./ICONS/crown.png",
  "最年少": "./ICONS/baby.png",
  "メデゥーサ": "./ICONS/medusa_eye.png",
  "遅刻": "./ICONS/spotlight.png",
  "人気者": "./ICONS/phone_heart.png",
  "キス": "./ICONS/seat_heart.png",
  "ラッパー": "./ICONS/mic.png",
  "乾杯": "./ICONS/clink.png",
  "究極の選択": "./ICONS/choice.png",
  "倍々ファイト": "./ICONS/crown_hand.png",
  "お残しチェック": "./ICONS/glass_level.png",
  "ロック画面": "./ICONS/lockscreen.png",
  "電池残量（少ない）": "./ICONS/battery_low.png",
  "電池残量（多い）": "./ICONS/battery_full.png",
  default: "./ICONS/target.png",
};

// -------------------- 基本処理 --------------------
let deck = [];
let drawnCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderIcon(title) {
  const box = document.getElementById("card-icon");
  if (!box) return;

  box.innerHTML = "";

  const src = ICONS[title] || ICONS.default;
  const img = document.createElement("img");
  img.src = src;
  img.style.maxWidth = "120px";
  img.onerror = () => {
    if (!img.src.includes("target.png")) {
      img.src = ICONS.default;
    }
  };

  box.appendChild(img);
}

function drawCard() {
  if (deck.length === 0) return;

  const card = deck.pop();
  drawnCount++;

  document.getElementById("card-title").textContent = card.title;
  document.getElementById("card-rule").textContent = card.rule;

  renderIcon(card.title);
}

function newGame() {
  deck = shuffle([...CARDS]);
  drawnCount = 0;
}

document.getElementById("btn-draw")?.addEventListener("click", drawCard);
document.getElementById("btn-reset")?.addEventListener("click", newGame);

newGame();
