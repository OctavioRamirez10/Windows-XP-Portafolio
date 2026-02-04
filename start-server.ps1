# Servidor web simple para Windows XP Portfolio
# Ejecutar este script en PowerShell para iniciar el servidor

Write-Host "Iniciando servidor para Windows XP Portfolio..." -ForegroundColor Green

# Verificar si el puerto 3000 está disponible
$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Servidor iniciado en http://localhost:$port" -ForegroundColor Green
    Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Obtener la URL solicitada
        $url = $request.Url.LocalPath
        
        # Servir archivos estáticos
        $filePath = ""
        $contentType = "text/html"
        
        if ($url -eq "/" -or $url -eq "") {
            $filePath = ".next/server/app/index.html"
        } elseif ($url.StartsWith("/_next")) {
            $filePath = "." + $url
            if ($url.EndsWith(".js")) { $contentType = "application/javascript" }
            elseif ($url.EndsWith(".css")) { $contentType = "text/css" }
        } elseif ($url.StartsWith("/windows-xp-logo")) {
            $filePath = ".public" + $url
            if ($url.EndsWith(".webp")) { $contentType = "image/webp" }
            elseif ($url.EndsWith(".svg")) { $contentType = "image/svg+xml" }
        } else {
            $filePath = ".next/server/app" + $url + ".html"
        }
        
        # Enviar respuesta
        if ([System.IO.File]::Exists($filePath)) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.ContentType = $contentType
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            # Página de error 404
            $errorHtml = @"
<!DOCTYPE html>
<html>
<head>
    <title>Windows XP Portfolio - Página no encontrada</title>
    <style>
        body { font-family: 'Tahoma', sans-serif; background: linear-gradient(180deg, #87ceeb 0%, #98d8e8 100%); margin: 0; padding: 20px; }
        .error-container { background: white; border: 2px solid #ccc; padding: 20px; max-width: 500px; margin: 50px auto; }
        h1 { color: #0066cc; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>🖥️ Windows XP Portfolio</h1>
        <p>Página no encontrada: $url</p>
        <p><a href="/">Volver al inicio</a></p>
    </div>
</body>
</html>
"@
            $content = [System.Text.Encoding]::UTF8.GetBytes($errorHtml)
            $response.ContentLength64 = $content.Length
            $response.ContentType = "text/html"
            $response.OutputStream.Write($content, 0, $content.Length)
        }
        
        $response.Close()
    }
}
catch {
    Write-Host "Error al iniciar el servidor: $_" -ForegroundColor Red
}
finally {
    $listener.Stop()
    Write-Host "Servidor detenido" -ForegroundColor Yellow
}
