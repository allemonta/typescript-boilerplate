# typescript-test

Quello che viene riportato di seguito sono suggerimenti su come impostare la struttura di un progetto typescript e buone prassi reperite online.

[Altra repository](https://github.com/stemmlerjs/simple-typescript-starter) con progetto typescript

## VScode extensions
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (Ricorda di consentire ovunque! Click su ESLINT nell'angolo in basso a destra.)

## VScode workspace
Sezione solo per informazione, cattiva prassi se si hanno configurazioni personalizzate.

Si possono impostare le configurazioni di vscode sia per l'utente sia per un workspace. Nel secondo caso si usa una cartella.vscode con all'interno file di configurazione, tra cui `settings.json`.

Possibile configurazione:
```
{
    "eslint.validate": ["typescript", "javascript"],
    "eslint.workingDirectories": [
        "."
    ],
    "eslint.codeAction.showDocumentation": {
        "enable": true
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

## Dependency
Nel file `package.json` il campo `files` specifica quali sono i file che faranno parte del package se sarà installato come dipendenza. Migliore implementazione rispetto al file `.npmignore` che utilizza blacklist.

Certi file sono già inclusi senza bisogno di specificarli:
- `package.json`
- `README`
- `CHANGES` / `CHANGELOG` / `HISTORY `
- `LICENSE` / `LICENCE`
- `NOTICE `

`README`, `CHANGES`, `LICENSE` & `NOTICE` can have any case and extension.

## Test
Buona prassi mettere i test in una cartella `test` esterna al src, scritto il tutto con JavaScript (esempio anche con test anche in typescript). Questi non vengono inclusi nel package (non fanno parte del campo `files` riportato nella sezione precedente). In caso di necessità si può far ignorare al linter questa cartella specificandola nel campo `ignorePatterns` del file `.eslintrc` oppure creare un secondo file `.eslintrc` nella cartella `test`.

## ESlint
Sono presenti due file di configurazione, quello effettivamente utilizzato nel progetto (`.eslintrc`) e una possibile implementazione completa di js + ts (`.eslintrc.full.json`).

Si possono utilizzare più file `.eslintrc` all'interno del progetto, i file avranno le regole del file "più vicino".

Si può verificare il corretto funzionamento controllando il file `src/prova.ts` che dovrebbe contenere un warning.

## Build branch
Per avere la cartella `build` in un solo branch si può fare un add forzato della cartella solo nel ramo interessato. Questa soluzione non è elegantissima ma permette di ignorare le build nelle PR o simili.

- Comando con npm: `npm run add:build`
- Comando reale: `git add -f --all build/`

## tsconfig
Questo file specifica come deve essere tradotto typescript in javascript.
Tutte le opzioni di configurazioni in [questo articolo medium](https://medium.com/javascript-in-plain-english/typescript-configuration-options-tsconfig-json-561d4a2ad4b)

## Rollup
Dal creatore di Rollup: "Rollup for libraries, Webpack for apps".

Da [questo articolo medium](https://medium.com/better-programming/the-battle-of-bundlers-6333a4e3eda9):
```
For those coming from a non-JavaScript background, a bundler is a tool that recursively follows all imports from the entry point of your app and bundles them up into a single file. Bundlers can also minify your files by removing unnecessary white spaces, new lines, comments, and block delimiters without affecting their functionality.
```

Da [questo articolo medium](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c):
```
If you need code-splitting, or you have lots of static assets, or you're building something with lots of CommonJS dependencies, Webpack is a better choice. If your codebase is ES2015 modules and you're making something to be used by other people, you probably want Rollup.
```

Plugin aggiuntivi, da  [questo link di stackoverflow](https://stackoverflow.com/questions/57990828/how-to-deal-with-external-modules-when-compiling-typescript):
```
rollup-plugin-resolve - required to resolve node_modules
rollup-plugin-commonjs - required to transpile CommonJS modules in node_modules to ES6
rollup-plugin-typescript2 - optional, you can have it in the process or you can use tsc manually before you run rollup - just make sure you use version 2 (first version is not maintained any more)
rollup-plugin-terser - minifier and obfuscator
```

Per fare il bundle con rollup (configurazione in `rollup.config.js` + `tsconfig.rollup.json`) lanciare il comando `npm run bundle`. Utilizzo un secondo `tsconfig` perché il campo `module` deve essere impostato diversamente se si utilizza `rollup` o `tsc`, sono quindi stati separati. Da notare che vengono utilizzati nel file di configurazione i campi `main` e `module` del `package.json`.

## Verdaccio
Verdaccio è un un registro proxy npm privato open source.

- Per avviarlo in un container di docker: `npm run verdaccio`
- Dashboard raggiungibile a `http://localhost:4873`
- Aggiungere un utente `npm run verdaccio:adduser`
- Per pubblicare il progetto attuale come pacchetto `npm run verdaccio:publish`
- Per installare senza impostare niente a livello globale: `NPM_CONFIG_REGISTRY=http://localhost:4873 npm i <nome-pacchetto>`

## Setup
Installa le dipendenze: `npm install`. Avvia il file index di prova:
- `npm run start:dev` (modalità dev)
- `npm run start` (dopo aver fatto la build)
