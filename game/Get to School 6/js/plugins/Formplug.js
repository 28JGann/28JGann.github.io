/*:
 * @target MZ
 * @plugindesc Allows users to give a thumbs up, down or wiggle to Formbar and interact with Formbar API via socket.io-client.
 * @author Bryce Lynd
 * 
 * @command thumbsUp
 * @text Thumbs Up
 * @desc Sends a ThumbsUp
 * 
 * @command thumbsDown
 * @text Thumbs Down
 * @desc Sends a ThumbsDown
 * 
 * @command wiggle
 * @text Wiggle
 * @desc Sends a Wiggle
 * 
 * @command remove
 * @text Remove
 * @desc Removes the user's vote
 *
 * @command requestBreak
 * @text Request Break
 * @desc Requests a break
 * 
 * @command endBreak
 * @text End Break
 * @desc Ends break
 * 
 * @command help
 * @text Help
 * @desc Asks for help
 * 
 * @help
 * This plugin allows users to give a thumbs up, down or wiggle to Formbar.
 * 
 * Plugin Commands:
 *  Formplug thumbsUp
 *  Formplug thumbsDown
 *  Formplug wiggle
 *  Formplug remove
 *  Formplug requestBreak
 *  Formplug endBreak
 *  Formplug help
 * 
 */

(() => {
    const FORMBAR_URL = 'https://formbeta.yorktechapps.com/';
    const API_KEY = 'b94cd62368a9746fdadcf26830d7f857d9af7c02883448c83decffdbb7d461871917c2a5e8b15771e871fc8e6aa21e67bdd566b5c30e7371ebd803f47166000f';
    // Check if Socket.IO is already loaded
    if (typeof io === "undefined") {
        let script = document.createElement("script");
        script.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
        script.onload = function () {
            console.log("Socket.IO loaded!");
            startSocketConnection(); // Call function to initialize socket after loading
        };
        document.head.appendChild(script);
    } else {
        startSocketConnection();
    }

    function startSocketConnection() {
        const socket = io(FORMBAR_URL, {
            extraHeaders: {
                api: API_KEY
            }
        }); // Replace with your server URL

        socket.on('connect', () => {
            console.log('Connected');
            socket.emit('getActiveClass');
        });

        socket.on('setClass', (classId) => {
            console.log(`The user is currently in the class with id ${classId}`);
        });

        socket.on('connect_error', (error) => {
            if (error.message == 'xhr poll error') {
                console.log('no connection');
            } else {
                console.log(error.message);
            }

            setTimeout(() => {
                socket.connect();
            }, 5000);
        });

        let classId = 0;
        socket.on('setClass', (userClass) => {
            classId = userClass;
        });

        socket.on('classEnded', () => {
            socket.emit('leave', classId);
            classId = '';
            socket.emit('getUserClass', { api: API_KEY });
        });

        socket.on('joinRoom', (classCode) => {
            if (classCode) {
                socket.emit('vbUpdate');
            }
        });

        socket.on('vbUpdate', (data) => {
            console.log(data);
        });

        PluginManager.registerCommand("Formplug", "thumbsUp", () => {
            console.log("ur mum");
            
            socket.emit("pollResp", "Up")
        });
        PluginManager.registerCommand("Formplug", "thumbsDown", () => {
            console.log("stink = you");
            

            socket.emit('pollResp', "Down");
        });
        PluginManager.registerCommand("Formplug", "wiggle", () => {
            console.log("not sure");
            
            socket.emit('pollResp', 'Wiggle');
        });
        PluginManager.registerCommand("Formplug", "remove", () => {
            console.log("removed vote");
            
            socket.emit('pollResp','remove');
        });
        PluginManager.registerCommand("Formplug", "requestBreak", () => {
            console.log("needs a break");
            
            socket.emit('requestBreak','requestBreak');
        });
		PluginManager.registerCommand("Formplug", "endBreak", () => {
            console.log("ends break");
            
            socket.emit('endBreak','endBreak');
        });
		PluginManager.registerCommand("Formplug", "help", () => {
            console.log("requests for help");
            
            socket.emit('help','help');
        });
    }

})();