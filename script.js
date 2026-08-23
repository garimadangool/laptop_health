function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

const NOTES = {
  A: "Top of the class! Your laptop is living its best life.",
  B: "Solid effort. A little cleanup and it is an easy A.",
  C: "Average. Your laptop is doing homework at the last minute.",
  D: "Barely passing. Close some tabs and free some space.",
  F: "Your laptop is failing. Detention: delete junk files and charge the battery."
};

function toneClass(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "mid";
  return "bad";
}

function buildSubjects(r) {
  const batteryDetail = r.charging
    ? "Charging right now (" + r.battery + "%)"
    : "On battery power (" + r.battery + "%)";
  return [
    { icon: "💾", name: "Disk Space", score: 100 - r.diskUsed, detail: r.diskUsed + "% of your disk is used" },
    { icon: "🧠", name: "RAM Health", score: 100 - r.ramUsed, detail: r.ramUsed + "% of memory in use" },
    { icon: "⚡", name: "CPU Calmness", score: 100 - r.cpuLoad, detail: "Processor load at " + r.cpuLoad + "%" },
    { icon: "🔋", name: "Battery", score: r.battery, detail: batteryDetail }
  ];
}

function diagnose(r) {
  const issues = [];
  if (r.diskUsed >= 85) {
    issues.push({ level: "bad", text: "💾 Disk is " + r.diskUsed + "% full. Delete old files from Downloads and Recycle Bin." });
  } else if (r.diskUsed >= 70) {
    issues.push({ level: "warn", text: "💾 Disk is " + r.diskUsed + "% full. Getting crowded in there." });
  }
  if (r.ramUsed >= 85) {
    issues.push({ level: "bad", text: "🧠 RAM at " + r.ramUsed + "%. Close browser tabs — Chrome is eating your memory." });
  } else if (r.ramUsed >= 70) {
    issues.push({ level: "warn", text: "🧠 RAM at " + r.ramUsed + "%. A bit heavy." });
  }
  if (r.cpuLoad >= 80) {
    issues.push({ level: "bad", text: "⚡ CPU at " + r.cpuLoad + "%. Something is working overtime — check Running list below." });
  } else if (r.cpuLoad >= 60) {
    issues.push({ level: "warn", text: "⚡ CPU at " + r.cpuLoad + "%. Moderate activity." });
  }
  if (!r.charging && r.battery < 25) {
    issues.push({ level: "bad", text: "🔋 Battery at " + r.battery + "% and not charging. Plug in!" });
  } else if (!r.charging && r.battery < 45) {
    issues.push({ level: "warn", text: "🔋 Battery at " + r.battery + "%. Keep a charger nearby." });
  }
  if (issues.length === 0) {
    issues.push({ level: "ok", text: "🎉 No problems found. Straight-A laptop behavior!" });
  }
  return issues;
}

function renderSubjects(subjects) {
  const wrap = document.getElementById("subjects");
  wrap.innerHTML = "";
  subjects.forEach(function (s) {
    const card = document.createElement("div");
    card.className = "subject-card";

    const top = document.createElement("div");
    top.className = "subject-top";

    const icon = document.createElement("span");
    icon.className = "subject-icon";
    icon.textContent = s.icon;

    const name = document.createElement("span");
    name.className = "subject-name";
    name.textContent = s.name;

    const pct = document.createElement("span");
    pct.className = "subject-pct";
    pct.textContent = Math.round(s.score) + "%";

    const chip = document.createElement("span");
    chip.className = "grade-chip chip-" + toneClass(s.score);
    chip.textContent = getGrade(s.score);

    top.appendChild(icon);
    top.appendChild(name);
    top.appendChild(pct);
    top.appendChild(chip);

    const track = document.createElement("div");
    track.className = "bar-track";

    const fill = document.createElement("div");
    fill.className = "bar-fill fill-" + toneClass(s.score);
    requestAnimationFrame(function () {
      fill.style.width = Math.max(0, Math.min(100, s.score)) + "%";
    });

    track.appendChild(fill);

    const detail = document.createElement("div");
    detail.className = "subject-detail";
    detail.textContent = s.detail;

    card.appendChild(top);
    card.appendChild(track);
    card.appendChild(detail);
    wrap.appendChild(card);
  });
}

function renderDiagnosis(issues) {
  const list = document.getElementById("diagnosis");
  list.innerHTML = "";
  issues.forEach(function (i) {
    const li = document.createElement("li");
    li.className = "issue issue-" + i.level;
    li.textContent = i.text;
    list.appendChild(li);
  });
}

function renderProcesses(procs) {
  const list = document.getElementById("processes");
  list.innerHTML = "";
  procs.forEach(function (p, i) {
    const li = document.createElement("li");
    li.className = "proc-row";

    const label = document.createElement("span");
    label.innerHTML = '<span class="proc-rank">#' + (i + 1) + '</span>' + p.name;

    const mb = document.createElement("span");
    mb.className = "proc-mb";
    mb.textContent = p.mb + " MB";

    li.appendChild(label);
    li.appendChild(mb);
    list.appendChild(li);
  });
}

