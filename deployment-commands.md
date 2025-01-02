# To take down the site:
git push origin --delete gh-pages

# To respawn the site:
git checkout main
git branch gh-pages
git checkout gh-pages
git push origin gh-pages
git checkout main

# Save these commands for future reference
