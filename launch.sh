# Vérifier si le dépôt a des modifications non commitées
if git status | grep -q "nothing to commit, working tree clean"; then
    echo "###############################################################################################################"
    echo "Aucun changement détecté, rien à commiter !"
    echo "###############################################################################################################"
else
    # Ajouter tous les fichiers modifiés à l'index
    git add .

    # Faire un commit avec un message contenant la date et l'heure actuelle
    commit_message="save $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$commit_message"

    # Pousser les modifications vers le dépôt distant
    git push

    # Extraire les informations du dernier commit
    commitDateRaw=$(git log -1 --format=%cI)
    commitDateFormatted=$(date -d "$commitDateRaw" +"%A %d %B %Y, %H:%M:%S")
    remoteUrl=$(git remote -v | grep "origin" | awk '{print $2}' | head -n 1)
    repoDetails="${remoteUrl#*@}"
    accountName=${repoDetails%%/*}
    repoName=${repoDetails#*/}
    repoName=${repoName%%.git}

    # Afficher les informations du commit
    echo "###############################################################################################################"
    echo "Date du commit : $commitDateFormatted"
    echo "Dépôt : $accountName / $repoName"
    echo "Commit et push terminé !"
    echo "###############################################################################################################"
fi
