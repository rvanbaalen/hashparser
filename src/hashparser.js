var HashParser = {
    reg: function (key) {
        return new RegExp("(\#\!|\&)(" + key + "=)(.[^\&]*)");
    },
    setParameter: function (key, value, encode) {
        var currentParams = location.hash;
        encode = !!encode;
        value = encode ? btoa(JSON.stringify(value)) : encodeURIComponent(value);

        if (currentParams.indexOf(key) > -1) {
            // Replace the param
            location.hash = currentParams.replace(this.reg(key), "$1$2" + value);
        } else {
            // Add the param
            var glue = (currentParams.substr(0,2) === '#!') ? '&' : '#!';
            location.hash = currentParams + glue + key + '=' + value;
        }
    },
    getParameter: function (key, decode) {
        var value = location.hash.match(this.reg(key));
        decode = !!decode;

        if (value !== null) {
            value = value[value.length - 1];
        } else {
            return value;
        }

        return decode ? JSON.parse(atob(value)) : decodeURIComponent(value);
    }
};
