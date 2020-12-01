/**
 * @param key
 * @returns {RegExp}
 */
function hashParserReg(key) {
    return new RegExp("(\#\!|\&)(" + key + "=)(.[^\&]*)");
}

window.HashParser = {
    setParameter: function (key, value, encode) {
        let currentParams = location.hash;
        encode = !!encode;
        value = encode ? btoa(JSON.stringify(value)) : encodeURIComponent(value);

        if (currentParams.indexOf(key) > -1) {
            // Replace the param
            location.hash = currentParams.replace(hashParserReg(key), "$1$2" + value);
        } else {
            // Add the param
            let glue = (currentParams.substr(0,2) === '#!') ? '&' : '#!';
            location.hash = currentParams + glue + key + '=' + value;
        }
    },
    getParameter: function (key, decode) {
        let value = location.hash.match(hashParserReg(key));
        decode = !!decode;

        if (value !== null) {
            value = value[value.length - 1];
        } else {
            return value;
        }

        return decode ? JSON.parse(atob(value)) : decodeURIComponent(value);
    }
};
