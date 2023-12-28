const dummy = (blogs) => {
    return 1;

}
const totalLikes = (blogs) => {
     let likeCount = 0;
    if (blogs.length > 1) {
        blogs.forEach((blog) => {
            likeCount += blog.likes;
        })
    }
    else if(blogs.length === 1) {
      likeCount = blogs[0].likes;
    }
  
    return likeCount;
  };
  
  module.exports = {
      dummy,
      totalLikes
  }