import axios from "axios";

export default {
  // Gets all books
  getPosts: function () {
    return axios.get("/api/posts/");
  },
  // // Gets the book with the given id
  // getPost: function (id) {
  //   return axios.get("/api/posts/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function (id) {
  //   return axios.delete("/api/posts/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function (bookData) {
  //   return axios.post("/api/posts", bookData);
  // },
};