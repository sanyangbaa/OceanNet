# Stop the execution if any command fails
$ErrorActionPreference = "Stop"

Write-Host "Cleaning .next directory..." -ForegroundColor Cyan

$nextDir = Join-Path $PSScriptRoot "..\\.next"

if (Test-Path $nextDir) {
    Remove-Item -Path $nextDir -Recurse -Force
    Write-Host "Successfully removed .next directory." -ForegroundColor Green
} else {
    Write-Host ".next directory not found. Nothing to clean." -ForegroundColor Yellow
}

Write-Host "You can now restart your dev server with 'npm run dev'." -ForegroundColor Cyan
