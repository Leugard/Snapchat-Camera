import { FlashMode } from "expo-camera";
import React from "react";
import { View } from "react-native";
import IconButton from "./IconButton";

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  return (
    <View style={{ position: "absolute", right: 6, gap: 16, zIndex: 1 }}>
      <IconButton
        androidName={
          cameraTorch
            ? require("../assets/icons/flash-on.png")
            : require("../assets/icons/flash-off.png")
        }
        onPress={() => setCameraTorch((prev) => !prev)}
      />
      <IconButton
        androidName={require("../assets/icons/camera-facing.png")}
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
      />
      <IconButton
        androidName={
          cameraFlash === "on"
            ? require("../assets/icons/flash-on.png")
            : require("../assets/icons/flash-off.png")
        }
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
      />
      <IconButton
        androidName={require("../assets/icons/speaker.png")}
        onPress={() => {}}
      />
      <IconButton
        androidName={require("../assets/icons/plus.png")}
        onPress={() => {
          // Increment by .01
          if (cameraZoom < 1) {
            setCameraZoom((prevValue) => prevValue + 0.01);
          }
        }}
      />
      <IconButton
        androidName={require("../assets/icons/minus.png")}
        onPress={() => {
          // Decrement by .01
          if (cameraZoom > 0) {
            setCameraZoom((prevValue) => prevValue - 0.01);
          }
        }}
      />
    </View>
  );
}
