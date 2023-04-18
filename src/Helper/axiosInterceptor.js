import axios from "axios";
let isLoggedIn = JSON.parse(localStorage.getItem("user"));
const jwtInterceptor = axios.create({});
if (isLoggedIn) {
  const loggedUserId = isLoggedIn._id;

  jwtInterceptor.interceptors.request.use(
    (config) => {
      let token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 428) {
        const responseOf = await axios.post(
          "http://localhost:5000/refresh-token",
          {
            _id: loggedUserId,
          }
        );
        const newToken = responseOf.data.token;
        const config = error.config;
        config.headers["Authorization"] = `Bearer ${newToken}`;
        localStorage.setItem("token", JSON.stringify(newToken));
        alert("continue? token is gone ");
        return axios(config);
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
