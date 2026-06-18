import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONT } from '../global/themes';

interface ImageViewerModalProps {
  visible: boolean;
  uri: string | null;
  onClose: () => void;
}

// Visualizador de imagem em tela cheia (toque para ampliar a foto da régua).
// Fundo preto, imagem em "contain", toque no fundo ou em "Fechar" para sair.
export function ImageViewerModal({ visible, uri, onClose }: ImageViewerModalProps) {
  return (
    <Modal
      visible={visible && uri !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.fill}>
            {uri ? (
              <Image source={{ uri }} style={styles.image} resizeMode="contain" />
            ) : null}
          </View>
        </TouchableWithoutFeedback>

        <SafeAreaView style={styles.topBar} pointerEvents="box-none">
          <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: '#000',
  },
  fill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  closeBtn: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  closeText: {
    fontFamily: FONT.uiBold,
    fontSize: 15,
    color: '#fff',
  },
});
