const APIUtil = require("./api_util");
const FollowToggle = require("./follow_toggle");

function UsersSearch(el){
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul");
  this.renderResults = this.renderResults.bind(this);
  this.$input.on("keyup", this.handleInput.bind(this));
}

UsersSearch.prototype.handleInput = function(e){
  APIUtil.searchUsers(this.$input.val())
    .then(this.renderResults);
};

UsersSearch.prototype.renderResults = function(users){
  this.$ul.empty();
  for (let i = 0; i < users.length; i++){
    const userItem = $(`<a href="/users/${users[i].id}"></a>`).text(users[i].username);
    const li = $("<li>").append(userItem);
    const button = $(`<button data-user-id ="${users[i].id}" 
    data-initial-follow-state='${users[i].followed ? "followed" : "unfollowed"}'
     > </button>`);
     li.append(button);
     new FollowToggle($(button));
    // new FollowToggle({ userId: users[i].id, 
    //   followState: users[i].followed ? "followed" : "unfollowed"});
    this.$ul.append(li);
  }
};

module.exports = UsersSearch;