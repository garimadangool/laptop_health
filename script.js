let LANG = localStorage.getItem("doccheck-lang") || "en";

const T = {
  subtitle: { en: "Laptop Health Report Card", ne: "ल्यापटप स्वास्थ्य प्रतिवेदन" },
  stamp_label: { en: "Grade", ne: "ग्रेड" },
  score_label: { en: "Overall Health Score", ne: "कुल स्वास्थ्य अंक" },
  no_scan: { en: 'No scan found. Open Git Bash here, run "bash health.sh", then refresh.', ne: 'स्क्यान भेटिएन। Git Bash खोलेर "bash health.sh" चलाउनुहोस्, अनी रिफ्रेस गर्नुहोस्।' },
  waiting: { en: "Waiting for results...", ne: "नतिजा पर्खँदै..." },
  s_disk: { en: "Disk Space", ne: "डिस्क ठाउँ" },
  s_ram: { en: "RAM Health", ne: "RAM स्वास्थ्य" },
  s_cpu: { en: "CPU Calmness", ne: "CPU शान्ति" },
  s_battery: { en: "Battery", ne: "ब्याट्री" },
  p_prescription: { en: "🩺 Doctor’s Prescription", ne: "🩺 डाक्टरको सल्लाह" },
  p_running: { en: "⚙️ Running Right Now", ne: "⚙️ अहिले चलिरहेका" },
  p_wifi: { en: "📶 WiFi Connection", ne: "📶 वाइफाई जडान" },
  p_laptop: { en: "💻 This Laptop", ne: "💻 यो ल्यापटप" },
  p_storage: { en: "💿 Storage Drives", ne: "💿 भण्डारण ड्राइभ" },
  p_startup: { en: "🚀 Starts With Your Laptop", ne: "🚀 सुरु हुने एपहरू" },
  print_btn: { en: "🖨️ Print Report Card", ne: "🖨️ प्रिन्ट गर्नुहोस्" },
  csv_btn: { en: "⬇️ Export CSV", ne: "⬇️ CSV डाउनलोड" },
  lang_switch: { en: "नेपाली", ne: "English" },
  disk_used: { en: "{x}% of your disk is used", ne: "डिस्कको {x}% प्रयोग भएको छ" },
  ram_used: { en: "{x}% of memory in use", ne: "मेमोरीको {x}% प्रयोगमा छ" },
  cpu_load: { en: "Processor load at {x}%", ne: "प्रोसेसर लोड {x}%" },
  charging_now: { en: "Charging right now ({x}%)", ne: "अहिले चार्ज हुँदैछ ({x}%)" },
  on_battery: { en: "On battery power ({x}%)", ne: "ब्याट्रीमा चलिरहेको ({x}%)" },
  keeps_cap: { en: "keeps {x}% of factory capacity", ne: "फ्याक्ट्री क्षमताको {x}% कायम छ" },
  disk_bad: { en: "💾 Disk is {x}% full. Delete old files from Downloads and Recycle Bin.", ne: "💾 डिस्क {x}% भरियो। पुराना फाइलहरू मेट्नुहोस्।" },
  disk_warn: { en: "💾 Disk is {x}% full. Getting crowded in there.", ne: "💾 डिस्क {x}% भरिएको छ। अलि बढी भयो।" },
  ram_bad: { en: "🧠 RAM at {x}%. Close browser tabs — Chrome is eating your memory.", ne: "🧠 RAM {x}%। ब्राउजर ट्याबहरू बन्द गर्नुहोस्।" },
  ram_warn: { en: "🧠 RAM at {x}%. A bit heavy.", ne: "🧠 RAM {x}%। अलि बढी भयो।" },
  cpu_bad: { en: "⚡ CPU at {x}%. Something is working overtime — check Running list below.", ne: "⚡ CPU {x}%। केही अत्यधिक चलिरहेको छ — तलको सूची हेर्नुहोस्।" },
  cpu_warn: { en: "⚡ CPU at {x}%. Moderate activity.", ne: "⚡ CPU {x}%। मध्यम गतिविधि।" },
  batt_low: { en: "🔋 Battery at {x}% and not charging. Plug in!", ne: "🔋 ब्याट्री {x}% र चार्ज हुँदैछैन। प्लग हाल्नुहोस्!" },
  batt_mid: { en: "🔋 Battery at {x}%. Keep a charger nearby.", ne: "🔋 ब्याट्री {x}%। चार्जर नजिकै राख्नुहोस्।" },
  wear_bad: { en: "🔋 Battery has lost {x}% of its factory capacity. Consider a replacement soon.", ne: "🔋 ब्याट्रीले फ्याक्ट्री क्षमताको {x}% गुमाइसकेको छ। चाँडै सट्टा गर्नुहोस्।" },
  wear_warn: { en: "🔋 Battery wear at {x}%. Aging normally, but keep an eye on it.", ne: "🔋 ब्याट्री घिसार {x}%। सामान्य तर ध्यान दिनुहोस्।" },
  drive_fail: { en: "💿 Drive '{x}' reports bad health. Back up your files NOW!", ne: "💿 ड्राइभ '{x}' मा समस्या देखियो। फाइलहरूको ब्याकअप लिनुहोस्!" },
  all_ok: { en: "🎉 No problems found. Straight-A laptop behavior!", ne: "🎉 कुनै समस्या भेटिएन। उत्कृष्ट ल्यापटप!" },
  note_A: { en: "Top of the class! Your laptop is living its best life.", ne: "कक्षामा पहिलो! तपाईंको ल्यापटप उत्कृष्ट अवस्थामा छ।" },
  note_B: { en: "Solid effort. A little cleanup and it is an easy A.", ne: "राम्रो प्रयास। अलिकति सफा गरे सजिलै A।" },
  note_C: { en: "Average. Your laptop is doing homework at the last minute.", ne: "ठीकै छ। ल्यापटपले आखिरी बेलामा मात्र होमवर्क गर्छ।" },
  note_D: { en: "Barely passing. Close some tabs and free some space.", ne: "मुस्किलले पास। केही ट्याब बन्द गरी ठाउँ खाली गर्नुहोस्।" },
  note_F: { en: "Your laptop is failing. Detention: delete junk files and charge the battery.", ne: "तपाईंको ल्यापटप फेल भयो। जंक फाइल मेट्नुहोस् र ब्याट्री चार्ज गर्नुहोस्।" },
  hist_up: { en: "📈 Up {x} points since last check. Improvement detected!", ne: "📈 पछिल्लो जाँचभन्दा {x} अंक बढ्यो! सुधार!" },
  hist_down: { en: "📉 Down {x} points since last check. We need to talk.", ne: "📉 पछिल्लो जाँचभन्दा {x} अंक घट्यो। कुरा गर्नैपर्छ।" },
  hist_same: { en: "➖ Same score as last check. Consistent... suspiciously consistent.", ne: "➖ पछिल्लो जाँचजस्तै अंक। सन्देहास्पद रूपमा स्थिर।" },
  hist_first: { en: "First scan saved! Run DocCheck again later to unlock trend predictions.", ne: "पहिलो स्क्यान सुरक्षित! पछि फेरि स्क्यान गर्नुहोस्, ट्रेन्ड हेर्न सकिनेछ।" },
  pred_up: { en: "🔮 DocCheck AI: trending UP (+{x} pts avg). Keep it up!", ne: "🔮 DocCheck AI: ट्रेन्ड माथि (+{x} औसत)। यस्तै गर्दै गर्नुहोस्!" },
  pred_down: { en: "🔮 DocCheck AI: trending DOWN ({x} pts avg). A cleanup is coming...", ne: "🔮 DocCheck AI: ट्रेन्ड तल ({x} औसत)। सफाई आवश्यक..." },
  q_excellent: { en: "Excellent 🔥", ne: "उत्कृष्ट 🔥" },
  q_good: { en: "Good 👍", ne: "राम्रो 👍" },
  q_fair: { en: "Fair 😐", ne: "ठीक 😐" },
  q_poor: { en: "Poor 😞", ne: "कमजोर 😞" },
  link_speed: { en: "Link speed", ne: "लिंक गति" },
  signal_lbl: { en: "Signal", ne: "सिग्नल" },
  not_connected_wifi: { en: "Not connected to any WiFi.", ne: "कुनै वाइफाईमा जडान छैन।" },
  lbl_brand: { en: "Brand", ne: "ब्रान्ड" },
  lbl_cpu: { en: "Processor", ne: "प्रोसेसर" },
  lbl_gpu: { en: "Graphics", ne: "ग्राफिक्स" },
  lbl_ram: { en: "Memory", ne: "मेमोरी" },
  lbl_board: { en: "Motherboard", ne: "मदरबोर्ड" },
  lbl_bios: { en: "BIOS", ne: "BIOS" },
  lbl_os: { en: "OS", ne: "OS" },
  lbl_screen: { en: "Screen", ne: "स्क्रिन" },
  lbl_uptime: { en: "Uptime", ne: "चलेको समय" }
};

