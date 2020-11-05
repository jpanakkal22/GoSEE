import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";

const style = {
  borderBottom: "1px solid green",
  padding: 8,
  marginBottom: 5,
};

function Feed(props) {
  return (
    <React.Fragment>
      {/* <Grid
        className="feed"
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      > */}
      <InfiniteScroll
        item
        sm={6}
        dataLength={props.items.length}
        next={props.showAllPosts}
        // hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        // refreshFunction={refresh}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        // }
      >
        {props.items
          .map((i, index) => {
            console.log(i);
            if (i.posts) {
              const date = new Date(i.posts.day);
              return (
                <div style={style} key={index}>
                  <p className="postName">
                    {i.firstName} {i.lastName}
                  </p>
                  {i.posts.post}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span className="hashtag">#{i.posts.hashtag}</span>
                    <span className="time">
                      {date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}
                    </span>
                  </div>
                </div>
              );
            } else {
              return "";
            }
          })
          .reverse()}
      </InfiniteScroll>
      {/* </Grid> */}
    </React.Fragment>
  );
}

export default Feed;
