import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { IPost } from "../interfaces";
import { Fontisto } from "@expo/vector-icons";

interface Props {
  post: IPost;
}

const PostCard = ({ post }: Props) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigate(`Post`, {
          id: post.mainEntityOfPage["@id"],
        })
      }>
      <View key={post?.mainEntityOfPage["@id"]} className="w-full ">
        <View className="relative rounded-md overflow-hidden">
          <LinearGradient
            colors={["#0e0e0f", "rgba(14, 14, 15, 0.29)", "rgba(14, 14, 15, 0)"]}
            locations={[0, 0.26, 0.41]}
            className="w-full h-full absolute left-0 top-0 rotate-180 z-10"
          />
          <Image
            source={{ uri: post.image.url }}
            resizeMode="cover"
            className="h-56 rounded-md w-full"
          />
          {post?.datePublished && (
            <View className="flex-row items-center absolute z-10 bottom-3 left-2 bg-white px-2 py-1 rounded-md">
              <Fontisto name="date" size={15} color="#333" />
              <Text className="text-xs font-bold ml-2 text-zinc-900">
                {post?.datePublished?.toString()?.slice(0, 10)}
              </Text>
            </View>
          )}
        </View>

        <Text numberOfLines={1} className="font-bold text-xl">
          {post?.headline}
        </Text>
        {post?.description && (
          <Text numberOfLines={2} className="text-xs">
            {post?.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
