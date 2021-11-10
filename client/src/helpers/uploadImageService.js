import axios from "./axios";
import notify from "./notifyService";

const cloudinaryApiEndpoint = "https://api.cloudinary.com/v1_1/ip-connected/image/upload";

/**
 * The image object has the following structure.
 *
 * @param {object} image The image object.
 * @param {string} image.src The local URL of the image file.
 * @param {string} image.alt The alt description of the image.
 */

/**
 * Handle selecting the image using \<input\>.
 *
 * @param 	{Function} 	e - The onChange event of \<input\>.
 * @param 	{Function} 	setImage - SetState function to set the image object.
 */
const handleSelect = (e, setImage) => {
  const i = e.target.files[0];
  if (!i) return;
  if (i.size >= 10 * 1024 * 1024) {
    notify.errorNotify("Image size is limited to 10MB.");
    return;
  }
  setImage({ src: URL.createObjectURL(i), alt: i.name });
};

const uploadImage = (file, setProgressBar) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "jbqt2xhd");

  return axios.post(cloudinaryApiEndpoint, data, {
    onUploadProgress: (progressEvent) => {
      setProgressBar((prevState) => ({
        ...prevState,
        progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
      }));
    },
  });
};

/**
 * Upload the image to Cloudinary.
 *
 * @param 	{Function} 	setProgressBar - SetState function to set the property of progress bar.
 * @param 	{object} 	image - The image object.
 * @param 	{string} 	image.src - Local URL of the image.
 * @param 	{Function} 	successNotify - Show a toast using react-toastify on success.
 * @param 	{Function} 	errorNotify - Show a toast using react-toastify on error.
 * @returns 	{string|undefined} -  On success, the url of the uploaded image is returned. Otherwise, return undefined.
 */
const handleUpload = async (setProgressBar, image, successNotify, errorNotify) => {
  try {
    setProgressBar({ visible: true, progress: 0 });

    const file = await fetch(image.src).then((r) => r.blob());
    const res = await uploadImage(file, setProgressBar);

    setProgressBar((prevState) => ({ ...prevState, visible: false }));

    if (successNotify) successNotify();
    return res.data.secure_url;
  } catch (e) {
    if (errorNotify) errorNotify("An error occured:", e.message);
    setProgressBar((prevState) => ({ ...prevState, visible: false }));
    return undefined;
  }
};

const uploadImageService = {
  handleSelect,
  handleUpload,
};
export default uploadImageService;
