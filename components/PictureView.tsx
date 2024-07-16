import { Image } from "expo-image";
import React from "react";
import { View, Text, Alert } from "react-native";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";

interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}

export default function PictureView({ picture, setPicture }: PictureViewProps) {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          right: 6,
          zIndex: 1,
          paddingTop: 50,
          gap: 16,
        }}
      >
        <IconButton
          androidName={require("../assets/icons/arrow-down.png")}
          onPress={async () => {
            await saveToLibraryAsync(picture);
            Alert.alert("Picture saved!");
          }}
        />
        <IconButton
          androidName={require("../assets/icons/square-dashed.png")}
          onPress={() => {}}
        />
        <IconButton
          androidName={require("../assets/icons/circle-dashed.png")}
          onPress={() => {}}
        />
        <IconButton
          androidName={require("../assets/icons/triangle.png")}
          onPress={() => {}}
        />
        <IconButton
          androidName={require("../assets/icons/share.png")}
          onPress={async () => await shareAsync(picture)}
        />
      </View>
      <View
        style={{ position: "absolute", zIndex: 1, paddingTop: 50, left: 6 }}
      >
        <IconButton
          androidName={require("../assets/icons/xmark.png")}
          onPress={() => setPicture("")}
        />
      </View>
      <Image source={picture} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}
