import axios from "axios";

const postData = async (url: string, bodyContent: any) => {
  try {
    const data = await axios.post(url, bodyContent);
    return { status: data.status, data: data.data };
  } catch (e) {
    console.error(e);
  }
};

export default postData;
