import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "3e92a212db6e4b749d1433bcb3f0201d",
  },
});
