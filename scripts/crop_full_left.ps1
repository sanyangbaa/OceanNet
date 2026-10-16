Add-Type -AssemblyName System.Drawing

$imagePath = 'C:\Users\THINKERS ELECTRONICS\.gemini\antigravity-ide\brain\556fc1f2-c168-44ce-9bee-dca89295e15c\.user_uploaded\media_1792075156563.png'
$bmp = [System.Drawing.Bitmap]::FromFile($imagePath)

# Crop the complete left visual (badge + man photo with exact L-frame, exact spacing)
# From x=80, y=10, w=418, h=380
$fullLeftRect = New-Object System.Drawing.Rectangle(80, 10, 418, 380)
$fullLeftBmp = $bmp.Clone($fullLeftRect, $bmp.PixelFormat)
$fullLeftBmp.Save('c:\Users\THINKERS ELECTRONICS\Documents\My Documents\OceanNet Projects\ont-website\public\images\about_hero_full.png')
$fullLeftBmp.Dispose()
Write-Output "Full left asset saved successfully!"

$bmp.Dispose()
