# DocCheck mini-server
# Serves the dashboard and exposes GET /api/scan, which re-runs health.sh
# and returns the fresh report. Zero dependencies - ships with Windows.
#
# Start it with DocCheck.bat, or manually:
#   powershell -NoProfile -ExecutionPolicy Bypass -File server.ps1 -Port 8619

param([int]$Port = 8619)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

# Locate bash (Git Bash). DocCheck.bat passes DOCCHECK_BASH when found.
$bashExe = $env:DOCCHECK_BASH
if (-not $bashExe) { $bashExe = (Get-Command bash -ErrorAction SilentlyContinue).Source }
if (-not $bashExe) { $bashExe = "C:\Program Files\Git\bin\bash.exe" }

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".ico"  = "image/x-icon"
  ".sh"   = "text/plain; charset=utf-8"
  ".md"   = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
  $listener.Start()
}
catch {
  Write-Host ""
  Write-Host "  Could not start on port $Port : $($_.Exception.Message)"
  Write-Host "  If the dashboard already opened in your browser, a server is probably"
  Write-Host "  still running from before - close this window and just use that tab."
  Read-Host "  Press Enter to close"
  exit 1
}

Write-Host ""
Write-Host "  DocCheck dashboard:  http://localhost:$Port/"
Write-Host "  Stop the server:     close this window (or Ctrl+C)"
Write-Host ""

function Send-Bytes($res, [byte[]]$bytes, [string]$ctype, [int]$code) {
  $res.StatusCode = $code
  $res.ContentType = $ctype
  $res.Headers.Add("Access-Control-Allow-Origin", "*")
  $res.Headers.Add("Cache-Control", "no-store")
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    # CORS preflight (lets the button also work from file:// or https tabs)
    if ($req.HttpMethod -eq "OPTIONS") {
      $res.StatusCode = 204
      $res.Headers.Add("Access-Control-Allow-Origin", "*")
      $res.Headers.Add("Access-Control-Allow-Methods", "GET, OPTIONS")
      $res.Headers.Add("Access-Control-Allow-Headers", "*")
      try { $res.Headers.Add("Access-Control-Allow-Private-Network", "true") } catch {}
      continue
    }

    $path = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }

    if ($path -eq "/api/scan") {
      # Re-run the health scan (~10 s), then return the fresh data.js
      & $bashExe (Join-Path $root "health.sh") *> $null
      $dataFile = Join-Path $root "data.js"
      if (-not (Test-Path $dataFile)) { throw "scan produced no data.js" }
      Send-Bytes $res ([Text.Encoding]::UTF8.GetBytes((Get-Content $dataFile -Raw))) "application/javascript; charset=utf-8" 200
    }
    else {
      # Static files, guarded against path traversal
      $full = [IO.Path]::GetFullPath((Join-Path $root ($path.TrimStart("/") -replace "/", "\")))
      if ($full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path $full -PathType Leaf)) {
        $ext = [IO.Path]::GetExtension($full).ToLower()
        $ctype = if ($types.ContainsKey($ext)) { $types[$ext] } else { "application/octet-stream" }
        Send-Bytes $res ([IO.File]::ReadAllBytes($full)) $ctype 200
      }
      else {
        Send-Bytes $res ([Text.Encoding]::UTF8.GetBytes("not found")) "text/plain; charset=utf-8" 404
      }
    }
  }
  catch {
    try {
      Send-Bytes $res ([Text.Encoding]::UTF8.GetBytes($_.Exception.Message)) "text/plain; charset=utf-8" 500
    } catch {}
  }
  finally {
    try { $res.OutputStream.Close() } catch {}
  }
}
