import axios from "axios";

const image_api_key = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY as string;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

// Image upload with abort signal support
export const imageUpload = async (
  image: string | Blob,
  options?: { signal?: AbortSignal }
) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(image_hosting_url, formData, {
    signal: options?.signal, // Attach AbortSignal for cancellation
  });

  return data;
};
