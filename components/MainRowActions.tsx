import { Colors } from "@/constants/Colors";
import { CameraMode } from "expo-camera";
import { Image } from "expo-image";
import { Asset, getAssetsAsync } from "expo-media-library";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  cameraMode,
  handleTakePicture,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);

  async function getAlbums() {
    const albumAssets = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        inverted
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        )}
        horizontal
        contentContainerStyle={{ gap: 6 }}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <Image
          source={
            cameraMode === "picture"
              ? require("../assets/icons/circle.png")
              : isRecording
              ? require("../assets/icons/record-circle.png")
              : require("../assets/icons/circle.png")
          }
          tintColor={isRecording ? Colors.light.snapPrimary : "white"}
          style={{ width: 90, height: 90 }}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 3].map((item) => (
          <Image
            key={item}
            source={require("../assets/icons/face-dashed.png")}
            style={{ width: 40, height: 40 }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 45,
    height: 100,
  },
});
