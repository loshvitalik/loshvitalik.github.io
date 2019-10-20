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

document.getElementById('simple_cipher').addEventListener('click', simple_cipher);
document.getElementById('simple_generate').addEventListener('click', simple_generate);
document.getElementById('simple_getkey').addEventListener('click', simple_getkey);
document.getElementById('simple_decipher').addEventListener('click', simple_decipher);

function simple_cipher() {
  let codes = document.getElementById('simple_input').value.hexEncode();
  let keys = document.getElementById('simple_key').value.split(' ');
  if (keys.length === 1 && keys[0] === '') {
    document.getElementById('simple_ciphertext').value = 'Сначала нужно сгенерировать ключ';
    return;
  }
  if (keys.length !== codes.length) {
    document.getElementById('simple_ciphertext').value = 'Длины ключа и текста не совпадают';
    return;
  }

  document.getElementById('simple_ciphertext').value = encrypt(codes, keys);
}

function simple_generate() {
  let keyLength = document.getElementById('simple_input').value.hexEncode().length;
  document.getElementById('simple_key').value = generateKey(keyLength);
}

function simple_getkey() {
  let textCodes = document.getElementById('simple_input').value.hexEncode();
  let cipherCodes = document.getElementById('simple_ciphertext').value.split(' ');
  if (textCodes.length !== 0 && textCodes.length !== cipherCodes.length) {
    document.getElementById('simple_key').value = 'Длины строк не совпадают, подобрать ключ невозможно';
    return;
  }
  document.getElementById('simple_key').value = encrypt(textCodes, cipherCodes);
}

function simple_decipher() {
  let codes = document.getElementById('simple_ciphertext').value.split(' ');
  let keys = document.getElementById('simple_key').value.split(' ');
  if (keys.length === 1 && keys[0] === '') {
    document.getElementById('simple_input').value = 'Введите ключ';
    return;
  }
  if (keys.length !== codes.length) {
    document.getElementById('simple_input').value = 'Длины ключа и шифра не совпадают';
    return;
  }
  document.getElementById('simple_input').value = encrypt(codes, keys).hexDecode();
}

function generateKey(keyLength) {
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    let isLast = i === keyLength - 1;
    let number = (Math.random() * 0xFFF << 0).toString(16);
    key += ('00' + number).slice(-3) + (isLast ? '' : ' ');
  }
  return key;
}

function encrypt(codes, keys) {
  let cipher = '';
  for (let i = 0; i < codes.length; i++) {
    let isLast = i === codes.length - 1;
    cipher += (parseInt('0x' + codes[i], 16) ^ parseInt('0x' + keys[i], 16)).toString(16) + (isLast ? '' : ' ');
  }
  return cipher;
}