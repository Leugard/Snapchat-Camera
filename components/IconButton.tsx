import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ComponentProps } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 35;
const ICON_SIZE = 24;

interface IconButtonProps {
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
}

export default function IconButton({
  androidName,
  containerStyle,
  height,
  onPress,
  width,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: "#00000050",
          padding: CONTAINER_PADDING,
          borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
          width: CONTAINER_WIDTH,
        },
        containerStyle,
      ]}
    >
      <Image
        source={androidName}
        style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "white" }}
      />
    </TouchableOpacity>
  );
}
