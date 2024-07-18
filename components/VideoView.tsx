import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoViewComponentProps {
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
}

export default function VideoViewComponent({
  video,
  setVideo,
}: VideoViewComponentProps) {
  const videoViewRef = React.useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const player = useVideoPlayer(video, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  useEffect(() => {
    const subscribtion = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscribtion.remove();
    };
  }, [player]);

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
            await saveToLibraryAsync(video);
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
          androidName={
            isPlaying
              ? require("../assets/icons/play.png")
              : require("../assets/icons/pause.png")
          }
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play;
            }
            setIsPlaying(!isPlaying);
          }}
        />
        <IconButton
          androidName={require("../assets/icons/share.png")}
          onPress={async () => await shareAsync(video)}
        />
      </View>
      <View
        style={{ position: "absolute", zIndex: 1, paddingTop: 50, left: 6 }}
      >
        <IconButton
          androidName={require("../assets/icons/xmark.png")}
          onPress={() => setVideo("")}
        />
      </View>
      <VideoView
        ref={videoViewRef}
        style={{ width: "100%", height: "100%" }}
        player={player}
        allowsFullscreen
        nativeControls
      />
    </View>
  );
}
