import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Image, Alert, Platform, ImageBackground } from "react-native";
import {
  CameraView,
  CameraCapturedPicture,
  CameraType,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

// Placeholder image URL for background
const BACKGROUND_IMAGE = "https://example.com/earth_texture.jpg"; // Replace with your image

export default function App() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [flashMode, setFlashMode] = useState<FlashMode>("off");
  const cameraRef = useRef<React.ComponentRef<typeof CameraView>>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
        const cameraStatus = await requestCameraPermission();
        const isMediaLibraryGranted = mediaLibraryStatus.status === "granted";
        setMediaLibraryPermission(isMediaLibraryGranted);
        console.log("Camera Permission:", cameraStatus.status);
        console.log("Media Library Permission:", mediaLibraryStatus.status);
        if (mediaLibraryStatus.status === "undetermined") {
          console.log("Retrying media library permission...");
          const retryMediaStatus = await MediaLibrary.requestPermissionsAsync();
          setMediaLibraryPermission(retryMediaStatus.status === "granted");
          console.log("Retry Media Library Permission:", retryMediaStatus.status);
        }
      } catch (error) {
        console.error("Error requesting permissions:", error);
        Alert.alert("Error", "Failed to request permissions. Please check your network or settings.");
      }
    };
    requestPermissions();
  }, [requestCameraPermission]);

  if (!cameraPermission || mediaLibraryPermission === null) {
    return (
      <ImageBackground source={{ uri: BACKGROUND_IMAGE }} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.title}>Test Webcam Online</Text>
          <Pressable
            style={styles.startButton}
            onPress={async () => {
              try {
                const cameraStatus = await requestCameraPermission();
                const mediaStatus = await MediaLibrary.requestPermissionsAsync();
                setMediaLibraryPermission(mediaStatus.status === "granted");
                if (cameraStatus.status === "granted" && mediaStatus.status === "granted") {
                  console.log("Permissions granted, proceeding to camera view");
                } else {
                  Alert.alert("Warning", "Please grant all permissions to use the camera.");
                }
              } catch (error) {
                console.error("Error on start press:", error);
                Alert.alert("Error", "Failed to start. Please try again.");
              }
            }}
          >
            <Ionicons name="rocket" size={20} color="#fff" style={styles.icon} />
            <Text style={styles.buttonText}>Start test</Text>
          </Pressable>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Autostart next time</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (!cameraPermission.granted || (!mediaLibraryPermission && Platform.OS !== "web")) {
    return (
      <ImageBackground source={{ uri: BACKGROUND_IMAGE }} style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.errorText}>
            {Platform.OS === "web"
              ? "Camera access limited on web. Use a mobile device with Expo Go."
              : "Please grant camera and media library access in settings."}
          </Text>
          <Pressable
            style={styles.retryButton}
            onPress={async () => {
              try {
                const cameraStatus = await requestCameraPermission();
                const mediaStatus = await MediaLibrary.requestPermissionsAsync();
                setMediaLibraryPermission(mediaStatus.status === "granted");
              } catch (error) {
                console.error("Error retrying permissions:", error);
                Alert.alert("Error", "Failed to retry permissions.");
              }
            }}
          >
            <Text style={styles.retryButtonText}>Retry Permissions</Text>
          </Pressable>
        </View>
      </ImageBackground>
    );
  }

  const takePicture = async (): Promise<void> => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1, base64: true, exif: false };
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        setImage(newPhoto.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture.");
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        if (Platform.OS === "web") {
          Alert.alert("Warning", "Saving not supported on web.");
          setImage(null);
          return;
        }
        await MediaLibrary.createAssetAsync(image);
        Alert.alert("Success", "Image saved!");
        setImage(null);
      } catch (error) {
        console.error("Error saving image:", error);
        Alert.alert("Error", "Failed to save image.");
      }
    }
  };

  const toggleCameraType = () => setCameraType(current => current === "back" ? "front" : "back");
  const toggleFlash = () => {
    if (cameraRef.current) {
      console.log("Toggling flash, current mode:", flashMode);
      setFlashMode(current => {
        const newMode = current === "off" ? "on" : "off";
        console.log("New flash mode:", newMode);
        return newMode;
      });
    } else {
      console.log("Camera ref is not available");
    }
  };

  if (!image) {
    return (
      <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
        flash={flashMode}
        onCameraReady={() => console.log("Camera ready, flash mode:", flashMode)}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={toggleFlash} style={styles.iconButton}>
          <Ionicons
            name={flashMode === "off" ? "flash-off" : "flash"}
            size={30}
            color="#fff"
          />
        </Pressable>
        <Pressable onPress={takePicture} style={styles.captureButton}>
          <View style={styles.captureInner} />
        </Pressable>
        <Pressable onPress={toggleCameraType} style={styles.iconButton}>
          <Ionicons name="camera-reverse" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.previewImage} />
      <View style={styles.buttonContainer}>
        <Pressable onPress={saveImage} style={styles.iconButton}>
          <Ionicons name="save" size={30} color="#fff" />
        </Pressable>
        <Pressable onPress={() => setImage(null)} style={styles.iconButton}>
          <Ionicons name="refresh" size={30} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  background: { flex: 1, width: "100%", height: "100%" },
  title: { fontSize: 40, fontWeight: "bold", color: "#000", textAlign: "center", marginBottom: 20 },
  startButton: {
    flexDirection: "row", backgroundColor: "#007AFF", padding: 10, borderRadius: 10, alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold", marginLeft: 5 },
  icon: { marginRight: 5 },
  switchContainer: { marginTop: 20, flexDirection: "row", alignItems: "center" },
  switchText: { fontSize: 16, color: "#000", marginLeft: 10 },
  camera: { flex: 1, width: "100%" },
  buttonContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 20, flexDirection: "row", justifyContent: "space-around",
    width: "100%", position: "absolute", bottom: 0,
  },
  captureButton: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: "#fff", justifyContent: "center", alignItems: "center",
  },
  captureInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#ff0000" },
  iconButton: { padding: 10 },
  previewImage: { flex: 1, width: "100%", resizeMode: "contain" },
  errorText: { textAlign: "center", margin: 20, fontSize: 16, color: "#fff" },
  retryButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, marginTop: 20 },
  retryButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});