const sum = (...rest) => {
    let res = 0;
    for (let n of rest) {
        res += n;
    }
    return res;
};

module.exports = sum;