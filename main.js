// Basic init
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const args = process.argv.slice(1)
const serve = args.some((val) => val === '--start-dev')

// Let electron reloads by itself when webpack watches changes in ./app/
if (serve) {
	require('electron-reload')(__dirname)
}

// To avoid being garbage collected
let mainWindow

// Remove menu toolbar
Menu.setApplicationMenu(null)

app.on('ready', () => {
	let mainWindow = new BrowserWindow({
		width: 375,
		height: 667,
		title: 'Pomoto',
		resizable: false,
	})

	const startUrl = serve
		? 'http://localhost:1234'
		: url.format({
				pathname: path.join(__dirname, './build/index.html'),
				protocol: 'file:',
				slashes: true,
		  })

	mainWindow.loadURL(startUrl)

	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})
