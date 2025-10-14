param(
  [string]$zipPath,
  [string]$targetPath,
  [string]$appPool = ''
)

# Stop if missing
if (-not (Test-Path $zipPath)) {
  Write-Error "Zip not found: $zipPath"
  exit 1
}

# Ensure target exists
if (-not (Test-Path $targetPath)) {
  New-Item -ItemType Directory -Path $targetPath -Force | Out-Null
}

# Optional: stop app pool to avoid file lock (if provided)
if ($appPool -ne '') {
  Import-Module WebAdministration
  Write-Output "Stopping app pool $appPool"
  Stop-WebAppPool -Name $appPool -ErrorAction Continue
}

# Backup old site (optional)
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupFolder = Join-Path -Path (Split-Path $targetPath -Parent) -ChildPath "backup-$timestamp"
Copy-Item -Path (Join-Path $targetPath '*') -Destination $backupFolder -Recurse -Force -ErrorAction SilentlyContinue

# Clear target folder
Write-Output "Clearing $targetPath"
Get-ChildItem -Path $targetPath -Force | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Unzip into target
Write-Output "Expanding $zipPath to $targetPath"
Expand-Archive -Path $zipPath -DestinationPath $targetPath -Force

# Set permissions if needed (optional)
# $acl = Get-Acl $targetPath
# $ar = New-Object System.Security.AccessControl.FileSystemAccessRule("IIS_IUSRS","Modify","ContainerInherit,ObjectInherit","None","Allow")
# $acl.AddAccessRule($ar)
# Set-Acl $targetPath $acl

# Start/Recycle app pool
if ($appPool -ne '') {
  Write-Output "Starting app pool $appPool"
  Start-WebAppPool -Name $appPool -ErrorAction Continue
  # or: Restart-WebAppPool -Name $appPool
}

Write-Output "Deployment finished"
