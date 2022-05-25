const CryptoJS = require("crypto-js");
const { sha256 } = require("js-sha256");



const salt = "sigma"


export function encrypt(message, key) {
    key = getHash(key, Date.now())
    message += salt
    key = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
    return CryptoJS.AES.encrypt(message, key, { iv: iv, mode: CryptoJS.mode.CBC}).toString();
}


function do_decrypt(key, encrypted, tic) {
    try {
        key = getHash(key, tic)
        const iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB');
        key = CryptoJS.enc.Utf8.parse(key);
        let decrypted =  CryptoJS.AES.decrypt(encrypted, key, { iv: iv, mode: CryptoJS.mode.CBC});
        decrypted = decrypted.toString(CryptoJS.enc.Utf8);
        return decrypted
    }
    catch (e) {
        return false
    }

}


export function decrypt(encrypted, key) {
    return do_decrypt(key, encrypted, Date.now()) ||
        do_decrypt(key, encrypted, Date.now() - 100000) ||
        do_decrypt(key, encrypted, Date.now() + 100000)
}


function getHash(key, time) {
    return getSha(key + Math.floor(time / 100000)).slice(0, 16)
}


export function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}


export function rnd(a) {
    return (Math.floor(Math.random() * 24) - 10) + a
}


export function getSha(text) {
    const hash = sha256.create()
    hash.update(text)
    return hash.hex()
}