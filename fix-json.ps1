# Read file as raw bytes
$bytes = [System.IO.File]::ReadAllBytes("package.json")

# Remove BOM if present (EF BB BF)
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    Write-Host "Found BOM, removing..."
    $content = [System.Text.Encoding]::UTF8.GetString($bytes, 3, $bytes.Length - 3)
} else {
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
}

# Save without BOM
[System.IO.File]::WriteAllText("package.json", $content, [System.Text.Encoding]::UTF8)
Write-Host "✅ File cleaned"

# Verify
try {
    $json = $content | ConvertFrom-Json
    Write-Host "✅ JSON is valid"
    Write-Host "File length: $($content.Length) characters"
} catch {
    Write-Host "❌ Still invalid JSON: $_"
}
