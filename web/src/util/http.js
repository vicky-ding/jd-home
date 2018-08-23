class HttpService {
    host = 'http://127.0.0.1:3002';

    getHost(url) {
        // 如果以 / 开头则自动添加host
        if (/^\//.test(url)) {
            return this.host + url;
        }
        return url;
    }

    post(option) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', this.getHost(option.url))
            xhr.setRequestHeader('Content-Type', 'application/json')
            for (let key in (option.headers || {})) {
                xhr.setRequestHeader(key, option.headers[key])
            }
            xhr.onload = () => {
                try {
                    let data = JSON.parse(xhr.responseText)
                    resolve(data)
                } catch (error) {
                    reject(error)
                }
            }
            xhr.onerror = error => {
                reject(error)
            }
            xhr.send(JSON.stringify(option.data))
        })
    }

}

let httpService = new HttpService()

export default httpService