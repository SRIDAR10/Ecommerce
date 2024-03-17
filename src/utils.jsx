export const checkAuthentication=()=>{
    let isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    isAuthenticated = isAuthenticated !==undefined || isAuthenticated !== null ? isAuthenticated : false;
    return isAuthenticated;
}