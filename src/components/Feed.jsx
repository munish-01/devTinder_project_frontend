import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

   // 1️⃣ Loading state
  if (!feed) {
    return (
      <div className="flex justify-center my-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 2️⃣ Empty feed state
  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-10 text-lg text-gray-500">
        No users available right now.
      </div>
    );
  }


  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