function renderWifi(wifi) {
  const list = document.getElementById("wifi");
  list.innerHTML = "";

  if (!wifi || !wifi.ssid || wifi.ssid === "Not connected") {
    const li = document.createElement("li");
    li.className = "dim";
    li.textContent = "Not connected to any WiFi.";
    list.appendChild(li);
    return;
  }

  const nameRow = document.createElement("li");
  nameRow.className = "wifi-name";
  nameRow.innerHTML = '📡 <strong>' + wifi.ssid + '</strong>';

  const speedRow = document.createElement("li");
  speedRow.className = "spec-row";
  speedRow.innerHTML = '<span>Link speed</span><span class="spec-val">' + wifi.rxRate + '</span>';

  const signalRow = document.createElement("li");
  signalRow.className = "spec-row";

  let quality = "Poor 😞", qClass = "issue-bad";
  if (wifi.signal >= 80) { quality = "Excellent 🔥"; qClass = "issue-ok"; }
  else if (wifi.signal >= 60) { quality = "Good 👍"; qClass = "issue-warn"; }
  else if (wifi.signal >= 40) { quality = "Fair 😐"; qClass = "issue-warn"; }

  signalRow.innerHTML = '<span>Signal</span><span class="' + qClass + ' sig-pill">' + wifi.signal + '% &mdash; ' + quality + '</span>';

  list.appendChild(nameRow);
  list.appendChild(speedRow);
  list.appendChild(signalRow);
}

function renderSpecs(specs) {
  const list = document.getElementById("specs");
  list.innerHTML = "";
  const rows = [
    ["Brand", specs.brand],
    ["Model", specs.model],
    ["Processor", specs.cpu],
    ["Graphics", specs.gpu],
    ["RAM", specs.ramGB + " GB"],
    ["OS", specs.os],
    ["Screen", specs.resolution]
  ];
  rows.forEach(function (r) {
    const li = document.createElement("li");
    li.className = "spec-row";
    li.innerHTML = '<span>' + r[0] + '</span><span class="spec-val">' + r[1] + '</span>';
    list.appendChild(li);
  });
}

function updateHistory(overall, stamp) {
  const el = document.getElementById("history");
  const predEl = document.getElementById("prediction");
  const hist = JSON.parse(localStorage.getItem("doccheck-history") || "[]");

  if (hist.length > 0) {
    const prev = hist[hist.length - 1].s;
    const diff = Math.round(overall) - prev;
    if (diff > 0) {
      el.textContent = "📈 Up " + diff + " points since last check. Improvement detected!";
    } else if (diff < 0) {
      el.textContent = "📉 Down " + Math.abs(diff) + " points since last check. We need to talk.";
    } else {
      el.textContent = "➖ Same score as last check. Consistent... suspiciously consistent.";
    }
  } else {
    el.textContent = "First scan saved! Run DocCheck again later to unlock trend predictions.";
  }

  hist.push({ s: Math.round(overall), t: stamp });
  while (hist.length > 8) hist.shift();
  localStorage.setItem("doccheck-history", JSON.stringify(hist));

  renderChart(hist);

  if (hist.length >= 4) {
    const half = Math.floor(hist.length / 2);
    let oldSum = 0, newSum = 0;
    for (let i = 0; i < half; i++) oldSum += hist[i].s;
    for (let i = half; i < hist.length; i++) newSum += hist[i].s;
    const oldAvg = oldSum / half, newAvg = newSum / (hist.length - half);
    if (newAvg > oldAvg) {
      predEl.textContent = "🔮 DocCheck AI: trending UP (+" + Math.round(newAvg - oldAvg) + " pts avg). Keep it up!";
    } else {
      predEl.textContent = "🔮 DocCheck AI: trending DOWN (" + Math.round(newAvg - oldAvg) + " pts avg). A cleanup is coming...";
    }
  }
}

function renderChart(hist) {
  const chart = document.getElementById("chart");
  chart.innerHTML = "";
  if (hist.length < 2) return;
  hist.forEach(function (h) {
    const col = document.createElement("div");
    col.className = "chart-bar";
    const fill = document.createElement("div");
    fill.className = "chart-fill fill-" + toneClass(h.s);
    fill.style.height = "0";
    fill.title = h.t + " — " + h.s + "%";
    requestAnimationFrame(function () {
      fill.style.height = Math.max(4, h.s) + "%";
    });
    col.appendChild(fill);
    chart.appendChild(col);
  });
}

function countUp(el, target) {
  let current = 0;
  const step = Math.max(1, Math.round(target / 30));
  const timer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 25);
}

function confettiBurst() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#e74c3c", "#f1c40f", "#2ecc71", "#5b6ef5", "#8f5bf0"];
  const bits = [];
  for (let i = 0; i < 130; i++) {
    bits.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 7,
      h: 8 + Math.random() * 9,
      vy: 2 + Math.random() * 3.5,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * 360,
      vr: -6 + Math.random() * 12,
      color: colors[i % colors.length]
    });
  }

  let frames = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bits.forEach(function (b) {
      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.vr;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot * Math.PI / 180);
      ctx.fillStyle = b.color;
      ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
      ctx.restore();
    });
    frames++;
    if (frames < 220) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

function main() {
  if (typeof window.REPORT === "undefined") {
    document.getElementById("teacher-note").textContent =
      'No scan found. Open Git Bash in this folder, run "bash health.sh", then refresh this page.';
    return;
  }

  const r = window.REPORT;

  document.getElementById("scan-date").textContent = "Scanned on " + r.scannedAt;

  const subjects = buildSubjects(r);
  renderSubjects(subjects);
  renderDiagnosis(diagnose(r));
  renderProcesses(r.topProcesses || []);
  renderWifi(r.wifi);
  if (r.specs) renderSpecs(r.specs);

  const overall = subjects.reduce(function (sum, s) { return sum + s.score; }, 0) / subjects.length;

  countUp(document.getElementById("overall-percent"), Math.round(overall));
  document.getElementById("overall-grade").textContent = getGrade(overall);
  document.getElementById("teacher-note").textContent = NOTES[getGrade(overall)];

  updateHistory(overall, r.scannedAt);

  if (getGrade(overall) === "A") {
    setTimeout(confettiBurst, 400);
  }
}

document.getElementById("print-btn").addEventListener("click", function () {
  window.print();
});

main();
