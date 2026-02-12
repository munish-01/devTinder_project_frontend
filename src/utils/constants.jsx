// production 

// export const BASE_URL = "/api"

// on local

// export const BASE_URL = "http://localhost:7777"

// dynamic for both

export const BASE_URL = location.hostname === "localhost"  ? "http://localhost:7777" : "/api"