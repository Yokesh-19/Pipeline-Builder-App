@echo off
echo Initializing Git repository and pushing to GitHub...
echo.

echo Step 1: Initialize Git repository
git init

echo Step 2: Add remote origin
git remote add origin https://github.com/Yokesh-19/Pipeline-Builder-App.git

echo Step 3: Add all files
git add .

echo Step 4: Create initial commit
git commit -m "Initial commit: Full-stack pipeline builder with React Flow and FastAPI"

echo Step 5: Push to GitHub
git branch -M main
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo Repository URL: https://github.com/Yokesh-19/Pipeline-Builder-App
pause