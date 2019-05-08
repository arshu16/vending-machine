/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./controllers/backendController.js":
/*!******************************************!*\
  !*** ./controllers/backendController.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db */ "./db/index.js");


 //TODO : have a better place for this

const idToItemMap = {
  1: {
    name: 'Caramel',
    price: 2.50
  },
  2: {
    name: 'Hazelnut',
    price: 3.10
  },
  3: {
    name: 'Organic Raw',
    price: 2.00
  }
};

async function insertMoney(req, res, next) {
  const {
    amount
  } = req.body;
  const data = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.findOne({
    where: {
      id: 1
    }
  });
  const newAmount = data.money + amount;
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    money: newAmount
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function getItem(req, res, next) {
  const {
    id
  } = req.body;
  const {
    name,
    price
  } = idToItemMap[id];
  const data = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.findOne({
    where: {
      id: 1
    }
  });
  const newAmount = data.money - price;
  const newItems = data.collectableItems.slice();
  newItems.push(name);
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    money: newAmount,
    collectableItems: newItems
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function returnChange(req, res, next) {
  const data = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.findOne({
    where: {
      id: 1
    }
  });
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    money: 0.0,
    change: data.change + data.money
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function addChange(req, res, next) {
  const {
    amount
  } = req.body;
  const data = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.findOne({
    where: {
      id: 1
    }
  });
  const newAmount = data.change + amount;
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    change: newAmount
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function collectChange(req, res, next) {
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    change: 0.0
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function collectItem(req, res, next) {
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.update({
    collectableItems: []
  }, {
    where: {
      id: 1
    },
    returning: true
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send(result[1]);
}

async function getState(req, res, next) {
  const result = await _db__WEBPACK_IMPORTED_MODULE_0__["default"].models.vendingMachine.findOne({
    where: {
      id: 1
    }
  });
  res.set('Content-Type', 'application/json');
  return res.status(200).send({ ...result.dataValues,
    items: idToItemMap
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  getState,
  insertMoney,
  getItem,
  returnChange,
  addChange,
  collectChange,
  collectItem
});

/***/ }),

/***/ "./db/config.json":
/*!************************!*\
  !*** ./db/config.json ***!
  \************************/
/*! exports provided: development, default */
/***/ (function(module) {

module.exports = {"development":{"username":"localdbuser","database":"vendingMachine","password":"localdbpassword","host":"postgres","dialect":"postgres"}};

/***/ }),

/***/ "./db/index.js":
/*!*********************!*\
  !*** ./db/index.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_vendingMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/vendingMachine */ "./models/vendingMachine.js");
/* harmony import */ var _config_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.json */ "./db/config.json");
var _config_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config.json */ "./db/config.json", 1);



console.log('This is the json', _config_json__WEBPACK_IMPORTED_MODULE_2__);
const models = [_models_vendingMachine__WEBPACK_IMPORTED_MODULE_1__["default"]];
const db = new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a('vendingMachine', 'localdbuser', 'localdbpassword', {
  host: 'postgres',
  dialect: "postgres",
  benchmark: true,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true
  }
});
models.forEach(model => {
  db.define(model.name, model.definition);
});
/* harmony default export */ __webpack_exports__["default"] = (db);

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server */ "./server.js");



const hostname = _server__WEBPACK_IMPORTED_MODULE_0__["default"].get('hostname') || 'localhost';
const port = _server__WEBPACK_IMPORTED_MODULE_0__["default"].get('port') || 8080;
_server__WEBPACK_IMPORTED_MODULE_0__["default"].listen(port, () => {
  console.log(`Express Server listening on -- http://${hostname}:${port}`);
});
process.on('unhandledRejection', error => {
  console.error('We are not handling promise rejection ', error);
});

/***/ }),

/***/ "./models/vendingMachine.js":
/*!**********************************!*\
  !*** ./models/vendingMachine.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ "sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);



const definition = {
  money: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.FLOAT,
    validate: {
      isFloat: true,
      min: 0.0
    }
  },
  change: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.FLOAT,
    validate: {
      isFloat: true,
      min: 0.0
    }
  },
  collectableItems: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.ARRAY(sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.ENUM('Caramel', 'Hazelnut', 'Organic Raw'))
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'vendingMachine',
  definition
});

/***/ }),

/***/ "./router.js":
/*!*******************!*\
  !*** ./router.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes_ping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/ping */ "./routes/ping.js");
/* harmony import */ var _routes_insert__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/insert */ "./routes/insert.js");
/* harmony import */ var _routes_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/item */ "./routes/item.js");
/* harmony import */ var _routes_return__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes/return */ "./routes/return.js");
/* harmony import */ var _routes_change__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/change */ "./routes/change.js");
/* harmony import */ var _controllers_backendController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./controllers/backendController */ "./controllers/backendController.js");









const router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.get('/', _controllers_backendController__WEBPACK_IMPORTED_MODULE_6__["default"].getState);
router.use('/ping', _routes_ping__WEBPACK_IMPORTED_MODULE_1__["default"]);
router.use('/insert', _routes_insert__WEBPACK_IMPORTED_MODULE_2__["default"]);
router.use('/item', _routes_item__WEBPACK_IMPORTED_MODULE_3__["default"]);
router.use('/return', _routes_return__WEBPACK_IMPORTED_MODULE_4__["default"]);
router.use('/change', _routes_change__WEBPACK_IMPORTED_MODULE_5__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./routes/change.js":
/*!**************************!*\
  !*** ./routes/change.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/backendController */ "./controllers/backendController.js");




let router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.post('/add', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].addChange);
router.get('/collect', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].collectChange);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./routes/insert.js":
/*!**************************!*\
  !*** ./routes/insert.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/backendController */ "./controllers/backendController.js");




let router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.post('/', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].insertMoney);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./routes/item.js":
/*!************************!*\
  !*** ./routes/item.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/backendController */ "./controllers/backendController.js");




let router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.post('/get', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].getItem);
router.get('/collect', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].collectItem);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./routes/ping.js":
/*!************************!*\
  !*** ./routes/ping.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);



let router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.get('/', (req, res, next) => {
  res.status(200).json({
    version: 1.0
  });
});
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./routes/return.js":
/*!**************************!*\
  !*** ./routes/return.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/backendController */ "./controllers/backendController.js");




let router = express__WEBPACK_IMPORTED_MODULE_0___default.a.Router();
router.get('/', _controllers_backendController__WEBPACK_IMPORTED_MODULE_1__["default"].returnChange);
/* harmony default export */ __webpack_exports__["default"] = (router);

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router */ "./router.js");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_3__);






const server = express__WEBPACK_IMPORTED_MODULE_0___default()();
server.set('env', 'development');
server.set('port', 8080);
server.set('hostname', 'localhost');
server.use(cors__WEBPACK_IMPORTED_MODULE_3___default()({
  origin: true
}));
server.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({
  extended: true
}));
server.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());
server.use(_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ 0:
/*!************************!*\
  !*** multi ./index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index.js */"./index.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map