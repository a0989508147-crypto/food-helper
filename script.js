// ⚠️ 把下面這串換成你自己的 Google API 金鑰
const GOOGLE_API_KEY = "AIzaSyBmrwjvt7f_TtwkiVf10tMetfmXo8SXp3o";

// 找到畫面上的元素
const talkButton = document.getElementById("talkButton");
const textInput = document.getElementById("textInput");
const searchButton = document.getElementById("searchButton");
const resultText = document.getElementById("result");
const decideButton = document.getElementById("decideButton");
const wheelContainer = document.getElementById("wheelContainer");
const wheelCanvas = document.getElementById("wheelCanvas");
const wheelResult = document.getElementById("wheelResult");
const historyList = document.getElementById("historyList");
const favoritesList = document.getElementById("favoritesList");
const nearbyButton = document.getElementById("nearbyButton");
const dailyPickCard = document.getElementById("dailyPickCard");
const dailyPickContent = document.getElementById("dailyPickContent");

// 存放目前搜尋到的餐廳清單，給轉盤用
let currentPlaces = [];

// 台灣地區清單
const areas = [
  "台北市","松山區","信義區","大安區","中山區","中正區","大同區","萬華區","文山區","南港區","內湖區","士林區","北投區",
  "新北市","板橋區","三重區","中和區","永和區","新莊區","新店區","樹林區","鶯歌區","三峽區","淡水區","汐止區","瑞芳區","土城區","蘆洲區","五股區","泰山區","林口區","深坑區","石碇區","坪林區","三芝區","石門區","八里區","平溪區","雙溪區","貢寮區","金山區","萬里區","烏來區",
  "桃園市","桃園區","中壢區","平鎮區","八德區","楊梅區","蘆竹區","大溪區","龍潭區","龜山區","大園區","觀音區","新屋區","復興區",
  "台中市","中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區",
  "台南市","中西區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","大內區","山上區","新市區","安定區",
  "高雄市","楠梓區","左營區","鼓山區","三民區","鹽埕區","前金區","新興區","苓雅區","前鎮區","旗津區","小港區","鳳山區","大寮區","鳥松區","林園區","仁武區","大樹區","大社區","岡山區","路竹區","橋頭區","梓官區","彌陀區","永安區","燕巢區","田寮區","阿蓮區","茄萣區","湖內區","旗山區","美濃區","內門區","杉林區","甲仙區","六龜區","桃源區","那瑪夏區","茂林區",
  "基隆市","仁愛區","信義區","安樂區","暖暖區","七堵區",
  "新竹市","香山區",
  "嘉義市",
  "新竹縣","竹北市","竹東鎮","新埔鎮","關西鎮","湖口鄉","新豐鄉","芎林鄉","橫山鄉","北埔鄉","寶山鄉","峨眉鄉","尖石鄉","五峰鄉",
  "苗栗縣","苗栗市","苑裡鎮","通霄鎮","竹南鎮","頭份市","後龍鎮","卓蘭鎮","大湖鄉","公館鄉","銅鑼鄉","南庄鄉","頭屋鄉","三義鄉","西湖鄉","造橋鄉","三灣鄉","獅潭鄉","泰安鄉",
  "彰化縣","彰化市","員林市","和美鎮","鹿港鎮","溪湖鎮","二林鎮","田中鎮","北斗鎮","花壇鄉","芬園鄉","大村鄉","永靖鄉","伸港鄉","線西鄉","福興鄉","秀水鄉","埔心鄉","埔鹽鄉","大城鄉","芳苑鄉","竹塘鄉","社頭鄉","二水鄉","田尾鄉","埤頭鄉","溪州鄉",
  "南投縣","南投市","埔里鎮","草屯鎮","竹山鎮","集集鎮","名間鄉","鹿谷鄉","中寮鄉","魚池鄉","國姓鄉","水里鄉","信義鄉","仁愛鄉",
  "雲林縣","斗六市","斗南鎮","虎尾鎮","西螺鎮","土庫鎮","北港鎮","古坑鄉","大埤鄉","莿桐鄉","林內鄉","二崙鄉","崙背鄉","麥寮鄉","東勢鄉","褒忠鄉","台西鄉","元長鄉","四湖鄉","口湖鄉","水林鄉",
  "嘉義縣","太保市","朴子市","布袋鎮","大林鎮","民雄鄉","溪口鄉","新港鄉","六腳鄉","東石鄉","義竹鄉","鹿草鄉","水上鄉","中埔鄉","竹崎鄉","梅山鄉","番路鄉","大埔鄉","阿里山鄉",
  "屏東縣","屏東市","潮州鎮","東港鎮","恆春鎮","萬丹鄉","長治鄉","麟洛鄉","九如鄉","里港鄉","鹽埔鄉","高樹鄉","萬巒鄉","內埔鄉","竹田鄉","新埤鄉","枋寮鄉","新園鄉","崁頂鄉","林邊鄉","南州鄉","佳冬鄉","琉球鄉","車城鄉","滿州鄉","枋山鄉","三地門鄉","霧台鄉","瑪家鄉","泰武鄉","來義鄉","春日鄉","獅子鄉","牡丹鄉",
  "宜蘭縣","宜蘭市","羅東鎮","蘇澳鎮","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","冬山鄉","五結鄉","三星鄉","大同鄉","南澳鄉",
  "花蓮縣","花蓮市","鳳林鎮","玉里鎮","新城鄉","吉安鄉","壽豐鄉","光復鄉","豐濱鄉","瑞穗鄉","富里鄉","秀林鄉","萬榮鄉","卓溪鄉",
  "台東縣","台東市","成功鎮","關山鎮","卑南鄉","大武鄉","太麻里鄉","東河鄉","長濱鄉","鹿野鄉","池上鄉","綠島鄉","延平鄉","海端鄉","達仁鄉","金峰鄉","蘭嶼鄉",
  "澎湖縣","馬公市","湖西鄉","白沙鄉","西嶼鄉","望安鄉","七美鄉",
  "金門縣","金城鎮","金湖鎮","金沙鎮","金寧鄉","烈嶼鄉","烏坵鄉",
  "連江縣","南竿鄉","北竿鄉","莒光鄉","東引鄉"
];

