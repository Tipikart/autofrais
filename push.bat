@echo off
echo ─── 📂 AJOUT DES MODIFICATIONS ───
git add .

echo ─── 💬 COMMIT ───
set /p message=Entrez votre message de commit :
git commit -m "%message%"

echo ─── 🔄 PULL (intégration des modifs distantes) ───
git pull --rebase

echo ─── 🚀 PUSH VERS GITHUB ───
git push origin master

echo ─── ✅ TERMINÉ ───
pause
