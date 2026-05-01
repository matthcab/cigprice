@AGENTS.md

# CigPrice — Instructions pour Claude

## Déploiement obligatoire après chaque modification

À chaque modification du code, tu dois **toujours** :

1. **Committer et pusher sur GitHub** :
   ```bash
   git add <fichiers modifiés>
   git commit -m "description du changement"
   git push origin main
   ```

2. **Déployer sur Vercel en production** :
   ```bash
   vercel --prod --yes
   ```

Ces deux étapes sont obligatoires et doivent être effectuées dans cet ordre après chaque changement, sans attendre de demande explicite de l'utilisateur.

## Stack technique

- **Framework** : Next.js 16 (App Router, TypeScript)
- **Style** : CSS-in-JS inline + classes globales dans `globals.css`
- **Font** : Space Grotesk (Google Fonts)
- **Couleurs** : fond `#111`, jaune `#F5C842`, vert `#4CAF82`, rouge `#FF5A5A`, texte `#F0EDE4`
- **Données** : toutes dans `src/lib/data.ts` (fictives pour la v0)

## Liens

- **Production** : https://cigprice.vercel.app
- **GitHub** : https://github.com/matthcab/cigprice

