const config = {
    API_URL: window.location.hostname === "localhost"
      ? "http://localhost:8080/api"
      : "https://c23-91-webapp-nfvs.onrender.com/api",
    AUTH_URL: window.location.hostname === "localhost"
      ? "http://localhost:8080/auth"
      : "https://c23-91-webapp-nfvs.onrender.com/auth"
  };  