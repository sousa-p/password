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
  console.log(event.key)
  inputResult.value = (event.key === 'Enter') ? encode(inputPassword.value) : inputResult.value;
});

btnCopy.addEventListener('click', () => {
  inputResult.select();
  inputResult.setSelectionRange(0, inputResult.value.length);
  navigator.clipboard.writeText(inputResult.value);
});