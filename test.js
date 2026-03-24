import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { emoji, score, stripEmoji } from './grading.js';

function files(count, exts, changesEach) {
  return Array.from({ length: count }, (_, i) => ({
    filename: `file_${i}.${exts[i % exts.length]}`,
    changes: changesEach,
  }));
}

describe('score()', () => {
  const cases = [
    ['newbie', files(1, ['md'], 2), 6],
    ['easy', files(3, ['js', 'css'], 13), 16],
    ['medium', files(20, ['js', 'ts', 'json'], 20), 72],
    ['hard', files(15, ['js', 'ts', 'css', 'json'], 100), 121],
    ['brutal', files(40, ['js', 'ts', 'css', 'json', 'html'], 80), 260],
    ['nightmare', files(500, ['php', 'json', 'yml', 'js', 'md'], 4), 1120],
  ];

  test('extensionless files do not count as an extension', () => {
    const f = [
      { filename: 'Makefile', changes: 10 },
      { filename: 'Dockerfile', changes: 10 },
      { filename: 'src/index.js', changes: 10 },
    ];
    // 3 files, 1 ext (js only), 30 changes = round(1.5 + 6 + 4) = 12
    assert.equal(score(f), 12);
  });

  for (const [desc, f, expected] of cases) {
    test(desc, () => {
      assert.equal(score(f), expected);
    });
  }
});

describe('emoji()', () => {
  const cases = [
    [0, '😊'],
    [15, '😊'],
    [16, '🙂'],
    [50, '🙂'],
    [51, '😐'],
    [120, '😐'],
    [121, '😠'],
    [250, '😠'],
    [251, '😡'],
    [500, '😡'],
    [501, '💀'],
    [9999, '💀'],
  ];

  for (const [s, expected] of cases) {
    test(`score ${s} → ${expected}`, () => {
      assert.equal(emoji(s), expected);
    });
  }
});

describe('stripEmoji()', () => {
  const cases = [
    ['😊 Fix a typo', 'Fix a typo'],
    ['🙂 Add login page', 'Add login page'],
    ['😐 Refactor auth', 'Refactor auth'],
    ['😠 Overhaul billing', 'Overhaul billing'],
    ['😡 Rewrite everything', 'Rewrite everything'],
    ['💀 The big one', 'The big one'],
    ['No emoji at all', 'No emoji at all'],
    ['😊😊 Double prefix', '😊 Double prefix'],
  ];

  for (const [input, expected] of cases) {
    test(`"${input}"`, () => {
      assert.equal(stripEmoji(input), expected);
    });
  }
});
