import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Post from "../components/Post";
import Feed from "../components/Feed";
import API from "../utils/API";
import { Container } from "@material-ui/core";

function Home(props) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  // Get user data and filter based on logged in ID
  function getUser() {
    API.getUser()
      .then((res) => {
        var newUserArray = res.data.filter((user) => {
          return user._id == props.user._id;
        });
        var newMap = newUserArray.map((user) => {
          return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            day: user.posts.day,
            post: user.posts.post,
            hashtag: user.posts.hashtag,
          };
        });
        setUser(newMap);
      })
      .catch((err) => console.log(err));
  }

  function showAllPosts() {
    API.getPosts()
      .then((res) => {
        setItems(items.concat(res.data));
      })
      .catch((err) => console.error(err));
  }

  function getCityPosts(city) {
    API.getCityPosts(city)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => console.error(err));
  }

  function makeAPost(post) {
    API.savePost(post)
      .then((res) => {
        if (res) {
          setItems(res.data);
          getUser();
        } else {
          showAllPosts();
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    showAllPosts();
  }, []);

  return (
    <React.Fragment>
      <Logo />
      <Sidebar user={props.user} items={items} userPosts={user} />
      <Header />
      <Container>
        <Post
          getCityPosts={getCityPosts}
          makeAPost={makeAPost}
          user={props.user}
        />

        <Feed showAllPosts={showAllPosts} items={items} />
      </Container>
    </React.Fragment>
  );
}

export default Home;