// 常見食物類型清單
const foods = [
  // 麵食類
  "牛肉麵","義大利麵","拉麵","乾麵","陽春麵","擔仔麵","餛飩麵","炸醬麵","米粉","冬粉","米苔目","麵",
  // 飯食類
  "飯","滷肉飯","雞肉飯","火雞肉飯","控肉飯","焢肉飯","便當","丼飯","燴飯","炒飯","粥",
  // 鍋物類
  "火鍋","麻辣鍋","涮涮鍋","石頭火鍋","羊肉爐","薑母鴨","臭臭鍋",
  // 小吃類
  "小吃","鹹酥雞","滷味","臭豆腐","蚵仔煎","肉圓","鹽酥雞","碗粿","蘿蔔糕","筒仔米糕","米糕","豬血糕","大腸包小腸","雞排","刈包",
  // 燒烤類
  "燒烤","炭烤","串燒","串燒燒烤","居酒屋",
  // 甜點/飲品類
  "甜點","蛋糕","冰淇淋","甜湯","豆花","刨冰","雪花冰","芋圓","仙草",
  // 早餐類
  "早餐","漢堡","三明治","蛋餅","飯糰","蘿蔔絲餅","燒餅油條",
  // 飲料類
  "咖啡","飲料","手搖飲","珍珠奶茶","果汁",
  // 異國料理
  "牛排","日式料理","壽司","定食","燒肉","韓式料理","部隊鍋","泰式料理","打拋","越南料理","河粉","義式料理","披薩","墨西哥料理","印度料理",
  // 其他
  "素食","蔬食","便利商店","早午餐","brunch"
];

