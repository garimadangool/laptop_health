#!/bin/bash

echo "DocCheck is scanning your laptop (takes a few seconds)..."

DISK=$(df /c 2>/dev/null | awk 'END{print $5}' | tr -d '%')
if [ -z "$DISK" ]; then DISK=$(df /mnt/c 2>/dev/null | awk 'END{print $5}' | tr -d '%'); fi

RAM=$(powershell.exe -NoProfile -Command "\$os = Get-CimInstance Win32_OperatingSystem; [math]::Round(((\$os.TotalVisibleMemorySize - \$os.FreePhysicalMemory) / \$os.TotalVisibleMemorySize) * 100)" 2>/dev/null | tail -1 | tr -d '\r')

CPU=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average).Average" 2>/dev/null | tail -1 | tr -d '\r')

BATTERY=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).EstimatedChargeRemaining" 2>/dev/null | tail -1 | tr -d '\r')

STATUS=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).BatteryStatus" 2>/dev/null | tail -1 | tr -d '\r')

PROCS=$(powershell.exe -NoProfile -Command "Get-Process | Sort-Object WS -Descending | Select-Object -First 5 | ForEach-Object { '{0}|{1}' -f \$_.Name, [math]::Round(\$_.WS/1MB) }" 2>/dev/null | tr -d '\r')

SYS=$(powershell.exe -NoProfile -Command "\$c = Get-CimInstance Win32_ComputerSystem; \$p = Get-CimInstance Win32_Processor; '{0}|{1}|{2}|{3}' -f \$c.Manufacturer.Trim(), \$c.Model.Trim(), \$p.Name.Trim(), [math]::Round(\$c.TotalPhysicalMemory/1GB)" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r BRAND MODEL CPUNAME RAMTOTAL <<< "$SYS"

OSNAME=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_OperatingSystem).Caption" 2>/dev/null | tail -1 | tr -d '\r')

VIDEO=$(powershell.exe -NoProfile -Command "\$v = Get-CimInstance Win32_VideoController | Sort-Object AdapterRAM -Descending | Select-Object -First 1; '{0}|{1}|{2}' -f \$v.Name.Trim(), \$v.CurrentHorizontalResolution, \$v.CurrentVerticalResolution" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r GPUNAME RESH RESV <<< "$VIDEO"

WIFI_RAW=$(netsh.exe wlan show interfaces 2>/dev/null | tr -d '\r')

SSID=$(echo "$WIFI_RAW" | grep -i "SSID" | grep -vi "BSSID" | sed 's/.*: //' | head -1)
SIGNAL=$(echo "$WIFI_RAW" | grep -i "Signal" | grep -o '[0-9]*' | head -1)
RXRATE=$(echo "$WIFI_RAW" | grep -i "Receive rate" | sed 's/.*: //' | awk '{print $1}')

case $DISK in ''|*[!0-9]*) DISK=0 ;; esac
case $RAM in ''|*[!0-9]*) RAM=0 ;; esac
case $CPU in ''|*[!0-9]*) CPU=0 ;; esac
case $BATTERY in ''|*[!0-9]*) BATTERY=100 ;; esac
case $SIGNAL in ''|*[!0-9]*) SIGNAL=0 ;; esac
case $RXRATE in ''|*[!0-9]*) RXRATE=0 ;; esac
case $RAMTOTAL in ''|*[!0-9]*) RAMTOTAL=8 ;; esac
case $RESH in ''|*[!0-9]*) RESH=0 ;; esac
case $RESV in ''|*[!0-9]*) RESV=0 ;; esac

if [ "$STATUS" = "2" ]; then CHARGING=true; else CHARGING=false; fi
[ -z "$BRAND" ] && BRAND="Unknown"
[ -z "$MODEL" ] && MODEL="Unknown"
[ -z "$CPUNAME" ] && CPUNAME="Unknown"
[ -z "$GPUNAME" ] && GPUNAME="Unknown"
[ -z "$OSNAME" ] && OSNAME="Windows"
[ -z "$SSID" ] && SSID="Not connected"
[ -z "$RXRATE" ] && RXRATE="0"
RXUNIT=$(echo "$WIFI_RAW" | grep -i "Receive rate" | sed 's/.*: //' | awk '{print $2}')
[ -z "$RXUNIT" ] && RXUNIT="Mbps"

PROC_JSON=""
FIRST=1
while IFS='|' read -r pname pmb; do
  if [ -n "$pname" ]; then
    if [ $FIRST -eq 1 ]; then FIRST=0; else PROC_JSON="$PROC_JSON,"; fi
    PROC_JSON="$PROC_JSON{\"name\":\"$pname\",\"mb\":$pmb}"
  fi
done <<< "$PROCS"

if [ -z "$PROC_JSON" ]; then PROC_JSON='{\"name\":\"unknown\",\"mb\":0}'; fi

NOWTIME=$(TZ='Asia/Kathmandu' date '+%Y-%m-%d %I:%M %p (Nepal Time)')

cat > data.js << EOF
window.REPORT = {
  scannedAt: "${NOWTIME}",
  diskUsed: ${DISK},
  ramUsed: ${RAM},
  cpuLoad: ${CPU},
  battery: ${BATTERY},
  charging: ${CHARGING},
  topProcesses: [${PROC_JSON}],
  wifi: { ssid: "${SSID}", rxRate: "${RXRATE} ${RXUNIT}", signal: ${SIGNAL} },
  specs: {
    brand: "${BRAND}",
    model: "${MODEL}",
    cpu: "${CPUNAME}",
    gpu: "${GPUNAME}",
    ramGB: ${RAMTOTAL},
    os: "${OSNAME}",
    resolution: "${RESH} x ${RESV}"
  }
};
EOF

echo ""
echo "Scan complete!"
echo "  Laptop:   ${BRAND} ${MODEL}"
echo "  Disk:     ${DISK}% used | RAM: ${RAM}% used | CPU: ${CPU}% load"
echo "  Battery:  ${BATTERY}% (charging: ${CHARGING})"
echo "  WiFi:     ${SSID} (${RXRATE} ${RXUNIT})"
echo ""
echo "Now open index.html in your browser."
