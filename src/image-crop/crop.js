/**
* Image Cropping - Supporting Functions
* 
* Modified from the official example given at
* 		https://codesandbox.io/s/q8q1mnr01w
*/
export default async function getCroppedImg(image, crop, fileName) {

	const canvas = document.createElement('canvas');
	const pixelRatio = window.devicePixelRatio;
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const ctx = canvas.getContext('2d');
	
	canvas.width = crop.width * pixelRatio * scaleX;
	canvas.height = crop.height * pixelRatio * scaleY;
	
	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	ctx.imageSmoothingQuality = 'high';
	
	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY
	);
	
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) {
					console.error('Canvas is empty');
					return;
				}
				blob.name = fileName;

				// Convert blob to file
				resolve(new File([blob], fileName, {
					type: 'image/jpeg',
				}));
			},
			'image/jpeg',
			1
		);
	});
}