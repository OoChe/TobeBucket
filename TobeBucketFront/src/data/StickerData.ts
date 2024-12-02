/* [스티키ㅓ 객체 배열 데이터]
 */
export const stickers = [
    { id: 0, stickerPath: require('../assets/images/sticker1.png') },
    { id: 1, stickerPath: require('../assets/images/sticker2.png') },
    { id: 2, stickerPath: require('../assets/images/sticker3.png') },
    { id: 3, stickerPath: require('../assets/images/sticker4.png') },
    { id: 4, stickerPath: require('../assets/images/sticker5.png') },
    { id: 5, stickerPath: require('../assets/images/sticker6.png') },
  ];
  export const getStickerById = (id : number) => {
    return stickers.find(sticker => sticker.id === id);
  };
  