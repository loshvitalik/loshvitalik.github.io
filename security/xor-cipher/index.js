String.prototype.hexEncode = function () {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    let hex = this.charCodeAt(i).toString(16);
    result.push(("00" + hex).slice(-3));
  }
  return result;
};

String.prototype.hexDecode = function () {
  let hexes = this.split(' ') || [];
  let result = "";
  for (let i = 0; i < hexes.length; i++) {
    result += String.fromCharCode(parseInt(hexes[i], 16));
  }
  return result;
};

function generateKey(keyLength) {
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    let isLast = i === keyLength - 1;
    let number = (Math.random() * 0xFFF << 0).toString(16);
    key += ('00' + number).slice(-3) + (isLast ? '' : ' ');
  }
  return key;
}

function generateKeySet(keyLength) {
  let currentKeys = generateKey(keyLength).split(' ');
  let keySet = '';
  for (let i = 0; i < 10; i++) {
    let salt = (Math.random() * 0xFFF << 0).toString(16);
    keySet += ('00' + salt).slice(-3) + ' ';
    for (let j = 0; j < currentKeys.length; j++) {
      let isLast = j === currentKeys.length - 1;
      keySet += (parseInt('0x' + currentKeys[j], 16) ^ parseInt('0x' + salt, 16)).toString(16) + (isLast ? '' : ' ');
    }
    if (i !== 9)
      keySet += '\n';
  }
  return keySet;
}

function recoverKey(keys, salt) {
  for (let i = 0; i < keys.length; i++) {
    keys[i] = (parseInt('0x' + keys[i], 16) ^ parseInt('0x' + salt, 16)).toString(16);
  }
  return keys;
}

function encrypt(codes, keys) {
  let cipher = '';
  for (let i = 0; i < codes.length; i++) {
    let isLast = i === codes.length - 1;
    cipher += (parseInt('0x' + codes[i], 16) ^ parseInt('0x' + keys[i], 16)).toString(16) + (isLast ? '' : ' ');
  }
  return cipher;
}

document.getElementById('s-generate').addEventListener('click', sGenerateClick);
document.getElementById('s-getKey').addEventListener('click', sGetKeyClick);
document.getElementById('s-encrypt').addEventListener('click', sEncryptClick);
document.getElementById('s-decrypt').addEventListener('click', sDecryptClick);

document.getElementById('e-generate').addEventListener('click', eGenerateClick);
document.getElementById('e-encrypt').addEventListener('click', eEncryptClick);
document.getElementById('e-decrypt').addEventListener('click', eDecryptClick);
document.getElementById('e-save').addEventListener('click', eSaveClick);

function sGenerateClick() {
  let keyLength = document.getElementById('s-input').value.hexEncode().length;
  document.getElementById('s-key').value = generateKey(keyLength);
}

function sGetKeyClick() {
  let textCodes = document.getElementById('s-input').value.hexEncode();
  let cipherCodes = document.getElementById('s-cipher').value.split(' ');
  let key = document.getElementById('s-key');
  if (textCodes.length !== 0 && textCodes.length !== cipherCodes.length) {
    key.value = 'Длины строк не совпадают, подобрать ключ невозможно';
    return;
  }
  key.value = encrypt(textCodes, cipherCodes);
}

function sEncryptClick() {
  let codes = document.getElementById('s-input').value.hexEncode();
  let keys = document.getElementById('s-key').value.split(' ');
  let cipher = document.getElementById('s-cipher');
  if (keys.length === 1 && keys[0] === '') {
    cipher.value = 'Сначала нужно сгенерировать ключ';
    return;
  }
  if (keys.length !== codes.length) {
    cipher.value = 'Длины ключа и текста не совпадают';
    return;
  }
  cipher.value = encrypt(codes, keys);
}

function sDecryptClick() {
  let codes = document.getElementById('s-cipher').value.split(' ');
  let keys = document.getElementById('s-key').value.split(' ');
  let text = document.getElementById('s-input');
  if (keys.length === 1 && keys[0] === '') {
    text.value = 'Введите ключ';
    return;
  }
  if (keys.length !== codes.length) {
    text.value = 'Длины ключа и шифра не совпадают';
    return;
  }
  text.value = encrypt(codes, keys).hexDecode();
}

function eGenerateClick() {
  let keyLength = document.getElementById('e-input').value.hexEncode().length;
  let keySet = document.getElementById('e-keySet');
  let key =  document.getElementById('e-key');
  keySet.value = generateKeySet(keyLength);
  key.value = keySet.value.split('\n')[Math.floor(Math.random() * 10)];
}

function eEncryptClick() {
  let codes = document.getElementById('e-input').value.hexEncode();
  let keys = document.getElementById('e-key').value.split(' ');
  let cipher = document.getElementById('e-cipher');
  if (keys.length === 1 && keys[0] === '') {
    cipher.value = 'Сначала нужно сгенерировать ключ';
    return;
  }
  if (keys.length - 1 !== codes.length) {
    cipher.value = 'Длины ключа и текста не совпадают';
    return;
  }
  let salt = keys.shift();
  keys = recoverKey(keys, salt);
  cipher.value = encrypt(codes, keys);
}

function eDecryptClick() {
  let codes = document.getElementById('e-cipher').value.split(' ');
  let keys = document.getElementById('e-key').value.split(' ');
  let text = document.getElementById('e-input');
  if (keys.length === 1 && keys[0] === '') {
    text.value = 'Введите ключ';
    return;
  }
  if (keys.length - 1 !== codes.length) {
    text.value = 'Длины ключа и шифра не совпадают';
    return;
  }
  let salt = keys.shift();
  keys = recoverKey(keys, salt);
  text.value = encrypt(codes, keys).hexDecode();
}

function eSaveClick() {
  let cipher = document.getElementById('e-cipher').value;
  let keySet = document.getElementById('e-keySet').value;
  let textToSave = 'Шифр:\n' + cipher + '\nГруппа ключей:\n' + keySet;
  let link = document.createElement('a');
  link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToSave));
  link.setAttribute('download', 'keys.txt');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}