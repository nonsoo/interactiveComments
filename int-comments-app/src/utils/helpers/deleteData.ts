import axios from "axios";

const deleteData = async (url: string, bodyContent: any) => {
  try {
    const data = await axios.delete(url, bodyContent);
    return { status: data.status, data: data.data };
  } catch (e) {
    console.error(e);
  }
};

export default deleteData;