// === 核心邏輯：不管文字從哪裡來（語音或打字），都走這個函式 ===
function processInput(spokenText) {
  // 判斷地區（支援完整名稱，也支援去掉最後一個字的簡稱，例如「員林」對應「員林市」）
  let foundArea = "";
  for (const area of areas) {
    if (spokenText.includes(area)) {
      if (area.length > foundArea.length) {
        foundArea = area;
      }
    }
    const shortName = area.slice(0, -1);
    if (shortName.length >= 2 && spokenText.includes(shortName)) {
      if (area.length > foundArea.length) {
        foundArea = area;
      }
    }
  }

  // 判斷食物類型（優先抓比較精確、比較長的詞）
  let foundFood = "";
  for (const food of foods) {
    if (spokenText.includes(food)) {
      if (food.length > foundFood.length) {
        foundFood = food;
      }
    }
  }

  decideButton.style.display = "none";
  decideButton.textContent = "🎡 幫我決定！";
  wheelContainer.style.display = "none";
  currentPlaces = [];

  // 完全沒抓到地區、也沒抓到食物類型 → 友善提示，不浪費查詢
  if (!foundArea && !foundFood) {
    resultText.innerHTML = `
      沒聽懂你想吃什麼耶 🤔<br>
      試試看這樣說：<br>
      <small>・「員林市 牛肉麵」<br>
      ・「我在台南想吃小吃」<br>
      ・或是只打「甜點」，讓我用你的位置幫你找</small>
    `;
    return;
  }

  const food = foundFood || "美食";

  if (foundArea) {
    resultText.textContent = `辨識結果：地區是「${foundArea}」，想吃「${food}」，搜尋中...`;
    searchRestaurants(foundArea, food);
  } else {
    resultText.textContent = "沒抓到地區，改用你目前的位置搜尋附近美食...";
    searchNearbyByLocation(food);
  }
}

// === 語音輸入 ===
const recognition = new webkitSpeechRecognition();
recognition.lang = "zh-TW";
recognition.continuous = false;

talkButton.addEventListener("click", () => {
  resultText.textContent = "聽你說...🎧";
  recognition.start();
});

recognition.onresult = (event) => {
  const spokenText = event.results[0][0].transcript;
  processInput(spokenText);
};

recognition.onerror = () => {
  resultText.textContent = "聽不清楚，再試一次";
};

// === 打字輸入 ===
searchButton.addEventListener("click", () => {
  const typedText = textInput.value.trim();
  if (typedText) {
    processInput(typedText);
  } else {
    resultText.textContent = "請先輸入文字";
  }
});

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

// === 統一處理 API 錯誤，顯示更明確的訊息 ===
function getErrorMessage(response, data) {
  if (!response.ok) {
    const reason = data && data.error && data.error.status;

    if (reason === "PERMISSION_DENIED") {
      return "API 金鑰設定有問題，請檢查金鑰是否正確、Places API (New) 是否已啟用";
    }
    if (reason === "RESOURCE_EXHAUSTED") {
      return "今天的查詢額度已經用完了，請明天再試，或檢查 Google Cloud 帳單設定";
    }
    return `搜尋失敗（${reason || response.status}），請稍後再試`;
  }
  return null;
}

// === 用地區名稱搜尋餐廳 ===
function searchRestaurants(area, food) {
  const keyword = `${area} ${food}`;

  fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.priceLevel,places.currentOpeningHours.openNow,places.photos"
    },
    body: JSON.stringify({ textQuery: keyword })
  })
    .then(response => response.json().then(data => ({ response, data })))
    .then(({ response, data }) => {
      console.log(data);
      const errorMsg = getErrorMessage(response, data);
      if (errorMsg) {
        resultText.textContent = errorMsg;
        return;
      }
      if (data.places && data.places.length > 0) {
        showResults(data.places, area, food);
      } else {
        resultText.textContent = "找不到相關餐廳，換個說法試試？";
      }
    })
    .catch(error => {
      resultText.textContent = "網路連線好像有問題，請檢查網路後再試一次";
      console.error(error);
    });
}

