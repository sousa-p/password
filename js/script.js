const btnCopy = document.getElementById("copy");
const btnEncode = document.getElementById("encode");
const btnSave = document.getElementById("save");
const inputResult = document.getElementById("result");
const inputPassword = document.getElementById("password");

const base64 = document.getElementById("base64");
const capital = document.getElementById("capital_letters");
const special = document.getElementById("special_characters");


btnEncode.addEventListener("click", encode);
btnSave.addEventListener("click", encode);

inputPassword.addEventListener("keydown", (event) => {
  inputResult.value = event.key === "Enter" ? encode() : inputResult.value;
});

btnCopy.addEventListener("click", () => {
  inputResult.focus();
  inputResult.select();
  document.execCommand("copy");
  inputResult.setSelectionRange(0, inputResult.value.length);
  navigator.clipboard.writeText(inputResult.value);
});

async function encode() {
  if (base64.checked)
    return inputResult.value = addConfigs(btoa(inputPassword.value));
  
  const utf8 = new TextEncoder().encode(inputPassword.value);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    let hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    
    
    inputResult.value = addConfigs(hashHex);
  });
}


function addConfigs(str) {
  let result = str;

  if (capital.checked) {
    let match, idFirstLetter, startString, endString;

    match = /[a-z]/.exec(result);
    
    idFirstLetter = match.index;
    
    startString = (idFirstLetter > 0) ? result.slice(0, idFirstLetter) : '';
    capitalLetter = result.charAt(idFirstLetter).toUpperCase();
    endString = result.slice(idFirstLetter+1);

    result = startString + capitalLetter + endString;
  };
  if (special.checked) result = '@' + result;

  return result
}