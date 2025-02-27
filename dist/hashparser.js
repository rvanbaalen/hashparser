var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class HashParser {
  constructor({ encoded = false, sync = true } = {}) {
    __publicField(this, "_encoded");
    this._encoded = encoded;
    this._readHash();
    if (sync) {
      window.addEventListener("hashchange", () => this._readHash(), false);
    }
  }
  static get encoded() {
    return new HashParser({ encoded: true });
  }
  get encoded() {
    return new HashParser({ encoded: true });
  }
  /*
   * Prefixing with _ to prevent auto-complete from suggesting this method while still
   * allowing it to be overwritten if this class is extended.
   */
  _encode(value) {
    return btoa(JSON.stringify(value));
  }
  _decode(value) {
    return JSON.parse(atob(value));
  }
  _readHash() {
    this.params = new URLSearchParams(window.location.hash.replace(/^#/g, ""));
  }
  get(key, defaultValue) {
    const value = this.params.get(key);
    if (value === null) {
      return defaultValue;
    }
    if (this._encoded) {
      return this._decode(value);
    }
    return decodeURIComponent(value);
  }
  set(key, value) {
    value = this._encoded ? this._encode(value) : encodeURIComponent(value);
    this.params.set(key, value);
    this.updateHash();
  }
  delete(key) {
    this.params.delete(key);
    this.updateHash();
  }
  clear() {
    this.params = new URLSearchParams();
    this.updateHash();
  }
  has(key) {
    return this.params.has(key);
  }
  updateHash() {
    if (Array.from(this.params).length === 0) {
      window.history.replaceState(null, null, window.location.pathname + window.location.search);
      return;
    }
    window.location.hash = `#${this.params.toString()}`;
  }
}
export {
  HashParser,
  HashParser as default
};