function t(key, vars) {
  let str = (T[key] && (T[key][LANG] || T[key].en)) || key;
  if (vars) {
    Object.keys(vars).forEach(function (k) {
      str = str.split("{" + k + "}").join(vars[k]);
    });
  }
  return str;
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function toneClass(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "mid";
  return "bad";
}

let LAST_SUBJECTS = [];
let LAST_OVERALL = 0;

function buildSubjects(r) {
  let batteryDetail = r.charging ? t("charging_now", { x: r.battery }) : t("on_battery", { x: r.battery });
  if (typeof r.batteryWear === "number" && r.batteryWear >= 0) {
    batteryDetail += " · " + t("keeps_cap", { x: 100 - r.batteryWear });
  }
  return [
    { icon: "💾", name: t("s_disk"), score: 100 - r.diskUsed, detail: t("disk_used", { x: r.diskUsed }) },
    { icon: "🧠", name: t("s_ram"), score: 100 - r.ramUsed, detail: t("ram_used", { x: r.ramUsed }) },
    { icon: "⚡", name: t("s_cpu"), score: 100 - r.cpuLoad, detail: t("cpu_load", { x: r.cpuLoad }) },
    { icon: "🔋", name: t("s_battery"), score: r.battery, detail: batteryDetail }
  ];
}

function diagnose(r) {
  const issues = [];
  if (r.diskUsed >= 85) issues.push({ level: "bad", key: "disk_bad", x: r.diskUsed });
  else if (r.diskUsed >= 70) issues.push({ level: "warn", key: "disk_warn", x: r.diskUsed });
  if (r.ramUsed >= 85) issues.push({ level: "bad", key: "ram_bad", x: r.ramUsed });
  else if (r.ramUsed >= 70) issues.push({ level: "warn", key: "ram_warn", x: r.ramUsed });
  if (r.cpuLoad >= 80) issues.push({ level: "bad", key: "cpu_bad", x: r.cpuLoad });
  else if (r.cpuLoad >= 60) issues.push({ level: "warn", key: "cpu_warn", x: r.cpuLoad });
  if (!r.charging && r.battery < 25) issues.push({ level: "bad", key: "batt_low", x: r.battery });
  else if (!r.charging && r.battery < 45) issues.push({ level: "warn", key: "batt_mid", x: r.battery });
  if (typeof r.batteryWear === "number" && r.batteryWear >= 25) issues.push({ level: "bad", key: "wear_bad", x: r.batteryWear });
  else if (typeof r.batteryWear === "number" && r.batteryWear >= 15) issues.push({ level: "warn", key: "wear_warn", x: r.batteryWear });
  (r.storage || []).forEach(function (d) {
    if (d.health && d.health.toLowerCase() !== "healthy") {
      issues.push({ level: "bad", key: "drive_fail", x: d.name });
    }
  });
  if (issues.length === 0) issues.push({ level: "ok", key: "all_ok" });
  return issues.map(function (i) {
    return { level: i.level, text: t(i.key, i.x !== undefined ? { x: i.x } : null) };
  });
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

function renderStartup(apps) {
  const list = document.getElementById("startup");
  list.innerHTML = "";
  (apps || []).forEach(function (a) {
    const li = document.createElement("li");
    li.className = "proc-row";

    const name = document.createElement("span");
    name.className = "truncate";
    name.textContent = a.name;

    const cmd = document.createElement("span");
    cmd.className = "dim truncate startup-cmd";
    cmd.textContent = a.cmd;
    cmd.title = a.cmd;

    li.appendChild(name);
    li.appendChild(cmd);
    list.appendChild(li);
  });
}

function renderWifi(wifi) {
  const list = document.getElementById("wifi");
  list.innerHTML = "";

  if (!wifi || !wifi.ssid || wifi.ssid === "Not connected") {
    const li = document.createElement("li");
    li.className = "dim";
    li.textContent = t("not_connected_wifi");
    list.appendChild(li);
    return;
  }

  const nameRow = document.createElement("li");
  nameRow.className = "wifi-name";
  nameRow.innerHTML = '📡 <strong>' + wifi.ssid + '</strong>';

  const speedRow = document.createElement("li");
  speedRow.className = "spec-row";
  speedRow.innerHTML = '<span>' + t("link_speed") + '</span><span class="spec-val">' + wifi.rxRate + '</span>';

  const signalRow = document.createElement("li");
  signalRow.className = "spec-row";

  let quality = t("q_poor"), qClass = "issue-bad";
  if (wifi.signal >= 80) { quality = t("q_excellent"); qClass = "issue-ok"; }
  else if (wifi.signal >= 60) { quality = t("q_good"); qClass = "issue-warn"; }
  else if (wifi.signal >= 40) { quality = t("q_fair"); qClass = "issue-warn"; }

  signalRow.innerHTML = '<span>' + t("signal_lbl") + '</span><span class="' + qClass + ' sig-pill">' +
    (wifi.signal ? wifi.signal + "% — " : "") + quality + '</span>';

  list.appendChild(nameRow);
  list.appendChild(speedRow);
  list.appendChild(signalRow);
}

function renderSpecs(specs) {
  const list = document.getElementById("specs");
  list.innerHTML = "";

  let cpuText = specs.cpu || "Unknown";
  const cpuBits = [];
  if (specs.cpuCores) cpuBits.push(specs.cpuCores + "C/" + specs.cpuThreads + "T");
  if (specs.cpuGHz && specs.cpuGHz !== "0") cpuBits.push(specs.cpuGHz + " GHz");
  if (cpuBits.length) cpuText += " (" + cpuBits.join(", ") + ")";

  let screenText = specs.resolution;
  if (specs.refreshHz) screenText += " @ " + specs.refreshHz + " Hz";

  const rows = [
    [t("lbl_brand"), [specs.brand, specs.model].filter(Boolean).join(" ")],
    [t("lbl_cpu"), cpuText],
    [t("lbl_gpu"), specs.gpu],
    [t("lbl_ram"), specs.ramDetail],
    [t("lbl_board"), specs.motherboard],
    [t("lbl_bios"), specs.bios],
    [t("lbl_os"), [specs.os, specs.osBuild ? "build " + specs.osBuild : ""].filter(Boolean).join(" · ")],
    [t("lbl_screen"), screenText],
    [t("lbl_uptime"), specs.uptime]
  ];

  rows.forEach(function (r) {
    if (!r[1]) return;
    const li = document.createElement("li");
    li.className = "spec-row";
    li.innerHTML = '<span>' + r[0] + '</span><span class="spec-val">' + r[1] + '</span>';
    list.appendChild(li);
  });
}

function renderStorage(drives) {
  const list = document.getElementById("storage");
  list.innerHTML = "";

  (drives || []).forEach(function (d) {
    const li = document.createElement("li");
    li.className = "storage-row";

    const name = document.createElement("span");
    name.className = "storage-name";
    name.textContent = d.name;

    const badge = document.createElement("span");
    badge.className = "type-badge";
    badge.textContent = d.type;

    const size = document.createElement("span");
    size.className = "spec-val";
    size.textContent = d.sizeGb + " GB";

    const health = document.createElement("span");
    const ok = d.health && d.health.toLowerCase() === "healthy";
    health.className = ok ? "pill-health h-ok" : "pill-health h-bad";
    health.textContent = d.health || "Unknown";

    li.appendChild(name);
    li.appendChild(badge);
    li.appendChild(size);
    li.appendChild(health);
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
      el.className = "trend-up";
      el.textContent = "📈 " + t("hist_up", { x: diff });
    } else if (diff < 0) {
      el.className = "trend-down";
      el.textContent = "📉 " + t("hist_down", { x: Math.abs(diff) });
    } else {
      el.className = "trend-same";
      el.textContent = "➖ " + t("hist_same");
    }
  } else {
    el.className = "trend-new";
    el.textContent = "✨ " + t("hist_first");
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
    if (newAvg > oldAvg) predEl.textContent = t("pred_up", { x: Math.round(newAvg - oldAvg) });
    else predEl.textContent = t("pred_down", { x: Math.round(newAvg - oldAvg) });
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

function exportCSV() {
  const r = window.REPORT;
  if (!r) return;
  const rows = [
    ["DocCheck Report", r.scannedAt],
    ["Overall Score (%)", document.getElementById("overall-percent").textContent],
    ["Grade", document.getElementById("overall-grade").textContent],
    [],
    ["Subject", "Score %"],
  ];
  LAST_SUBJECTS.forEach(function (s) {
    rows.push([s.name, Math.round(s.score)]);
  });
  rows.push([]);
  rows.push(["Drive", "Type", "Size GB", "Health"]);
  (r.storage || []).forEach(function (d) {
    rows.push([d.name, d.type, d.sizeGb, d.health]);
  });
  rows.push([]);
  rows.push(["Startup App", "Command"]);
  (r.startup || []).forEach(function (a) {
    rows.push([a.name, a.cmd]);
  });

  const csv = rows.map(function (row) {
    return row.map(function (cell) {
      return '"' + String(cell === undefined ? "" : cell).replace(/"/g, '""') + '"';
    }).join(",");
  }).join("\r\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "doccheck-report.csv";
  a.click();
}

function applyStaticLabels() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.getElementById("print-btn").textContent = t("print_btn");
  document.getElementById("csv-btn").textContent = t("csv_btn");
  document.getElementById("lang-btn").textContent = t("lang_switch");
}

function addI18nHeadings() {
  const map = { prescription: "p_prescription", running: "p_running", wifi: "p_wifi", laptop: "p_laptop", storage: "p_storage", startup: "p_startup" };
  const panels = document.querySelectorAll(".panel h2");
  const keys = ["p_prescription", "p_running", "p_wifi", "p_laptop", "p_storage", "p_startup"];
  panels.forEach(function (h, i) {
    if (keys[i]) {
      h.setAttribute("data-i18n", keys[i]);
      h.textContent = t(keys[i]);
    }
  });
}

function main() {
  addI18nHeadings();

  if (typeof window.REPORT === "undefined") {
    document.getElementById("teacher-note").textContent = t("no_scan");
    return;
  }

  const r = window.REPORT;

  document.getElementById("scan-date").textContent =
    (LANG === "ne" ? "स्क्यान गरिएको: " : "Scanned on ") + r.scannedAt;

  const subjects = buildSubjects(r);
  LAST_SUBJECTS = subjects;
  renderSubjects(subjects);
  renderDiagnosis(diagnose(r));
  renderProcesses(r.topProcesses || []);
  renderStartup(r.startup);
  renderWifi(r.wifi);
  renderStorage(r.storage);
  if (r.specs) renderSpecs(r.specs);

  const overall = subjects.reduce(function (sum, s) { return sum + s.score; }, 0) / subjects.length;
  LAST_OVERALL = overall;

  countUp(document.getElementById("overall-percent"), Math.round(overall));
  document.getElementById("overall-grade").textContent = getGrade(overall);
  document.getElementById("teacher-note").textContent = T["note_" + getGrade(overall)][LANG] || T["note_" + getGrade(overall)].en;

  updateHistory(overall, r.scannedAt);

  if (getGrade(overall) === "A") {
    setTimeout(confettiBurst, 400);
  }
}

document.getElementById("print-btn").addEventListener("click", function () {
  window.print();
});

document.getElementById("csv-btn").addEventListener("click", exportCSV);

document.getElementById("lang-btn").addEventListener("click", function () {
  LANG = LANG === "en" ? "ne" : "en";
  localStorage.setItem("doccheck-lang", LANG);
  applyStaticLabels();
  main();
});

applyStaticLabels();
main();
