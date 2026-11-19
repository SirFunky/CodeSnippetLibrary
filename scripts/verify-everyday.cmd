@echo off
setlocal
where cl.exe >nul 2>nul
if not errorlevel 1 goto verify
set "VSWHERE=%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe"
if not exist "%VSWHERE%" (
  echo Visual Studio C++ Build Tools or a developer command prompt is required.
  exit /b 1
)
for /f "usebackq delims=" %%I in (`"%VSWHERE%" -latest -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath`) do set "VERIFY_VS=%%I"
if not defined VERIFY_VS (
  echo Could not find Visual Studio C++ Build Tools.
  exit /b 1
)
call "%VERIFY_VS%\Common7\Tools\VsDevCmd.bat" -no_logo -arch=x64 -host_arch=x64
if errorlevel 1 exit /b %errorlevel%
:verify
node "%~dp0verify-everyday.mjs" %*
exit /b %errorlevel%
