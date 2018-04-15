/**
 *  Internationalization library.
 */
class I18n {
  /**
   * Initialize translator.
   * @param {string} namespace Namespace
   */
  constructor(namespace) {
    this._namespace = namespace;
  }

  /**
   * Translate by a given key and locale.
   * @param {string} key    key.
   * @param {object} params hint parameters.
   * @return {string} text.
   */
  t(key, params) {
    return I18n.t(this._getKey(key), params);
  }

  /**
   * Check if exists key.
   * @param {string} key key.
   * @return {boolean} true or false.
   */
  isExist(key) {
    return I18n.isExist(this._getKey(key));
  }

  /**
   * Get key with namespace.
   * @param {string} key key.
   * @return {string} key.
   */
  _getKey(key) {
    return !!this._namespace ? `${this._namespace}.${key}` : key;
  }

  /**
   * Get locale.
   * @return {object} locale.
   */
  static get locale() {
    return this._locale || {};
  }

  /**
   * Translate by a given key and locale.
   * @param {string} key    key.
   * @param {object} params hint parameters.
   * @return {string} text.
   */
  static t(key, params) {
    if (!this.isExist(key)) {
      return `translation missing: ${key}`;
    }

    return this.locale[key].replace(/%{ *([a-z_]+) *}/g, function(_, name) {
      return params[name];
    });
  }

  /**
   * Check if exists key.
   * @param {string} key key.
   * @return {boolean} true or false.
   */
  static isExist(key) {
    return !!this.locale[key];
  }

  /**
   * Load locale data.
   * @param {object} locale Locale definitions key-value-pair.
   */
  static load(locale) {
    this._locale = this._locale || {};

    const flatLocale = this._flattenRecursive(locale);
    for (const key in flatLocale) {
      if (flatLocale.hasOwnProperty(key)) {
        this._locale[key] = flatLocale[key];
      }
    }
  }

  /**
   * Flatten locale definition recursive.
   * @param {object} locale    Locale definitions.
   * @param {string} namespace Namespace.
   * @param {object} memo      Memo.
   * @return {object} flat locale.
   */
  static _flattenRecursive(locale, namespace = '', memo = {}) {
    for (const key in locale) {
      if (locale.hasOwnProperty(key)) {
        const path  = (!!namespace ? `${namespace}.${key}` : key);
        const value = locale[key];

        if (typeof value === 'object') {
          this._flattenRecursive(value, path, memo);
        } else {
          memo[path] = value;
        }
      }
    }
    return memo;
  }
}

module.exports = I18n;
