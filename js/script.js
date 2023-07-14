const btnCopy = document.getElementById("copy");
const btnEncode = document.getElementById("encode");
const inputResult = document.getElementById("result");
const inputPassword = document.getElementById("password");

btnEncode.addEventListener("click", encode);

inputPassword.addEventListener("keydown", (event) => {
  inputResult.value = event.key === "Enter" ? encode() : inputResult.value;
});

btnCopy.addEventListener("click", () => {
  inputResult.focus();
  inputResult.select();
  try {
    // Somente alguns navegadores
    document.execCommand("copy");
  } catch (_) {
    console.error(_);
  }
  inputResult.setSelectionRange(0, inputResult.value.length);
  navigator.clipboard.writeText(inputResult.value);
});

async function encode() {
  const utf8 = new TextEncoder().encode(inputPassword.value);
  return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, "0"))
      .join("");
    inputResult.value = hashHex;
  });
}
