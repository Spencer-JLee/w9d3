const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");


$(() => {
  $("button.follow-toggle").each(function(index){
    new FollowToggle(this);
  });

  $("nav.users-search").each(function (index) {
    new UsersSearch(this);
  });

});