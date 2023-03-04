import Cookies from "universal-cookie"

export const useCookie = () => {
	const cookies = new Cookies()

	const getCookie = (key: string, options?: any): string => {
		return cookies.get(key, options)
	}

	const setCookie = (key: string, value: string, options?: any): void => {
		cookies.set(key, value, options)
	}

	const removeCookie = (key: string): void => {
		cookies.remove(key)
	}

	return { getCookie, setCookie, removeCookie }
}
