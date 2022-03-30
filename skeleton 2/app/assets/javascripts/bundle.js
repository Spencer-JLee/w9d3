/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/***/ ((module) => {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: "JSON",
      data: {
        user_id: id
      }
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "JSON",
      data: {
        user_id: id
      }
    });
  }
};

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

function FollowToggle(el){
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.$el.on('click', this.handleClick.bind(this));
  this.render();
}

FollowToggle.prototype.render = function(){
  switch (this.followState){
    case "followed":
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
      break; 
    case "unfollowed":
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
      break;
    case "following":
    case "unfollowing":
      this.$el.prop("disabled", true);
      break;
    
  }
};

FollowToggle.prototype.handleClick = function(e){ 
  e.preventDefault();

  this.followState = this.followState === "followed" ? "unfollowing" : "following";

  this.render();

  if (this.followState === "unfollowing") {
    APIUtil.unfollowUser(this.userId)
      .then(() => {this.followState = "unfollowed";})
      .then(() => this.render())
      .fail((error) => console.log(error.responseText));
  }
  else {
    APIUtil.followUser(this.userId)
    .then(() =>{this.followState = "followed";})
    .then(() =>this.render())
    .fail((error) => console.log(error.responseText));
  }
};

module.exports = FollowToggle;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

$(() => {
  $("button.follow-toggle").each(function(index){
    new FollowToggle(this);
  });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map