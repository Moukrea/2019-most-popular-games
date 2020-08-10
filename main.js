const { app, BrowserWindow, Menu } = require("electron");
// Hide Electron app menu
Menu.setApplicationMenu(false);

function createWindow() {
  // Cree la fenetre du navigateur.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Hide Electron app menu
  win.removeMenu();

  // et charger le fichier index.html de l'application.
  win.loadFile("./dist/2019-most-popular-games/index.html");

  // Ouvre les DevTools.
  win = null;
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.whenReady().then(createWindow);

// Quitter si toutes les fenêtres ont été fermées.
app.on("window-all-closed", () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow();
  }
});

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
