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
  },

  searchUsers: (queryVal) => {
    return $.ajax({
      method: "GET",
      url: `/users/search/`,
      dataType: "JSON",
      data: {
        query: queryVal
      }
    });
  }
};

module.exports = APIUtil;