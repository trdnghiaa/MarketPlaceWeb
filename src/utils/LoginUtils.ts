export const LocalStorageKey = {
	JWT: "jwt",
	CURRENT_URL_KEY: "CurrentURL",
	USER_ROLE_KEY: "UserRole"
};

export function setJwtToken(token: string) {
	localStorage.setItem(LocalStorageKey.JWT, token);
}

export function getJwtToken() {
	return localStorage.getItem(LocalStorageKey.JWT);
}

export function clearJwtToken() {
	localStorage.clear();
}

export function getCurrentURL() {
	return localStorage.getItem(LocalStorageKey.CURRENT_URL_KEY);
}

export function setCurrentURL(url: string) {
	localStorage.setItem(LocalStorageKey.CURRENT_URL_KEY, url);
}

export function clearCurrentURL() {
	localStorage.removeItem(LocalStorageKey.CURRENT_URL_KEY);
}

export function setRole(role : string){
	localStorage.setItem(LocalStorageKey.USER_ROLE_KEY, role);
}

export function getRole() : string {
	return localStorage.getItem(LocalStorageKey.USER_ROLE_KEY) || "";
}

export function clearAll(){
	localStorage.clear();
}