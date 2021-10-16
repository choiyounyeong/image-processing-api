import sharp from 'sharp';

async function resizeImage(
  originalFilepathAbs: string,
  targetFilepathAbs: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(originalFilepathAbs)
    .resize(width, height)
    .toFile(targetFilepathAbs);
}

export default { resizeImage };
