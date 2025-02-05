/* Check File by extentions */

const fileTypeExtensions = {
  image: ['bmp', 'jpg', 'jpeg', 'gif', 'png', 'eps', 'raw', 'nef'],
  audio: ['mp3', 'mpeg', 'wav', 'ogg', 'm4p', 'webm'],
  video: ['webm', 'mkv', 'flv', 'ogv', 'avi', 'wmv', 'mp4', 'm2v', 'm4v'],
  pdf: ['pdf'],
  doc: ['doc', 'docx'],
};

export default extension => {
  if (typeof extension !== 'string') return null;
  const normalizedExtension = extension.trim().toLowerCase();

  for (let fileType in fileTypeExtensions) {
    if (fileTypeExtensions[fileType].includes(normalizedExtension)) {
      return fileType;
    }
  }

  return null;
};