// === 用目前位置(GPS)搜尋附近美食 ===
function searchNearbyByLocation(food) {
  if (!navigator.geolocation) {
    resultText.textContent = "你的瀏覽器不支援定位功能";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      searchRestaurantsNearby(lat, lng, food);
    },
    (error) => {
      resultText.textContent = "無法取得你的位置，請允許定位權限，或改用打字輸入地區";
      console.error(error);
    }
  );
}

// === 用座標搜尋附近餐廳 ===
function searchRestaurantsNearby(lat, lng, food) {
  fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_API_KEY,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.location,places.priceLevel,places.currentOpeningHours.openNow,places.photos"
    },
    body: JSON.stringify({
      textQuery: food,
      locationBias: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 3000.0
        }
      }
    })
  })
    .then(response => response.json().then(data => ({ response, data })))
    .then(({ response, data }) => {
      console.log(data);
      const errorMsg = getErrorMessage(response, data);
      if (errorMsg) {
        resultText.textContent = errorMsg;
        return;
      }
      if (data.places && data.places.length > 0) {
        showResults(data.places, "附近", food, lat, lng);
      } else {
        resultText.textContent = "附近找不到相關餐廳，換個說法試試？";
      }
    })
    .catch(error => {
      resultText.textContent = "網路連線好像有問題，請檢查網路後再試一次";
      console.error(error);
    });
}

