async function updateServerStatus() {
  const serverIP = "138.201.48.55:25777";

  try {
    const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await response.json();

    const statusEl = document.getElementById("status");
    const countEl = document.getElementById("online-count");
    const listEl = document.getElementById("player-list");

    if (data.online) {
      statusEl.innerHTML = '🟢 Online';
      countEl.innerText = data.players.online;

      // O'yinchi ro'yxatini yangilash
      listEl.innerHTML = "";
      if (data.players.list && data.players.list.length > 0) {
        data.players.list.forEach(player => {
          const li = document.createElement("li");
          li.textContent = player;
          listEl.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.textContent = "O‘yinchi nomlari ko‘rsatilmagan";
        listEl.appendChild(li);
      }
    } else {
      statusEl.innerHTML = '🔴 Offline';
      countEl.innerText = 0;
      listEl.innerHTML = "<li>Server ishlamayapti</li>";
    }
  } catch (error) {
    console.error("Xatolik:", error);
    document.getElementById("status").innerText = "Xatolik";
    document.getElementById("online-count").innerText = "0";
    document.getElementById("player-list").innerHTML = "<li>Ulanishda xatolik</li>";
  }
}

updateServerStatus();
setInterval(updateServerStatus, 1000); // 10 sekundda bir yangilanadi
