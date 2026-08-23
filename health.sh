#!/bin/bash

echo "DocCheck is scanning your laptop (takes ~10 seconds)..."

DISK=$(df /c 2>/dev/null | awk 'END{print $5}' | tr -d '%')
if [ -z "$DISK" ]; then DISK=$(df /mnt/c 2>/dev/null | awk 'END{print $5}' | tr -d '%'); fi

RAM=$(powershell.exe -NoProfile -Command "\$os = Get-CimInstance Win32_OperatingSystem; [math]::Round(((\$os.TotalVisibleMemorySize - \$os.FreePhysicalMemory) / \$os.TotalVisibleMemorySize) * 100)" 2>/dev/null | tail -1 | tr -d '\r')

CPU=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average).Average" 2>/dev/null | tail -1 | tr -d '\r')

BATTERY=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).EstimatedChargeRemaining" 2>/dev/null | tail -1 | tr -d '\r')

STATUS=$(powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Battery).BatteryStatus" 2>/dev/null | tail -1 | tr -d '\r')

PROCS=$(powershell.exe -NoProfile -Command "Get-Process | Sort-Object WS -Descending | Select-Object -First 5 | ForEach-Object { '{0}|{1}' -f \$_.Name, [math]::Round(\$_.WS/1MB) }" 2>/dev/null | tr -d '\r')

