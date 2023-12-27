const dummy = (blogs) => {
    return 1;

}
const totalLikes = (blogs) => {
    if (blogs.length === 1) {
      likeCount = blogs[0].likes;
    }
  
    return likeCount;
  };
  
  module.exports = {
      dummy,
      totalLikes
  }