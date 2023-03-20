import { useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Share from "react-native-share";
import { useQuery } from "react-query";
import { getSinglePost } from "../axios/posts/getSinglePost";
import PostCard from "../components/PostCard";

import ImageViewer from "react-native-image-zoom-viewer";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Post = ({ route }: { route: any }) => {
  const id = route?.params?.id?.slice(28);
  const { goBack } = useNavigation();
  const postQuery = useQuery([route.params.id], () => getSinglePost(id));

  const [refreshing, setRefreshing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);

  const onRefresh = () => {
    setRefreshing(true);
    postQuery.refetch();
    setRefreshing(false);
  };

  const shareData = async () => {
    console.log("share");
    try {
      const result = await Share.open({
        message: "Check out this link!",
        url: "https://www.example.com",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 w-full">
      <StatusBar />
      <TouchableOpacity
        onPress={goBack}
        className="absolute top-4 left-3 h-10 w-10 bg-white rounded-full items-center justify-center z-10">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={shareData}
        className="absolute top-4 right-3 h-10 w-10 bg-white rounded-full items-center justify-center z-10">
        <Ionicons name="share-social" size={24} color="black" />
      </TouchableOpacity>
      {postQuery.isLoading && (
        <View className="flex-1 w-full items-center justify-center">
          <ActivityIndicator size={"large"} color={"#333"} />
        </View>
      )}
      {postQuery.data && (
        <>
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {postQuery.data.images?.map((img, index) => (
              <TouchableWithoutFeedback
                key={img}
                onPress={() => {
                  openGallery();
                  setImageIndex(index);
                }}>
                <Image source={{ uri: img }} className="w-full h-72" resizeMode="cover" />
              </TouchableWithoutFeedback>
            ))}

            {postQuery.data?.latest.map((post) => (
              <PostCard
                key={post.link}
                post={{
                  image: { url: post.src },
                  headline: post.title,
                  mainEntityOfPage: {
                    "@id": post.link,
                  },
                }}
              />
            ))}

            <Modal visible={isOpen}>
              <ImageViewer
                enableSwipeDown
                onCancel={closeGallery}
                index={imageIndex}
                onSwipeDown={closeGallery}
                imageUrls={postQuery.data.images?.map((img) => ({
                  url: img,
                }))}
              />
            </Modal>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Post;
