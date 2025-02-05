const fileTypes = {
  //image: import('@/assets/images/image.png'),
  audio: require('@/assets/images/fileThumbnails/audio.png'),
  video: require('@/assets/images/fileThumbnails/video.jpg'),
  pdf: require('@/assets/images/fileThumbnails/pdf.jpeg'),
};

export default type => {
  if (typeof type !== 'string') return null;
  const normalizedType = type.trim().toLowerCase();
  return fileTypes[normalizedType] || null;
};
