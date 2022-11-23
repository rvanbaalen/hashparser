export default class HashParser {
    _encoded;

    constructor({encoded = false} = {}) {
        this._encoded = encoded;
        this.params = new URLSearchParams(window.location.hash.replace(/^#/g, ''));
    }

    static get encoded() {
        return new HashParser({encoded: true});
    }

    get encoded() {
        return new HashParser({encoded: true});
    }

    // Prefixing with _ to prevent auto-complete from suggesting this method while still
    // allowing it to be overwritten if this class is extended.
    _encode(value) {
        return btoa(JSON.stringify(value));
    }

    _decode(value) {
        return JSON.parse(atob(value));
    }

    get(key, defaultValue) {
        let value = this.params.get(key);
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
            // Remove the hash from the URL
            window.history.replaceState(null, null, window.location.pathname + window.location.search);
            return;
        }

        window.location.hash = `#${this.params.toString()}`;
    }
}
