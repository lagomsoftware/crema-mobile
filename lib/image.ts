import {
  launchCameraAsync,
  MediaTypeOptions,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
  ImagePickerAsset,
} from "expo-image-picker";

export function usePickImage(
  onPickImage: (images: ImagePickerAsset[]) => void,
) {
  // Utils
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();

  const [mediaLibraryPermissionStatus, requestMediaLibraryPermission] =
    useMediaLibraryPermissions();

  const handlePickImage = async (launchCamera?: boolean) => {
    const result = launchCamera
      ? await launchCameraAsync({
          mediaTypes: MediaTypeOptions.Images,
          aspect: [4, 4],
          base64: true,
          quality: 1,
        })
      : await launchImageLibraryAsync({
          mediaTypes: MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          aspect: [4, 4],
          base64: true,
          quality: 1,
        });

    if (!result.canceled) {
      onPickImage(result.assets);
    }
  };

  return async (takePhoto?: boolean) => {
    if (takePhoto) {
      if (
        cameraPermissionStatus.granted ||
        (await requestCameraPermission()).status === PermissionStatus.GRANTED
      ) {
        handlePickImage(true);
      }
    } else {
      if (
        mediaLibraryPermissionStatus.granted ||
        (await requestMediaLibraryPermission()).status ===
          PermissionStatus.GRANTED
      ) {
        handlePickImage();
      }
    }
  };
}
