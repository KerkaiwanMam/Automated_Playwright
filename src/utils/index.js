function removeSlash(url = '') {
    let newUel = url;

    if (url[url.length - 1] === '/') {
        newUel = url.substring(0, url.length - 1);
    }
    return newUel;

}

module.exports = {
    removeSlash
};