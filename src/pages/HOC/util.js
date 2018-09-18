/* eslint no-constant-condition:0 */

const LATEX_BASE_URI = 'https://www.zhihu.com/equation';

const findEndOfMath = function (delimiter, text, startIndex) {
  // Adapted from
  // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
  let index = startIndex;
  let braceLevel = 0;
  const delimLength = delimiter.length;
  while (index < text.length) {
    const character = text[index];
    if (braceLevel <= 0 &&
        text.slice(index, index + delimLength) === delimiter) {
      return index;
    } else if (character === '\\') {
      index++;
    } else if (character === '{') {
      braceLevel++;
    } else if (character === '}') {
      braceLevel--;
    }
    index++;
  }
  return -1;
};

const splitAtDelimiters = function (startData, leftDelim, rightDelim, display) {
  const finalData = [];
  for (let i = 0; i < startData.length; i++) {
    if (startData[i].type === 'text') {
      const text = startData[i].data;
      let lookingForLeft = true;
      let currIndex = 0;
      let nextIndex;
      nextIndex = text.indexOf(leftDelim);
      if (nextIndex !== -1) {
        currIndex = nextIndex;
        finalData.push({
          type: 'text',
          data: text.slice(0, currIndex),
        });
        lookingForLeft = false;
      }
      while (true) {
        if (lookingForLeft) {
          nextIndex = text.indexOf(leftDelim, currIndex);
          if (nextIndex === -1) {
            break;
          }
          finalData.push({
            type: 'text',
            data: text.slice(currIndex, nextIndex),
          });
          currIndex = nextIndex;
        } else {
          nextIndex = findEndOfMath(
            rightDelim,
            text,
            currIndex + leftDelim.length
          );
          if (nextIndex === -1) {
            break;
          }
          finalData.push({
            type: 'math',
            data: text.slice(
              currIndex + leftDelim.length,
              nextIndex),
            rawData: text.slice(
              currIndex,
              nextIndex + rightDelim.length),
            display,
          });
          currIndex = nextIndex + rightDelim.length;
        }
        lookingForLeft = !lookingForLeft;
      }
      finalData.push({
        type: 'text',
        data: text.slice(currIndex),
      });
    } else {
      finalData.push(startData[i]);
    }
  }
  return finalData;
};

const TexDelimiters = [
  { left: '$$', right: '$$', display: true },
  { left: '\\[', right: '\\]', display: true },
  { left: '\\(', right: '\\)', display: false },
  // LaTeX uses this, but it ruins the display of normal `$` in text:
  // {left: '$', right: '$', display: false},
];

const splitWithDelimiters = function (text, delimiters) {
  let data = [{ type: 'text', data: text }];
  for (let i = 0; i < delimiters.length; i++) {
    const delimiter = delimiters[i];
    data = splitAtDelimiters(
      data, delimiter.left, delimiter.right,
      delimiter.display || false);
  }
  return data;
};

function text2tex(text) {
  return splitWithDelimiters(text, TexDelimiters);
}

function imgTexSrc(latex) {
  return `${LATEX_BASE_URI}?tex=${encodeURIComponent(latex)}`;
  // return `https://latex.codecogs.com/svg.latex?${encodeURIComponent(latex)}`;
}

function isLatexSrc(src) {
  return src.indexOf(LATEX_BASE_URI) === 0;
}

let _uuid = 1;
const uuid = {
  next() {
    return _uuid++;
  },
};

export {
  splitAtDelimiters,
  LATEX_BASE_URI,
  text2tex,
  imgTexSrc,
  isLatexSrc,
  uuid,
};
