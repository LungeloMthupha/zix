const { app, BrowserWindow, globalShortcut, Tray, Menu } = require('electron');

let win;
let tray;

const createWindow = () => {
    win = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hidden',
        center: true,
        icon: "./ico/Zix.ico"
    });
  win.maximize();
    win.loadFile('index.html');

    // Hide the window instead of closing it
    win.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }
    });

    win.on('minimize', (event) => {
        event.preventDefault();
        win.hide();
    });

    win.on('show', () => {
        // tray.setHighlightMode('always');
    });
};

const createTray = () => {
    tray = new Tray('./ico/Zix.ico');
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show App', click: () => {
                win.show();
            }
        },
        {
            label: 'Quit', click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('Zix');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show();
    });
};

app.on('ready', () => {
    createWindow();
    createTray();

    // Register a global shortcut to show/hide the window
    const ret = globalShortcut.register('Escape', () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    });

    if (!ret) {
        console.log('Shortcut registration failed');
    } else {
        console.log('Shortcut registered');
    }

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        } else {
            win.show();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
