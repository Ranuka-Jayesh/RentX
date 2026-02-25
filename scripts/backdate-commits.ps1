# Backdate commits for 2026-02-20 to 2026-02-26
# Run from repo root:  .\scripts\backdate-commits.ps1
# Then push with GitHub Desktop (or: git push)

$ErrorActionPreference = "Stop"
$repoRoot = (Get-Item $PSScriptRoot).Parent.FullName
Set-Location $repoRoot

$logFile = Join-Path $repoRoot "contribution-log.md"
$startDate = Get-Date "2026-02-20"
$endDate   = Get-Date "2026-02-26"

$header = @"
# Contribution log

RentX development activity (recorded by date).

"@

$current = $startDate
while ($current -le $endDate) {
    $lines = @()
    $d = $startDate
    while ($d -le $current) {
        $lines += "- **$($d.ToString('yyyy-MM-dd'))** — Development activity"
        $d = $d.AddDays(1)
    }
    $content = $header + ($lines -join "`n")
    [System.IO.File]::WriteAllText($logFile, $content)

    $gitDate = $current.ToString("yyyy-MM-dd HH:mm:ss")
    $env:GIT_AUTHOR_DATE    = $gitDate
    $env:GIT_COMMITTER_DATE = $gitDate

    & git add $logFile
    & git commit -m "docs: contribution log $dateStr"

    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Commit for $dateStr failed (maybe nothing to commit or repo not initialized)."
    } else {
        Write-Host "Committed for $dateStr"
    }

    $current = $current.AddDays(1)
}

Write-Host "`nDone. Open GitHub Desktop and push to upload these commits."
