const APIUtil = require("./api_util");

function FollowToggle(el, options){
  debugger;

  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
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