
const backendUrl =
import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_BACKEND_URL_PRODUCTION
    : import.meta.env.VITE_BACKEND_URL_LOCAL;


export default backendUrl ;
