import http from './httpService';

const cloudinaryApiEndpoint =
	'https://api.cloudinary.com/v1_1/ip-connected/image/upload';

/**
 * The image object has the following structure.
 * @param {Object} image The image object.
 * @param {string} image.src The local URL of the image file.
 * @param {string} image.alt The alt description of the image.
 */

/**
 * Handle selecting the image using \<input\>.
 * @param 	{function} 	e - The onChange event of \<input\>.
 * @param 	{function} 	setImage - SetState function to set the image object.
 */
const handleSelect = (e, setImage) => {
	const i = e.target.files[0];
	if (!i) return;
	if (i.size >= 10 * 1024 * 1024) {
		alert('Image size is limited to 10MB.');
		return;
	}
	setImage({ src: URL.createObjectURL(i), alt: i.name });
};

const uploadImage = (file, setProgress) => {
	const data = new FormData();
	data.append('file', file);
	data.append('upload_preset', 'jbqt2xhd');

	return http.post(cloudinaryApiEndpoint, data, {
		onUploadProgress: (progressEvent) => {
			setProgress(
				Math.round((progressEvent.loaded / progressEvent.total) * 100),
			);
		},
	});
};

/**
 * Upload the image to Cloudinary.
 * @param 	{function} 	setIsUploading - SetState function to Toggle the visibility of the progress bar.
 * @param 	{function} 	setProgress - SetState function to set the value of the progress bar.
 * @param 	{Object} 		image - The image object.
 * @param 	{string} 		image.src - Local URL of the image.
 * @param 	{function} 	successNotify - Show a toast using react-toastify on success.
 * @param 	{function} 	errorNotify - Show a toast using react-toastify on error.
 * @return 	{string} -  On success, the url of the uploaded image is returned. Otherwise, return undefined.
 */
const handleUpload = async (
	setIsUploading,
	setProgress,
	image,
	successNotify,
	errorNotify,
) => {
	try {
		setIsUploading(true);
		setProgress(0);

		const file = await fetch(image.src).then((r) => r.blob());
		const res = await uploadImage(file, setProgress);

		setIsUploading(false);
		console.log(res.data.secure_url);
		if (successNotify) successNotify();
		return res.data.secure_url;
	} catch (e) {
		if (errorNotify) errorNotify('An error occured:', e.message);
		setIsUploading(false);
		return undefined;
	}
};

const uploadImageService = {
	handleSelect,
	handleUpload,
};
export default uploadImageService;
