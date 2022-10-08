import axios from "axios";

const updateData = async (url: string, bodyContent: any) => {
  try {
    const data = await axios.put(url, bodyContent);
    return { status: data.status, data: data.data };
  } catch (e) {
    console.error(e);
  }
};

export default updateData;
