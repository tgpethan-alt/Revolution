const fs = require("fs"),
emoji = require("../misc/emoji_list.json");

// Defines the function of this module
const MODULE_FUNCTION = "handle_requests",

// Base path for module folder creation and navigation
BASE_PATH = "/example_request_handler";

// Only ran on startup so using sync functions is fine
// Makes the folders for files of the module
if (!fs.existsSync(__dirname + BASE_PATH)) {
    fs.mkdirSync(__dirname + BASE_PATH);
    console.log(`[example_request_handler] Made example_request_handler module folder`);
}
if (!fs.existsSync(__dirname + BASE_PATH + "/files")) {
    fs.mkdirSync(__dirname + BASE_PATH + "/files");
    console.log(`[example_request_handler] Made example_request_handler module files folder`);
}

module.exports = {
    extras:async function() {
        // Anything else that is needed like busboy
        // Put them to global.app (the express app)
    },
    get:async function(req, res) {
        /*
            req - Request from client
            res - Response from server
        */
        
        // Make sure the file exists
        fs.access(__dirname + BASE_PATH + "/files" + req.url, fs.F_OK, error => {
            if (error) {
                // File doesn't exist, return a 404 to the client.
                global.modules.consoleHelper.printWarn(emoji.page, `${req.method}: ${req.url} was requested - Returned 404`);
                res.status(404).send("404!<hr>Revolution");
            } else {
                // File does exist, send the file back to the client.
                global.modules.consoleHelper.printInfo(emoji.page, `${req.method}: ${req.url} was requested`);
                res.sendFile(__dirname + BASE_PATH + "/files" + req.url);
            }
        });
    },
    post:async function(req, res) {
        /*
            req - Request from client
            res - Response from server
        */

        // Anything that needs to be done with a post can be done here.
    }
}

module.exports.MOD_FUNC = MODULE_FUNCTION;