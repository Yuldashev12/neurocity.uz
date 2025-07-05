// status.js

// Bu yerga o'zingizning server IP yoki domen nomingizni yozing
const serverIP = "neurocity.game4free.net";

const statusSpan       = document.getElementById("status");
const onlineCountSpan  = document.getElementById("online-count");
const playersListUL    = document.getElementById("players-list");

async function loadServerStatus() {
  try {
    const res  = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await res.json();

    if (data.online) {
      // Server ONLINE
      statusSpan.textContent      = "✅ Server faol!";
      statusSpan.className        = "status-online";
      onlineCountSpan.textContent = `${data.players.online} / ${data.players.max}`;

      // O‘yinchilar ro‘yxatini yangilash
      playersListUL.innerHTML = "";
      // API qaytargan sample/list maydonlari
      const list = data.players.sample || data.players.list || [];
      list.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.name || p;
        playersListUL.appendChild(li);
      });

    } else {
      // Server OFFLINE
      statusSpan.textContent      = "❌ Server o'chirilgan.";
      statusSpan.className        = "status-offline";
      onlineCountSpan.textContent = "0";
      playersListUL.innerHTML     = "";
    }

  } catch (err) {
    // Xatolik yuz berdi
    console.error("Statusni olishda xatolik:", err);
    statusSpan.textContent      = "⚠️ Server holatini tekshirib bo‘lmadi.";
    statusSpan.className        = "status-offline";
    onlineCountSpan.textContent = "-";
    playersListUL.innerHTML     = "";
  }
}

// Birinchi yuklash
loadServerStatus();

// Har 30 soniyada yangilash
setInterval(loadServerStatus, 30000);
