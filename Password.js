function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  function generatePassword() {
      let length = document.getElementById('length').value;

      if (length <= 0) {
        length = 1;
      }
      let symbols = document.querySelectorAll('#symbols input[type="checkbox"]:checked');
      let includedSymbols = [];
      symbols.forEach(function(symbol) {
          includedSymbols.push(symbol.value);
      });

      let password = '';
      for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * includedSymbols.length);
        let randomSymbol = includedSymbols[randomNumber];
    
        if (randomSymbol == 1) {
          let randomNumber = Math.floor(Math.random() * 10);
          password += randomNumber;
        } else if (randomSymbol == 2) {
          let randomNumber = Math.floor(Math.random() * 26);
          let randomLetter = String.fromCharCode(97 + randomNumber);
          if (Math.random() >= 0.5) {
            randomLetter = randomLetter.toUpperCase();
          }
          password += randomLetter;
        } else if (randomSymbol == 3) {
          let specialCharacters = '!@#$%^&(){}[]=<>/,+-*/.';
          let randomNumber = Math.floor(Math.random() * specialCharacters.length);
          let randomSpecialCharacter = specialCharacters[randomNumber];
          password += randomSpecialCharacter;
        }
      }

      document.getElementById('password').value = password;
  }

  document.getElementById('password').addEventListener('click', function() {
      this.select();
      document.execCommand('copy');
  });

  function copypass() {
    let password = document.getElementById("password").value;
    let clipboard = new ClipboardJS('#copy-password', {
        text: function() {
            return password;
        }
    });

    clipboard.on('success', function(e) {
        document.getElementById("copy-password").value = "Copy";
        document.getElementById("password").select();
    });
    
    clipboard.on('error', function(e) {
        document.getElementById("copy-password").value = "Error!";
    });
  }