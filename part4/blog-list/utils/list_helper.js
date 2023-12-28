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

    const mostBlogs = (blogs) => {
        //Count the blogs for each author
        let authorCounts = {};
      
        for (let i = 0; i < blogs.length; i++) {
          const blog = blogs[i];
          const author = blog.author;
      
          if (authorCounts[author] === undefined) {
            authorCounts[author] = 1;
          } else {
            authorCounts[author]++;
          }
        }
      
        //Find the author with the most blogs
        let maxAuthor = "";
        let maxBlogs = 0;
      
        for (const author in authorCounts) {
          const blogsCount = authorCounts[author];
      
          if (blogsCount > maxBlogs) {
            maxAuthor = author;
            maxBlogs = blogsCount;
          }
        }
      
        //Return the result as an object
        return { author: maxAuthor, blogs: maxBlogs };
    };
    const mostLikes = (blogs) => {
        let authorLikes = {};
      
        for (const blog of blogs) {
          const author = blog.author;
      
          if (authorLikes[author] === undefined) {
            authorLikes[author] = blog.likes;
          } else {
            authorLikes[author] += blog.likes;
          }
        }
      
        let maxAuthor = "";
        let maxLikes = 0;
      
        for (const author in authorLikes) {
          const totalLikes = authorLikes[author];
      
          if (totalLikes > maxLikes) {
            maxAuthor = author;
            maxLikes = totalLikes;
          }
        }
      
        return { author: maxAuthor, likes: maxLikes };
      };
  
  module.exports = {
      dummy,
      totalLikes,
      favoriteBlog,
      mostBlogs,
      mostLikes
  }