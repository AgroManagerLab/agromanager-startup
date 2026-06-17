import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { File, Paths } from 'expo-file-system';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, FONT } from '../global/themes';

interface CameraModalProps {
  visible: boolean;
  onCapture: (uri: string) => void;
  onClose: () => void;
}

export function CameraModal({ visible, onCapture, onClose }: CameraModalProps) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);

  useEffect(() => {
    if (visible && !permission) {
      requestPermission();
    }
  }, [visible, permission, requestPermission]);

  async function handleCapture() {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync();
      if (!photo?.uri) return;

      const ext = photo.uri.split('.').pop() ?? 'jpg';
      const src = new File(photo.uri);
      const dest = new File(Paths.document, `camera_${Date.now()}.${ext}`);
      src.move(dest);
      setCapturedUri(dest.uri);
    } catch {
      setCapturedUri(null);
    }
  }

  function handleConfirm() {
    if (capturedUri) {
      onCapture(capturedUri);
    }
    setCapturedUri(null);
  }

  function handleRetake() {
    setCapturedUri(null);
  }

  function handleClose() {
    setCapturedUri(null);
    onClose();
  }

  if (!permission?.granted) {
    return (
      <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Permissão necessária</Text>
          <Text style={styles.permissionText}>
            Precisamos da permissão da câmera para fotografar a régua de coleta.
          </Text>
          <TouchableOpacity style={styles.permissionBtn} onPress={requestPermission}>
            <Text style={styles.permissionBtnText}>Conceder permissão</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Text style={styles.closeBtnText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={styles.container}>
        {capturedUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedUri }} style={styles.previewImage} />
            <View style={styles.previewActions}>
              <TouchableOpacity style={styles.retakeBtn} onPress={handleRetake}>
                <Text style={styles.retakeBtnText}>Refazer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                <Text style={styles.confirmBtnText}>Usar foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CameraView ref={cameraRef} style={styles.camera} facing="back">
            <View style={[styles.cameraTopBar, { paddingTop: Platform.OS === 'ios' ? insets.top + 16 : 20 }]}>              <TouchableOpacity onPress={handleClose}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.captureArea}>
              <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
                <View style={styles.captureBtnInner} />
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraTopBar: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cancelText: {
    fontFamily: FONT.uiSemi,
    fontSize: 16,
    color: colors.contrast,
  },
  captureArea: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  captureBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: colors.contrast,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureBtnInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.contrast,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: '70%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  previewActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 24,
  },
  retakeBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.contrast,
  },
  retakeBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.contrast,
  },
  confirmBtn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  confirmBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.contrast,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.bg,
  },
  permissionTitle: {
    fontFamily: FONT.uiExtra,
    fontSize: 22,
    color: colors.ink,
    marginBottom: 12,
  },
  permissionText: {
    fontFamily: FONT.ui,
    fontSize: 15,
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  permissionBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 16,
  },
  permissionBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: colors.contrast,
  },
  closeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeBtnText: {
    fontFamily: FONT.uiBold,
    fontSize: 14,
    color: colors.ink2,
  },
});
