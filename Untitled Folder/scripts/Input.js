/*jslint browser: true, white: true */
/*global MYGAME */

//------------------------------------------------------------------
//
// Source: http://stackoverflow.com/questions/1465374/javascript-event-keycode-constants
//
//------------------------------------------------------------------
if (typeof KeyEvent === 'undefined') {
    var KeyEvent = {
        DOM_VK_CANCEL: 3,
        DOM_VK_HELP: 6,
        DOM_VK_BACK_SPACE: 8,
        DOM_VK_TAB: 9,
        DOM_VK_CLEAR: 12,
        DOM_VK_RETURN: 13,
        DOM_VK_ENTER: 14,
        DOM_VK_SHIFT: 16,
        DOM_VK_CONTROL: 17,
        DOM_VK_ALT: 18,
        DOM_VK_PAUSE: 19,
        DOM_VK_CAPS_LOCK: 20,
        DOM_VK_ESCAPE: 27,
        DOM_VK_SPACE: 32,
        DOM_VK_PAGE_UP: 33,
        DOM_VK_PAGE_DOWN: 34,
        DOM_VK_END: 35,
        DOM_VK_HOME: 36,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_PRINTSCREEN: 44,
        DOM_VK_INSERT: 45,
        DOM_VK_DELETE: 46,
        DOM_VK_0: 48,
        DOM_VK_1: 49,
        DOM_VK_2: 50,
        DOM_VK_3: 51,
        DOM_VK_4: 52,
        DOM_VK_5: 53,
        DOM_VK_6: 54,
        DOM_VK_7: 55,
        DOM_VK_8: 56,
        DOM_VK_9: 57,
        DOM_VK_SEMICOLON: 59,
        DOM_VK_EQUALS: 61,
        DOM_VK_A: 65,
        DOM_VK_B: 66,
        DOM_VK_C: 67,
        DOM_VK_D: 68,
        DOM_VK_E: 69,
        DOM_VK_F: 70,
        DOM_VK_G: 71,
        DOM_VK_H: 72,
        DOM_VK_I: 73,
        DOM_VK_J: 74,
        DOM_VK_K: 75,
        DOM_VK_L: 76,
        DOM_VK_M: 77,
        DOM_VK_N: 78,
        DOM_VK_O: 79,
        DOM_VK_P: 80,
        DOM_VK_Q: 81,
        DOM_VK_R: 82,
        DOM_VK_S: 83,
        DOM_VK_T: 84,
        DOM_VK_U: 85,
        DOM_VK_V: 86,
        DOM_VK_W: 87,
        DOM_VK_X: 88,
        DOM_VK_Y: 89,
        DOM_VK_Z: 90,
        DOM_VK_CONTEXT_MENU: 93,
        DOM_VK_NUMPAD0: 96,
        DOM_VK_NUMPAD1: 97,
        DOM_VK_NUMPAD2: 98,
        DOM_VK_NUMPAD3: 99,
        DOM_VK_NUMPAD4: 100,
        DOM_VK_NUMPAD5: 101,
        DOM_VK_NUMPAD6: 102,
        DOM_VK_NUMPAD7: 103,
        DOM_VK_NUMPAD8: 104,
        DOM_VK_NUMPAD9: 105,
        DOM_VK_MULTIPLY: 106,
        DOM_VK_ADD: 107,
        DOM_VK_SEPARATOR: 108,
        DOM_VK_SUBTRACT: 109,
        DOM_VK_DECIMAL: 110,
        DOM_VK_DIVIDE: 111,
        DOM_VK_F1: 112,
        DOM_VK_F2: 113,
        DOM_VK_F3: 114,
        DOM_VK_F4: 115,
        DOM_VK_F5: 116,
        DOM_VK_F6: 117,
        DOM_VK_F7: 118,
        DOM_VK_F8: 119,
        DOM_VK_F9: 120,
        DOM_VK_F10: 121,
        DOM_VK_F11: 122,
        DOM_VK_F12: 123,
        DOM_VK_F13: 124,
        DOM_VK_F14: 125,
        DOM_VK_F15: 126,
        DOM_VK_F16: 127,
        DOM_VK_F17: 128,
        DOM_VK_F18: 129,
        DOM_VK_F19: 130,
        DOM_VK_F20: 131,
        DOM_VK_F21: 132,
        DOM_VK_F22: 133,
        DOM_VK_F23: 134,
        DOM_VK_F24: 135,
        DOM_VK_NUM_LOCK: 144,
        DOM_VK_SCROLL_LOCK: 145,
        DOM_VK_COMMA: 188,
        DOM_VK_PERIOD: 190,
        DOM_VK_SLASH: 191,
        DOM_VK_BACK_QUOTE: 192,
        DOM_VK_OPEN_BRACKET: 219,
        DOM_VK_BACK_SLASH: 220,
        DOM_VK_CLOSE_BRACKET: 221,
        DOM_VK_QUOTE: 222,
        DOM_VK_META: 224
    };
}