// === 顯示搜尋結果清單（含評分/距離/收藏按鈕）+ 準備轉盤資料 ===
function showResults(places, area, food, userLat, userLng) {
  const topResults = places.slice(0, 10);
  currentPlaces = topResults;

  let html = `<h3>為你推薦「${area}」的「${food}」：</h3><ul>`;
  topResults.forEach((place, i) => {
    const mapQuery = encodeURIComponent(`${place.displayName.text} ${place.formattedAddress}`);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

    const ratingText = place.rating
      ? `⭐ ${place.rating}（${place.userRatingCount || 0}則評論）`
      : "尚無評分";

    let distanceText = "";
    if (userLat && userLng && place.location) {
      const dist = calculateDistance(userLat, userLng, place.location.latitude, place.location.longitude);
      distanceText = ` ・ 📍${dist.toFixed(1)}公里`;
    }

    const priceText = getPriceText(place);
    const openText = getOpenText(place);
    const extraTags = [priceText, openText].filter(Boolean).join(" ・ ");

    let photoHtml = "";
    if (place.photos && place.photos.length > 0) {
      const photoUrl = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=400&key=${GOOGLE_API_KEY}`;
      photoHtml = `<img src="${photoUrl}" class="result-photo" onclick="window.open('${photoUrl}', '_blank')">`;
    }

    html += `<li class="result-item">
      ${photoHtml}
      <div class="result-item-info">
        <a href="${mapUrl}" target="_blank">${place.displayName.text}</a> - ${place.formattedAddress}<br>
        <small>${ratingText}${distanceText}</small>${extraTags ? ` <small>・ ${extraTags}</small>` : ""}
        <button class="favBtn" data-index="${i}">⭐收藏</button>
      </div>
    </li>`;
  });
  html += `</ul>`;
  resultText.innerHTML = html;

  document.querySelectorAll(".favBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      toggleFavorite(currentPlaces[index]);
    });
  });

  saveToHistory(area, food);

  if (topResults.length > 0) {
    decideButton.style.display = "inline-block";
  }
}

// 計算兩點距離（公里）
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// === 轉盤功能 ===
decideButton.addEventListener("click", () => {
  wheelContainer.style.display = "block";
  wheelResult.textContent = "";
  decideButton.textContent = "🎡 再轉一次！";
  drawWheel(0);
  spinWheel();
});

function drawWheel(rotation) {
  const ctx = wheelCanvas.getContext("2d");
  const centerX = 150;
  const centerY = 150;
  const radius = 140;
  const sliceAngle = (2 * Math.PI) / currentPlaces.length;
  const colors = ["#ff7f2a", "#ffb74d", "#ff8a65", "#ffca28", "#f4a261", "#e76f51", "#f6bd60", "#f28482", "#ffddd2", "#e9c46a"];

  ctx.clearRect(0, 0, 300, 300);

  currentPlaces.forEach((place, i) => {
    const startAngle = rotation + i * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 12px sans-serif";
    const shortName = place.displayName.text.length > 8
      ? place.displayName.text.slice(0, 8) + "..."
      : place.displayName.text;
    ctx.fillText(shortName, radius - 10, 5);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.moveTo(centerX - 10, 10);
  ctx.lineTo(centerX + 10, 10);
  ctx.lineTo(centerX, 30);
  ctx.closePath();
  ctx.fillStyle = "#d35400";
  ctx.fill();
}

function spinWheel() {
  const sliceAngle = (2 * Math.PI) / currentPlaces.length;
  const randomIndex = Math.floor(Math.random() * currentPlaces.length);

  const totalRotation = Math.PI * 2 * 5 + (Math.PI * 2 - (randomIndex * sliceAngle + sliceAngle / 2));

  const duration = 4000;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentRotation = totalRotation * easedProgress;

    drawWheel(currentRotation);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      const winner = currentPlaces[randomIndex];
      wheelResult.textContent = `🎉 就決定是「${winner.displayName.text}」了！`;
    }
  }

  requestAnimationFrame(animate);
}

// === 歷史紀錄功能 ===

function saveToHistory(area, food) {
  let history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  const entry = { area, food, time: new Date().toLocaleString("zh-TW") };

  history = history.filter(h => !(h.area === area && h.food === food));
  history.unshift(entry);
  history = history.slice(0, 10);

  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");

  if (history.length === 0) {
    historyList.innerHTML = "<p style='color:#999;'>還沒有搜尋紀錄</p>";
    return;
  }

  let html = "";
  history.forEach(h => {
    html += `<button class="historyItem" data-area="${h.area}" data-food="${h.food}">${h.area} ${h.food}</button>`;
  });
  historyList.innerHTML = html;

  document.querySelectorAll(".historyItem").forEach(btn => {
    btn.addEventListener("click", () => {
      const area = btn.dataset.area;
      const food = btn.dataset.food;
      resultText.textContent = `重新搜尋：「${area}」的「${food}」...`;
      searchRestaurants(area, food);
    });
  });
}

// === 收藏功能 ===

function toggleFavorite(place) {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const exists = favorites.some(f => f.name === place.displayName.text && f.address === place.formattedAddress);

  if (exists) {
    favorites = favorites.filter(f => !(f.name === place.displayName.text && f.address === place.formattedAddress));
  } else {
    favorites.push({
      name: place.displayName.text,
      address: place.formattedAddress,
      rating: place.rating || null
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p style='color:#999;'>還沒有收藏的店家</p>";
    return;
  }

  let html = "<ul>";
  favorites.forEach(f => {
    const mapQuery = encodeURIComponent(`${f.name} ${f.address}`);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    const ratingText = f.rating ? ` ⭐${f.rating}` : "";
    html += `<li><a href="${mapUrl}" target="_blank">${f.name}</a>${ratingText} - ${f.address}
      <button class="removeFavorite" data-name="${f.name}" data-address="${f.address}">移除</button></li>`;
  });
  html += "</ul>";
  favoritesList.innerHTML = html;

  document.querySelectorAll(".removeFavorite").forEach(btn => {
    btn.addEventListener("click", () => {
      let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      favorites = favorites.filter(f => !(f.name === btn.dataset.name && f.address === btn.dataset.address));
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });
  });
}

// === 附近餐廳快速按鈕 ===
nearbyButton.addEventListener("click", () => {
  decideButton.style.display = "none";
  decideButton.textContent = "🎡 幫我決定！";
  wheelContainer.style.display = "none";
  currentPlaces = [];
  resultText.textContent = "正在取得你的位置，搜尋附近餐廳...";
  searchNearbyByLocation("餐廳");
});

// === 價格 / 營業狀態的顯示文字 ===
function getPriceText(place) {
  const map = {
    "PRICE_LEVEL_FREE": "免費",
    "PRICE_LEVEL_INEXPENSIVE": "平價（約 NT$100-200）",
    "PRICE_LEVEL_MODERATE": "中價位（約 NT$200-400）",
    "PRICE_LEVEL_EXPENSIVE": "高價位（約 NT$400-800）",
    "PRICE_LEVEL_VERY_EXPENSIVE": "奢華（NT$800以上）"
  };
  return map[place.priceLevel] || "";
}

function getOpenText(place) {
  if (!place.currentOpeningHours || typeof place.currentOpeningHours.openNow !== "boolean") {
    return "";
  }
  return place.currentOpeningHours.openNow
    ? `<span class="tag-open">營業中</span>`
    : `<span class="tag-closed">休息中</span>`;
}

// === 每日推薦 ===
function loadDailyPick() {
  const today = new Date().toLocaleDateString("zh-TW");
  const saved = JSON.parse(localStorage.getItem("dailyPick") || "null");

  if (saved && saved.date === today) {
    renderDailyPick(saved.place);
    return;
  }

  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.currentOpeningHours.openNow,places.photos"
        },
        body: JSON.stringify({
          textQuery: "美食",
          locationBias: {
            circle: { center: { latitude: lat, longitude: lng }, radius: 3000.0 }
          }
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.places && data.places.length > 0) {
            const randomPlace = data.places[Math.floor(Math.random() * data.places.length)];
            localStorage.setItem("dailyPick", JSON.stringify({ date: today, place: randomPlace }));
            renderDailyPick(randomPlace);
          }
        })
        .catch(error => console.error(error));
    },
    (error) => {
      console.error("每日推薦需要定位權限", error);
    }
  );
}

function renderDailyPick(place) {
  const mapQuery = encodeURIComponent(`${place.displayName.text} ${place.formattedAddress}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const ratingText = place.rating ? `⭐ ${place.rating}（${place.userRatingCount || 0}則評論）` : "尚無評分";
  const priceText = getPriceText(place);
  const openText = getOpenText(place);

  // 最多取 3 張照片，做成小圖庫，點擊可以放大看
  let galleryHtml = "";
  if (place.photos && place.photos.length > 0) {
    const photoUrls = place.photos.slice(0, 3).map(p =>
      `https://places.googleapis.com/v1/${p.name}/media?maxWidthPx=700&key=${GOOGLE_API_KEY}`
    );
    galleryHtml = `<div class="daily-gallery">` +
      photoUrls.map(url => `<img src="${url}" class="daily-photo" onclick="window.open('${url}', '_blank')">`).join("") +
      `</div>`;
  }

  dailyPickContent.innerHTML = `
    ${galleryHtml}
    <div class="daily-info">
      <p class="daily-name">${place.displayName.text}</p>
      <p class="daily-address">${place.formattedAddress}</p>
      <p class="daily-meta">${ratingText}${priceText ? " ・ " + priceText : ""}${openText ? " ・ " + openText : ""}</p>
      <a href="${mapUrl}" target="_blank" class="daily-map-btn">📍 在 Google 地圖開啟</a>
    </div>
  `;
  dailyPickCard.style.display = "block";
}

// 網頁一打開，先把之前存的歷史紀錄跟收藏畫出來
renderHistory();
renderFavorites();
loadDailyPick();
