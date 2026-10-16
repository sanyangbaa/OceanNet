Add-Type -AssemblyName System.Drawing

$imagePath = 'C:\Users\THINKERS ELECTRONICS\.gemini\antigravity-ide\brain\556fc1f2-c168-44ce-9bee-dca89295e15c\.user_uploaded\media_1792075156563.png'
$bmp = [System.Drawing.Bitmap]::FromFile($imagePath)

# 1. Crop avatar (around x=525, y=345, w=45, h=45)
$avatarRect = New-Object System.Drawing.Rectangle(525, 345, 45, 45)
$avatarBmp = $bmp.Clone($avatarRect, $bmp.PixelFormat)
$avatarBmp.Save('c:\Users\THINKERS ELECTRONICS\Documents\My Documents\OceanNet Projects\ont-website\public\images\consultant_avatar.png')
$avatarBmp.Dispose()
Write-Output "Avatar saved successfully!"

# 2. Crop the photo of the man (x=110 to x=495, y=50 to y=390)
$manRect = New-Object System.Drawing.Rectangle(110, 50, 385, 340)
$manBmp = $bmp.Clone($manRect, $bmp.PixelFormat)
$manBmp.Save('c:\Users\THINKERS ELECTRONICS\Documents\My Documents\OceanNet Projects\ont-website\public\images\about_man.png')
$manBmp.Dispose()
Write-Output "Man photo saved successfully!"

$bmp.Dispose()
