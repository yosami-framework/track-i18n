# TrackI18n
Internationalization support for track.

[![Build Status](https://travis-ci.org/yosami-framework/track-i18n.svg?branch=master)](https://travis-ci.org/yosami-framework/track-i18n)

## Installation

### npm

```shell
npm install track-i18n
```

## Usage


### Define locale.

`models.ja.js`

```javascript
module.exports = {
  models: {
    anime: {
      title:   'Title',
      creator: 'Creator',
    },
  },
};
```

YAML is useful, when define locale.

(`Webpack` and `yaml-loader` is very very very good)

`models.ja.yml`

```yaml
views:
  index:
    hello:  'Welcome to yokoso japaripark!',
    serval: 'I am %{name} of serval cat.',
  show:
    title: 'The friends of %{type}.'
```

### Translate

```javascript
const I18n = require('track-i18n');

I18n.load(require('./models.ja'));
I18n.load(require('./views.ja'));

I18n.t('views.index.hello');                    // => 'Welcome to yokoso japaripark!'
I18n.t('views.index.serval', {name: 'serval'}); // => 'I am servel of serval cat.'
```