SYS=$(powershell.exe -NoProfile -Command "\$c = Get-CimInstance Win32_ComputerSystem; \$p = Get-CimInstance Win32_Processor; '{0}|{1}|{2}|{3}|{4}|{5}|{6}' -f \$c.Manufacturer.Trim(), \$c.Model.Trim(), \$p.Name.Trim(), [math]::Round(\$c.TotalPhysicalMemory/1GB), \$p.NumberOfCores, \$p.NumberOfLogicalProcessors, [math]::Round(\$p.MaxClockSpeed/1000, 2)" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r BRAND MODEL CPUNAME RAMTOTAL CPUCORES CPUTHREADS CPUGHZ <<< "$SYS"

OSINFO=$(powershell.exe -NoProfile -Command "\$o = Get-CimInstance Win32_OperatingSystem; '{0}|{1}' -f \$o.Caption, \$o.BuildNumber" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r OSNAME OSBUILD <<< "$OSINFO"

RAMDETAIL=$(powershell.exe -NoProfile -Command "\$r = Get-CimInstance Win32_PhysicalMemory; '{0} GB ({1} stick(s) @ {2} MHz)' -f [math]::Round((\$r | Measure-Object Capacity -Sum).Sum/1GB), (\$r | Measure-Object).Count, (\$r | Select-Object -First 1).Speed" 2>/dev/null | tail -1 | tr -d '\r')

BOARD=$(powershell.exe -NoProfile -Command "\$b = Get-CimInstance Win32_BaseBoard; \$bios = Get-CimInstance Win32_BIOS; '{0}|{1}|{2}|{3}' -f \$b.Manufacturer.Trim(), \$b.Product.Trim(), \$bios.SMBIOSBIOSVersion.Trim(), \$bios.ReleaseDate.ToString('yyyy-MM')" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r BOARDMAKE BOARDMODEL BIOSVER BIOSDATE <<< "$BOARD"

VIDEO=$(powershell.exe -NoProfile -Command "\$v = Get-CimInstance Win32_VideoController | Sort-Object AdapterRAM -Descending | Select-Object -First 1; '{0}|{1}|{2}|{3}' -f \$v.Name.Trim(), \$v.CurrentHorizontalResolution, \$v.CurrentVerticalResolution, \$v.CurrentRefreshRate" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r GPUNAME RESH RESV REFRESH <<< "$VIDEO"

if [ -z "$RESH" ] || [ "$RESH" = " " ] || [ "$RESH" = "0" ]; then
  SCREEN=$(powershell.exe -NoProfile -Command "Add-Type -AssemblyName System.Windows.Forms; \$b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds; '{0}|{1}' -f \$b.Width, \$b.Height" 2>/dev/null | tail -1 | tr -d '\r')
  IFS='|' read -r RESH RESV <<< "$SCREEN"
fi

RAWSTORAGE=$(powershell.exe -NoProfile -Command "Get-PhysicalDisk | ForEach-Object { '{0}|{1}|{2}|{3}' -f \$_.FriendlyName.Trim(), \$_.MediaType, [math]::Round(\$_.Size/1GB), \$_.HealthStatus }" 2>/dev/null | tr -d '\r')

STARTUPS=$(powershell.exe -NoProfile -Command "Get-CimInstance Win32_StartupCommand | Select-Object -First 8 | ForEach-Object { '{0}|{1}' -f \$_.Name.Trim(), \$_.Command.Trim() }" 2>/dev/null | tr -d '\r')

BATT_CAP=$(powershell.exe -NoProfile -Command "\$d = (Get-CimInstance -Namespace root\wmi -ClassName BatteryStaticData -ErrorAction SilentlyContinue).DesignedCapacity; \$f = (Get-CimInstance -Namespace root\wmi -ClassName BatteryFullChargedCapacity -ErrorAction SilentlyContinue).FullChargedCapacity; '{0}|{1}' -f \$d, \$f" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r BDESIGN BFULLCAP <<< "$BATT_CAP"

UPTIME=$(powershell.exe -NoProfile -Command "\$u = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime; '{0}h {1}m' -f [math]::Floor(\$u.TotalHours), \$u.Minutes" 2>/dev/null | tail -1 | tr -d '\r')

WIFI_RAW=$(netsh.exe wlan show interfaces 2>/dev/null | tr -d '\r')

ADAPTER_INFO=$(powershell.exe -NoProfile -Command "\$a = Get-NetAdapter | Where-Object { \$_.Status -eq 'Up' } | Sort-Object LinkSpeed -Descending | Select-Object -First 1; '{0}|{1}' -f \$a.Name, \$a.LinkSpeed" 2>/dev/null | tail -1 | tr -d '\r')

IFS='|' read -r ADAPTER LINKSPEED <<< "$ADAPTER_INFO"

SSID=$(echo "$WIFI_RAW" | grep -i "SSID" | grep -vi "BSSID" | sed 's/.*: //' | head -1)
SIGNAL=$(echo "$WIFI_RAW" | grep -i "Signal" | grep -o '[0-9]*' | head -1)
RXRATE=$(echo "$WIFI_RAW" | grep -i "Receive rate" | sed 's/.*: //' | awk '{print $1}')
RXUNIT=$(echo "$WIFI_RAW" | grep -i "Receive rate" | sed 's/.*: //' | awk '{print $2}')

if [ -z "$RXRATE" ] || [ "$RXRATE" = "0" ]; then
  RXRATE=$(echo "$LINKSPEED" | awk '{print $1}')
  RXUNIT="Mbps"
fi

if [ -z "$SSID" ] && [ -n "$ADAPTER" ]; then
  SSID="${ADAPTER} (connected)"
fi

case $DISK in ''|*[!0-9]*) DISK=0 ;; esac
case $RAM in ''|*[!0-9]*) RAM=0 ;; esac
case $CPU in ''|*[!0-9]*) CPU=0 ;; esac
case $BATTERY in ''|*[!0-9]*) BATTERY=100 ;; esac
case $SIGNAL in ''|*[!0-9]*) SIGNAL=0 ;; esac
case $CPUCORES in ''|*[!0-9]*) CPUCORES=0 ;; esac
case $CPUTHREADS in ''|*[!0-9]*) CPUTHREADS=0 ;; esac
case $REFRESH in ''|*[!0-9]*) REFRESH=0 ;; esac
case $BDESIGN in ''|*[!0-9]*) BDESIGN=0 ;; esac
case $BFULLCAP in ''|*[!0-9]*) BFULLCAP=0 ;; esac

BWEAR=-1
if [ "$BDESIGN" -gt 0 ] && [ "$BFULLCAP" -gt 0 ]; then
  BWEAR=$(( (BDESIGN - BFULLCAP) * 100 / BDESIGN ))
  if [ "$BWEAR" -lt 0 ]; then BWEAR=0; fi
fi

[ -z "$BRAND" ] && BRAND="Unknown"
[ -z "$MODEL" ] && MODEL="Unknown"
[ -z "$CPUNAME" ] && CPUNAME="Unknown"
[ -z "$GPUNAME" ] && GPUNAME="Unknown"
[ -z "$OSNAME" ] && OSNAME="Windows"
[ -z "$RAMDETAIL" ] && RAMDETAIL="${RAMTOTAL} GB"
[ -z "$UPTIME" ] && UPTIME="unknown"
[ -z "$RXUNIT" ] && RXUNIT="Mbps"
[ -z "$SSID" ] && SSID="Not connected"

