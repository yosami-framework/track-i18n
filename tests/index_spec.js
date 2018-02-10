const t    = require('track-spec');
const I18n = require('../lib/index.js');

t.describe('I18n', () => {
  t.beforeEach(() => {
    I18n.clear();
  });

  t.describe('t', () => {
    const subject = (() => I18n.t(key, params));
    let key       = null;
    let params    = null;

    t.beforeEach(() => {
      I18n.load({
        tracki18n: {
          kemonofriends: {
            hello:       'Welcome to yokoso japaripark.',
            description: 'TV anime kemonofriends is %{evaluation}.',
            serval:      'I am %{ name} of serval cat.',
          },
        },
      });
      key = 'tracki18n.kemonofriends.hello';
      params = {};
    });

    t.it('Translate', () => {
      t.expect(subject()).equals('Welcome to yokoso japaripark.');
    });

    t.context('When value has param', () => {
      t.beforeEach(() => {
        key = 'tracki18n.kemonofriends.description';
        params = {evaluation: 'very exciting'};
      });

      t.it('Translate', () => {
        t.expect(subject()).equals('TV anime kemonofriends is very exciting.');
      });

      t.context('When param definition includes space', () => {
        t.beforeEach(() => {
          key = 'tracki18n.kemonofriends.serval';
          params = {name: 'serval'};
        });

        t.it('Translate', () => {
          t.expect(subject()).equals('I am serval of serval cat.');
        });
      });
    });
  });

  t.describe('#load', () => {
    const subject = (() => I18n.load(locale));
    let locale    = null;

    t.beforeEach(() => {
      locale = {
        a: 'A',
        b: {
          b1: 'B1',
          b2: 'B2',
          b3: {
            b3_1: 'B3-1',
          },
        },
        c: [
          'C1',
          'C2',
        ],
      };
    });

    t.it('Load definition', () => {
      subject();

      t.expect(I18n.locale).deepEquals({
        'a':         'A',
        'b.b1':      'B1',
        'b.b2':      'B2',
        'b.b3.b3_1': 'B3-1',
        'c.0':       'C1',
        'c.1':       'C2',
      });
    });

    t.context('When append locale', () => {
      t.beforeEach(() => {
        subject();

        I18n.load({
          a: 'NEW-A',
          d: 'D',
        });
      });

      t.it('Merge definition', () => {
        t.expect(I18n.locale).deepEquals({
          'a':         'NEW-A',
          'b.b1':      'B1',
          'b.b2':      'B2',
          'b.b3.b3_1': 'B3-1',
          'c.0':       'C1',
          'c.1':       'C2',
          'd':         'D',
        });
      });
    });
  });
});
