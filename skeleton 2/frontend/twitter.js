const FollowToggle = require("./follow_toggle");

$(() => {
  $("button.follow-toggle").each(function(index){
    new FollowToggle(this);
  });

});