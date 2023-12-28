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
  
const favoriteBlog = (blogs) => {
    let highestLike = 0;
    let favoriteBlog = 0;
    blogs.forEach((blog) => {
        if (blog.likes > highestLike) {
            highestLike = blog.likes
            favoriteBlog = {
                title: blog.title,
                author: blog.author,
                likes: blog.likes
            }
        }
    })

    return favoriteBlog;
    }

  
  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog
  }