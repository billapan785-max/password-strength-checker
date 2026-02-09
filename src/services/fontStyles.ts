
import { FontStyle } from '../types';

const charMap = (text: string, startCode: number, asciiOffset: number = 65): string => {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    // Uppercase A-Z
    if (code >= 65 && code <= 90) {
      return String.fromCodePoint(startCode + (code - 65));
    }
    // Lowercase a-z
    if (code >= 97 && code <= 122) {
      // Often lowercase starts some distance after uppercase in Unicode math blocks
      return String.fromCodePoint(startCode + asciiOffset + (code - 97));
    }
    return char;
  }).join('');
};

export const fontStyles: FontStyle[] = [
  {
    id: 'bold-serif',
    name: 'Bold Serif',
    generate: (t) => charMap(t, 0x1D400, 26)
  },
  {
    id: 'italic-serif',
    name: 'Italic Serif',
    generate: (t) => charMap(t, 0x1D434, 26)
  },
  {
    id: 'bold-italic-serif',
    name: 'Bold Italic',
    generate: (t) => charMap(t, 0x1D468, 26)
  },
  {
    id: 'script',
    name: 'Script',
    generate: (t) => charMap(t, 0x1D49C, 26)
  },
  {
    id: 'bold-script',
    name: 'Bold Script',
    generate: (t) => charMap(t, 0x1D4D0, 26)
  },
  {
    id: 'fraktur',
    name: 'Fraktur / Gothic',
    generate: (t) => charMap(t, 0x1D504, 26)
  },
  {
    id: 'bold-fraktur',
    name: 'Bold Fraktur',
    generate: (t) => charMap(t, 0x1D56C, 26)
  },
  {
    id: 'double-struck',
    name: 'Double Struck (Outline)',
    generate: (t) => charMap(t, 0x1D538, 26)
  },
  {
    id: 'sans-bold',
    name: 'Sans Bold',
    generate: (t) => charMap(t, 0x1D5D4, 26)
  },
  {
    id: 'sans-italic',
    name: 'Sans Italic',
    generate: (t) => charMap(t, 0x1D608, 26)
  },
  {
    id: 'monospace',
    name: 'Monospace',
    generate: (t) => charMap(t, 0x1D670, 26)
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    generate: (t) => {
      const map: Record<string, string> = {
        'A': 'Ⓐ', 'B': 'Ⓑ', 'C': 'Ⓒ', 'D': 'Ⓓ', 'E': 'Ⓔ', 'F': 'Ⓕ', 'G': 'Ⓖ', 'H': 'Ⓗ', 'I': 'Ⓘ', 'J': 'Ⓙ', 'K': 'Ⓚ', 'L': 'Ⓛ', 'M': 'Ⓜ', 'N': 'Ⓝ', 'O': 'Ⓞ', 'P': 'Ⓟ', 'Q': 'Ⓠ', 'R': 'Ⓡ', 'S': 'Ⓢ', 'T': 'Ⓣ', 'U': 'Ⓤ', 'V': 'Ⓥ', 'W': 'Ⓦ', 'X': 'Ⓧ', 'Y': 'Ⓨ', 'Z': 'Ⓩ',
        'a': 'ⓐ', 'b': 'ⓑ', 'c': 'ⓒ', 'd': 'ⓓ', 'e': 'ⓔ', 'f': 'ⓕ', 'g': 'ⓖ', 'h': 'ⓗ', 'i': 'ⓘ', 'j': 'ⓙ', 'k': 'ⓚ', 'l': 'ⓛ', 'm': 'ⓜ', 'n': 'ⓝ', 'o': 'ⓞ', 'p': 'ⓟ', 'q': 'ⓠ', 'r': 'ⓡ', 's': 'ⓢ', 't': 'ⓣ', 'u': 'ⓤ', 'v': 'ⓥ', 'w': 'ⓦ', 'x': 'ⓧ', 'y': 'ⓨ', 'z': 'ⓩ'
      };
      return t.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'squares',
    name: 'Squares',
    generate: (t) => {
      const map: Record<string, string> = {
        'A': '🄰', 'B': '🄱', 'C': '🄲', 'D': '🄳', 'E': '🄴', 'F': '🄵', 'G': '🄿', 'H': '🄷', 'I': '🄸', 'J': '🄹', 'K': '🄺', 'L': '🄻', 'M': '🄼', 'N': '🄽', 'O': '🄾', 'P': '🄿', 'Q': '🅀', 'R': '🅁', 'S': '🅂', 'T': '🅃', 'U': '🅄', 'V': '🅅', 'W': '🅆', 'X': '🅇', 'Y': '🅈', 'Z': '🅉',
        'a': '🄰', 'b': '🄱', 'c': '🄲', 'd': '🄳', 'e': '🄴', 'f': '🄵', 'g': '🄿', 'h': '🄷', 'i': '🄸', 'j': '🄹', 'k': '🄺', 'l': '🄻', 'm': '🄼', 'n': '🄽', 'o': '🄾', 'p': '🄿', 'q': '🅀', 'r': '🅁', 's': '🅂', 't': '🅃', 'u': '🅄', 'v': '🅅', 'w': '🅆', 'x': '🅇', 'y': '🅈', 'z': '🅉'
      };
      return t.split('').map(c => map[c] || c).join('');
    }
  },
  {
    id: 'small-caps',
    name: 'Small Caps',
    generate: (t) => {
      const map: Record<string, string> = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ', 's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ'
      };
      return t.split('').map(c => map[c.toLowerCase()] || c).join('');
    }
  },
  {
    id: 'reversed',
    name: 'Reversed',
    generate: (t) => {
      const map: Record<string, string> = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z',
        'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z'
      };
      return t.split('').map(c => map[c] || c).reverse().join('');
    }
  }
];
