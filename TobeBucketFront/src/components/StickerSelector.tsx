import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {stickers} from '../data/StickerData';

interface StickerSelectorProps {
  unlockedIndex: number; // 서버에서 전달받은 잠금 해제된 최대 인덱스
  onSelectSticker: (stickerId: number | null) => void; // 선택된 스티커 ID를 상위로 전달
}

const StickerSelector: React.FC<StickerSelectorProps> = ({ unlockedIndex, onSelectSticker }) => {
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);

  const handleStickerSelect = (id: number) => {
    if (id > unlockedIndex) {
      Alert.alert('잠금 해제 필요', '이 스티커는 잠금 해제가 필요합니다.');
      return;
    }
    const newSelected = selectedSticker === id ? null : id; // 다시 누르면 선택 해제
    setSelectedSticker(newSelected);
    onSelectSticker(newSelected); // 상위로 전달
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        {stickers.map(sticker => (
          <TouchableOpacity
            key={sticker.id}
            style={[
              styles.stickerWrapper,
              sticker.id > unlockedIndex && styles.lockedSticker, // 잠금 상태
              selectedSticker === sticker.id && styles.selectedSticker, // 선택된 상태
            ]}
            onPress={() => handleStickerSelect(sticker.id)}
            disabled={sticker.id > unlockedIndex} // 잠긴 스티커는 선택 불가
          >
            <Image source={sticker.stickerPath} style={styles.stickerImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scrollView: {
    flexDirection: 'row',
  },
  stickerWrapper: {
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 50,
  },
  stickerImage: {
    width: 30,
    height: 30,
  },
  lockedSticker: {
    opacity: 0.4, // 회색으로 표시
  },
  selectedSticker: {
    borderColor: '#3f6262', // 초록색 테두리
  },
});

export default StickerSelector;
