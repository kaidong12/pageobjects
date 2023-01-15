@echo off
taskkill /t /im firefox.exe
ping -n 2 127.0.0.1 >nul
taskkill /t /im firefox.exe

::pause

ping -n 2 127.0.0.1 >nul
start firefox.exe