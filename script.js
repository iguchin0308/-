"use strict";

const CARDS = [

  // --- ベース ---
  { title: "白熊", category: "服装", rule: "白い服や小物を身に着けている人が飲む。" },
  { title: "ずっとも", category: "席順", rule: "引いた人の両隣が飲む。" },
  { title: "誕生日ボーイ&ガール", category: "プロフィール", rule: "誕生日が近い人（今月 or 来月）が飲む。該当なしなら引いた人。" },

  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む。" },
  { title: "水チェイサー", category: "休憩", rule: "全員、水を一口飲む。" },

  { title: "じゃんけん王", category: "即決", rule: "全員でじゃんけん。負けた人が飲む。" },
  { title: "共通点探し", category: "即決", rule: "引いた人が全員の共通点を1つ即答。10秒以内に出なければ全員1口。" },
  { title: "指差し", category: "即決", rule: "せーので指差し。一番指さされた人が飲む（同票なら同票）。" },
  { title: "独裁", category: "全体", rule: "引いた人以外、全員が飲む。" },

  { title: "右隣", category: "席順", rule: "引いた人の右隣が飲む。" },
  { title: "左隣", category: "席順", rule: "引いた人の左隣が飲む。" },
  { title: "向かい", category: "席順", rule: "引いた人の向かい（正面）が飲む。" },

  { title: "偶数席", category: "席順", rule: "偶数席の人が飲む（数え方は引いた人が決める）。" },
  { title: "奇数席", category: "席順", rule: "奇数席の人が飲む（数え方は引いた人が決める）。" },

  { title: "最年長", category: "プロフィール", rule: "この場で一番年上が飲む。" },
  { title: "最年少", category: "プロフィール", rule: "この場で一番年下が飲む。" },

  { title: "メデゥーサ", category: "心理戦", rule: "引いた人と最初に目が合った人が飲む。10秒誰とも合わなければ引いた人。" },
  { title: "遅刻", category: "当日ネタ", rule: "今日一番遅刻した人が飲む。" },
  { title: "人気者", category: "即決", rule: "一番最初に通知が来た人が飲む。" },
  { title: "キス", category: "暴露", rule: "一番最近キスした人が飲む（言いたくない場合は1口）。" },
  { title: "ラッパー", category: "チャレンジ", rule: "早口言葉を順番に言う。噛んだ人が飲む。" },
  { title: "乾杯", category: "全体", rule: "全員飲む。" },
  { title: "究極の選択", category: "選択", rule: "2口飲むか、誰にも言ってない秘密を1つ言う。" },
  { title: "倍々ファイト", category: "罰ゲーム", rule: "引いた人が2口飲む。" },
  { title: "お残しダメよ", category: "量チェック", rule: "一番グラスに残っている人が飲み干す。" },

  { title: "瞬間ミラー", category: "心理戦", rule: "引いた人が突然ポーズ。最後に真似できた人が飲む。" },
  { title: "二択ジャッジ", category: "即決", rule: "引いた人が二択を出す。少数派が飲む。" },
  { title: "多数決", category: "即決", rule: "引いた人が質問。少数派が飲む。" },
  { title: "3・2・1", category: "即決", rule: "せーので1〜3を出す。一番少ない数字を出した人が飲む。" },
  { title: "ワンワード", category: "即決", rule: "お題に対し1語回答。被った人が飲む。" },

  { title: "電池残量（少ない）", category: "即決", rule: "スマホの電池が一番少ない人が飲む。" },
  { title: "電池残量（多い）", category: "即決", rule: "スマホの電池が一番多い人が飲む。" },

  { title: "一斉に乾杯", category: "全体", rule: "グラスを上げるのが一番遅かった人が飲む。" },
  { title: "連想ゲーム", category: "チャレンジ", rule: "連想を順番に言う。詰まった人が飲む。" },
  { title: "セーフティ", category: "休憩", rule: "飲まなくてOK。水を一口でも可。" },

  // ★バリア2枚
  { title: "バリア", category: "効果", rule: "次に自分が飲む指示を1回だけ無効化できる。" },
  { title: "バリア", category: "効果", rule: "次に自分が飲む指示を1回だけ無効化できる。" },

  // ★ガードマン2枚
  { title: "ガードマン", category: "効果", rule: "自分以外の1人を守れる。次の飲み指示を無効化。" },
  { title: "ガードマン", category: "効果", rule: "自分以外の1人を守れる。次の飲み指示を無効化。" },

  // ★追加
  { title: "なにした", category: "即決", rule: "直近1週間で○○した人は飲む（○○は引いた人が決める）。" }

];

// --- 既存ロジック ---
let deck = [];
let drawnCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  deck = shuffle([...CARDS]);
  drawnCount = 0;
  updateUI();
}

function drawCard() {
  if (deck.length === 0) {
    alert("全カード終了！");
    return;
  }

  const card = deck.pop();
  drawnCount++;

  document.getElementById("card-title").textContent = card.title;
  document.getElementById("card-category").textContent = card.category;
  document.getElementById("card-rule").textContent = card.rule;

  updateUI();
}

function updateUI() {
  document.getElementById("remaining-count").textContent =
    `残り ${deck.length} / ${CARDS.length}`;
}

console.log("カード枚数:", CARDS.length);
initGame();
