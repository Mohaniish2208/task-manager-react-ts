$ErrorActionPreference = "Stop"

function ConvertTo-PlainText {
    param([Security.SecureString]$SecureString)

    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureString)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}

$androidDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$keystorePath = Join-Path $androidDir "release-key.jks"
$propertiesPath = Join-Path $androidDir "keystore.properties"
$alias = "lexora"

$javaHome = $env:JAVA_HOME
if (-not $javaHome) {
    $fallbackJavaHome = "C:\Program Files\Android\Android Studio1\jbr"
    if (Test-Path $fallbackJavaHome) {
        $javaHome = $fallbackJavaHome
    }
}

if (-not $javaHome) {
    throw "JAVA_HOME is not set and the Android Studio JDK was not found."
}

$keytool = Join-Path $javaHome "bin\keytool.exe"
if (-not (Test-Path $keytool)) {
    throw "keytool.exe was not found at $keytool"
}

if (Test-Path $keystorePath) {
    Write-Host "release-key.jks already exists. Reusing it."
}
else {
    $storePasswordSecure = Read-Host "Create a keystore password" -AsSecureString
    $keyPasswordSecure = Read-Host "Create a key password" -AsSecureString
    $storePassword = ConvertTo-PlainText $storePasswordSecure
    $keyPassword = ConvertTo-PlainText $keyPasswordSecure

    & $keytool `
        -genkeypair `
        -v `
        -keystore $keystorePath `
        -storetype PKCS12 `
        -storepass $storePassword `
        -alias $alias `
        -keypass $keyPassword `
        -keyalg RSA `
        -keysize 2048 `
        -validity 10000 `
        -dname "CN=Lexora, OU=Personal, O=Lifted, L=Toronto, ST=Ontario, C=CA"

    if ($LASTEXITCODE -ne 0) {
        throw "keytool failed with exit code $LASTEXITCODE"
    }
}

if (-not $storePassword) {
    $storePasswordSecure = Read-Host "Enter the existing keystore password" -AsSecureString
    $keyPasswordSecure = Read-Host "Enter the existing key password" -AsSecureString
    $storePassword = ConvertTo-PlainText $storePasswordSecure
    $keyPassword = ConvertTo-PlainText $keyPasswordSecure
}

@"
storeFile=release-key.jks
storePassword=$storePassword
keyAlias=$alias
keyPassword=$keyPassword
"@ | Set-Content -Path $propertiesPath -Encoding ASCII

Write-Host "Created android\keystore.properties and android\release-key.jks."
Write-Host "Keep release-key.jks and these passwords private. Losing them can block future app updates."