if [ "$STATUS" = "2" ]; then CHARGING=true; else CHARGING=false; fi

PROC_JSON=""
FIRST=1
while IFS='|' read -r pname pmb; do
  if [ -n "$pname" ]; then
    if [ $FIRST -eq 1 ]; then FIRST=0; else PROC_JSON="$PROC_JSON,"; fi
    PROC_JSON="$PROC_JSON{\"name\":\"$pname\",\"mb\":$pmb}"
  fi
done <<< "$PROCS"
[ -z "$PROC_JSON" ] && PROC_JSON='{\"name\":\"unknown\",\"mb\":0}'

DISK_JSON=""
FIRST=1
while IFS='|' read -r dname dtype dsize dhealth; do
  if [ -n "$dname" ]; then
    if [ $FIRST -eq 1 ]; then FIRST=0; else DISK_JSON="$DISK_JSON,"; fi
    DISK_JSON="$DISK_JSON{\"name\":\"$dname\",\"type\":\"$dtype\",\"sizeGb\":$dsize,\"health\":\"$dhealth\"}"
  fi
done <<< "$RAWSTORAGE"
[ -z "$DISK_JSON" ] && DISK_JSON='{\"name\":\"unknown\",\"type\":\"-\",\"sizeGb\":0,\"health\":\"Unknown\"}'

STARTUP_JSON=""
FIRST=1
while IFS='|' read -r sname scmd; do
  if [ -n "$sname" ]; then
    if [ $FIRST -eq 1 ]; then FIRST=0; else STARTUP_JSON="$STARTUP_JSON,"; fi
    SCMD_ESC=$(echo "$scmd" | sed 's/\\/\\\\/g; s/"/\\"/g')
    STARTUP_JSON="$STARTUP_JSON{\"name\":\"$sname\",\"cmd\":\"$SCMD_ESC\"}"
  fi
done <<< "$STARTUPS"

NOWTIME=$(powershell.exe -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd hh:mm tt'" 2>/dev/null | tail -1 | tr -d '\r')
if [ -z "$NOWTIME" ]; then NOWTIME=$(date '+%Y-%m-%d %I:%M %p'); fi

cat > data.js << EOF
window.REPORT = {
  scannedAt: "${NOWTIME}",
  diskUsed: ${DISK},
  ramUsed: ${RAM},
  cpuLoad: ${CPU},
  battery: ${BATTERY},
  charging: ${CHARGING},
  batteryWear: ${BWEAR},
  uptime: "${UPTIME}",
  topProcesses: [${PROC_JSON}],
  startup: [${STARTUP_JSON}],
  storage: [${DISK_JSON}],
  wifi: { ssid: "${SSID}", rxRate: "${RXRATE} ${RXUNIT}", signal: ${SIGNAL} },
  specs: {
    brand: "${BRAND}",
    model: "${MODEL}",
    cpu: "${CPUNAME}",
    cpuCores: ${CPUCORES},
    cpuThreads: ${CPUTHREADS},
    cpuGHz: "${CPUGHZ}",
    gpu: "${GPUNAME}",
    ramDetail: "${RAMDETAIL}",
    motherboard: "${BOARDMAKE} ${BOARDMODEL}",
    bios: "${BIOSVER} (${BIOSDATE})",
    os: "${OSNAME}",
    osBuild: "${OSBUILD}",
    biosDate: "${BIOSDATE}",
    resolution: "${RESH} x ${RESV}",
    refreshHz: ${REFRESH},
    uptime: "${UPTIME}"
  }
};
EOF

echo ""
echo "Scan complete!"
echo "  Laptop:   ${BRAND} ${MODEL} | ${CPUCORES}C/${CPUTHREADS}T | ${RAMDETAIL}"
echo "  Disks:    $(echo "$RAWSTORAGE" | wc -l) drive(s)"
echo "  Battery:  ${BATTERY}% charging:${CHARGING} wear:${BWEAR}%"
echo "  WiFi:     ${SSID}"
echo ""
echo "Now open index.html in your browser."
