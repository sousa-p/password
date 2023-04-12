const inputPassword = document.getElementById('password');
const inputResult   = document.getElementById('result');

const btnCopy   = document.getElementById('copy');
const btnEncode = document.getElementById('encode');

function encode (data) {
  let encoded;
  encoded = btoa(data);
  return encoded;
}

btnEncode.addEventListener('click', () => {
  inputResult.value = encode(inputPassword.value);
});

inputPassword.addEventListener('keydown', (event) => {
  if (event.key === 'Key') {
    inputResult.value = encode(inputPassword.value);
  }
});

btnCopy.addEventListener('click', () => {
  navigator.clipboard.writeText(inputResult.value);
});