import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { useQuery } from "react-query";
import { getPosts } from "../axios/posts/getPosts";
import PostCard from "../components/PostCard";

const Home = () => {
  const postQuery = useQuery(["posts"], getPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    postQuery.refetch();
    setRefreshing(false);
  };

  return (
    <>
      <StatusBar />
      <View className="flex-1 w-full p-3">
        {postQuery.isLoading && (
          <View className="flex-1 w-full items-center justify-center">
            <ActivityIndicator size={"large"} color={"#333"} />
          </View>
        )}
        {postQuery.data && (
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {postQuery.data?.map((post) => (
              <PostCard key={post.mainEntityOfPage["@id"]} post={post} />
            ))}
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default Home;
