const splash = document.getElementById("splash");
const fixedHeader = document.getElementById("fixedHeader");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");

let selectedPref = "";
let userName = "";

// 都道府県リスト（日本語ファイル名に対応）
const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

// スプラッシュ → ステップ1へ
window.onload = () => {
  splash.style.opacity = 1;
  setTimeout(() => {
    splash.style.opacity = 0;
    setTimeout(() => {
      splash.style.display = "none";
      fixedHeader.style.display = "block";
      step1.style.display = "block";
    }, 1000);
  }, 1000);

  generatePrefectureList();
};

// 都道府県ボタンを生成
function generatePrefectureList() {
  const list = document.getElementById("prefectureList");
  prefectures.forEach(pref => {
    const img = document.createElement("img");
    img.src = `images/${pref}.png`;
    img.alt = pref;
    img.className = "prefImage";
    img.onclick = () => {
      selectedPref = pref;
      step1.style.display = "none";
      step2.style.display = "block";
    };
    list.appendChild(img);
  });
}

// 名前 → OK → ハンコ生成
document.getElementById("nameOk").onclick = () => {
  userName = document.getElementById("nameInput").value.trim();
  if (!userName) {
    alert("名前を入力してください");
    return;
  }
  step2.style.display = "none";
  step3.style.display = "block";

  setTimeout(drawHanko, 2000); // 2秒遅れて描画
};

// ハンコ描画
function drawHanko() {
  const canvas = document.getElementById("hankoCanvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = `images/${selectedPref}.png`;
  img.onload = () => {
    ctx.clearRect(0, 0, 300, 300);
    ctx.drawImage(img, 0, 0, 300, 300);

    let fontSize = 40;
    ctx.font = `bold ${fontSize}px serif`;
    ctx.fillStyle = "#cc0000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    while (ctx.measureText(userName).width > 180 && fontSize > 12) {
      fontSize--;
      ctx.font = `bold ${fontSize}px serif`;
    }

    ctx.fillText(userName, 150, 150);
  };
}

// ダウンロード
document.getElementById("downloadBtn").onclick = () => {
  const canvas = document.getElementById("hankoCanvas");
  const link = document.createElement("a");
  link.download = `${selectedPref}_${userName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
