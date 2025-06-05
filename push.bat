@echo off
cd /d %~dp0

REM Initialisation du dépôt git
git init

REM Ajout de tous les fichiers
git add .

REM Premier commit
git commit -m "🎤 Première version de Frais Vocal : saisie vocale + tableau + export CSV"

REM Création du repo GitHub (nécessite GitHub CLI installé et authentifié)
gh repo create frais-vocal --public --source=. --remote=origin --push

pause