if (typeof KeyTranslation === 'undefined') {
    var KeyTranslation = {
        "3": "cancel",
        "6": "help",
        "8": "backspace",
        "9": "tab",
        "12": "clear",
        "13": "return",
        "14": "enter",
        "16": "shift",
        "17": "ctrl",
        "18": "alt",
        "19": "pause",
        "20": "caps lock",
        "27": "esc",
        "32": "space",
        "33": "pg up",
        "34": "down",
        "35": "end",
        "36": "home",
        "37": "left",
        "38": "up",
        "39": "right",
        "40": "down",
        "44": "print screen",
        "45": "insert",
        "46": "delete",
        "48": "0",
        "49": "1",
        "50": "2",
        "51": "3",
        "52": "4",
        "53": "5",
        "54": "6",
        "55": "7",
        "56": "8",
        "57": "9",
        "59": ";",
        "61": "=",
        "65": "a",
        "66": "b",
        "67": "c",
        "68": "d",
        "69": "e",
        "70": "f",
        "71": "g",
        "72": "h",
        "73": "i",
        "74": "j",
        "75": "k",
        "76": "l",
        "77": "m",
        "78": "n",
        "79": "o",
        "80": "p",
        "81": "q",
        "82": "r",
        "83": "s",
        "84": "t",
        "85": "u",
        "86": "v",
        "87": "w",
        "88": "x",
        "89": "y",
        "90": "z",
        "93": "context menu",
        "96": "num 0",
        "97": "num 1",
        "98": "num 2",
        "99": "num 3",
        "100": "num 4",
        "101": "num 5",
        "102": "num 6",
        "103": "num 7",
        "104": "num 8",
        "105": "num 9",
        "106": "*",
        "107": "+",
        "108": "_",
        "109": "-",
        "110": ".",
        "111": "/",
        "112": "F1",
        "113": "F2",
        "114": "F3",
        "115": "F4",
        "116": "F5",
        "117": "F6",
        "118": "F7",
        "119": "F8",
        "120": "F9",
        "121": "F10",
        "122": "F11",
        "123": "F12",
        "124": "F13",
        "125": "F14",
        "126": "F15",
        "127": "F16",
        "128": "F17",
        "129": "F18",
        "130": "F19",
        "131": "F20",
        "132": "F21",
        "133": "F22",
        "134": "F23",
        "135": "F24",
        "144": "num lock",
        "145": "scroll lock",
        "188": ",",
        "190": ".",
        "191": "/",
        "192": "`",
        "219": "[",
        "220": "\\",
        "221": "]",
        "222": "\"",
        "224": "meta"
    };
}

// ------------------------------------------------------------------
//
//      Input module structure provided by Dean Mathias
//
// ------------------------------------------------------------------
BreakoutGame.input = (function () {
	'use strict';
	
	console.log("initializing input!");
	
	function Keyboard() {
		var that = {
				keys : {},
				handlers : []
		},
            i,    
			key;
		
		function keyPress(e) {
			that.keys[e.keyCode] = e.timeStamp;
		}
		
		function keyRelease(e) {
			delete that.keys[e.keyCode];
		}
		
		// ------------------------------------------------------------------
		//
		// Allows the client code to register a keyboard handler
		//
		// ------------------------------------------------------------------
		that.registerCommand = function(key, handler) {
			that.handlers.push({ key : key, handler : handler});
		};

	    // ------------------------------------------------------------------
	    //
	    // Allows the client code to UN-register a keyboard handler
	    //
	    // ------------------------------------------------------------------
		that.unRegisterCommand = function (key, handler) {
		    for (i = 0; i < that.handlers.length; i++) {
		        if (that.handlers[i].key === key && that.handlers[i].handler === handler) {
		            that.handlers.splice(i, 1);
		        }
		    }
		};
		
		// ------------------------------------------------------------------
		//
		// Allows the client to invoke all the handlers for the registered key/handlers.
		//
		// ------------------------------------------------------------------
		that.update = function(elapsedTime) {
			for (key = 0; key < that.handlers.length; key++) {
				if (typeof that.keys[that.handlers[key].key] !== 'undefined') {
					that.handlers[key].handler(elapsedTime);
				}
			}
		};
		
		//
		// These are used to keep track of which keys are currently pressed
		window.addEventListener('keydown', keyPress.bind(that));
		window.addEventListener('keyup', keyRelease.bind(that));
		
		return that;
	}
	
	return {
		Keyboard : Keyboard,
		KeyEvent : KeyEvent,
		KeyTranslation : KeyTranslation
		
	};
}());
