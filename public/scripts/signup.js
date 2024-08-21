document.addEventListener('DOMContentLoaded', () => {
    // VALIDATION CSS CHANGES
    const inputs = document.querySelectorAll("input");
    grayOutConfirms()

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('focused');

            const siblingSvg = input.previousElementSibling;
            siblingSvg.style.stroke = 'var(--focus-color)'

        });


        input.addEventListener('blur', () => {
            grayOutConfirms()

            if(input.classList[0] !== "confirm") {

                const message = input.validationMessage;
                input.checkValidity() ? handleValidInput(input, message) : handleInvalidInput(input, message)
            } else {
                const message = `${(input.type).charAt(0).toUpperCase() + (input.type).slice(1)}s don't match.`;
                if (input.type === "email") {
                    const firstEmail = document.querySelector('input[type="email"]');
                    (input.value === firstEmail.value && input.value != "") ? handleValidInput(input) : handleInvalidInput(input, message);
                } else if (input.type === "password") {
                    const firstPassword = document.querySelector('input[type="password"]');
                    (input.value === firstPassword.value  && input.value != "")  ? handleValidInput(input) : handleInvalidInput(input, message);

                }
            }
        });

        input.addEventListener('input', () => {
            grayOutConfirms()

            if(input.classList[0] !== "confirm") {

                const message = input.validationMessage;
                input.checkValidity() ? handleValidInput(input, message) : handleInvalidInput(input, message)


            } else {
                const message = `${(input.type).charAt(0).toUpperCase() + (input.type).slice(1)}s don't match.`;
                if (input.type === "email") {
                    const firstEmail = document.querySelector('input[type="email"]');
                    input.value === firstEmail.value ? handleValidInput(input) : handleInvalidInput(input, message);
                } else if (input.type === "password") {
                    const firstPassword = document.querySelector('input[type="password"]');
                    input.value === firstPassword.value  ? handleValidInput(input) : handleInvalidInput(input, message);
                }
            }

        });

    // BUTTON VALIDATION
    const submitButton = document.getElementById('submitButton');
    const form = document.getElementById('form');
  
    submitButton.addEventListener('click', () => {
        let count = 0;
    
        inputs.forEach(input => {
            if(input.classList.contains('valid')) {
                count++;
            }
        });
    
        if(count === inputs.length) {
            form.submit();
        } else {
            if(!input.classList.contains('valid')) {
                const message = input.validationMessage;
                handleInvalidInput(input, message);

                input.parentElement.parentElement.style.animation = 'shake 1 0.5s'
                setTimeout(() => {
                    input.parentElement.parentElement.style.animation = ''
                    ;
                  }, "1000");
                  
            }
        }
        });
    });
});

function handleValidInput(input) {
    const prevSvg = input.previousElementSibling;
    prevSvg.style.stroke = 'var(--correct-color)';

    input.classList.remove('focused');
    input.classList.remove('invalid')
    input.classList.add('valid');

    const errorMessageSpan = input.parentElement.nextElementSibling;
    errorMessageSpan.textContent = "";

}

function handleInvalidInput(input, message) {
    let inputString = input.value;

    if (input.value == "") {
        message = `You can't have an empty ${input.type != 'text' ? input.type : 'name'}.`
        console.log("working?111")

    }
    if (input.type === 'password' && !input.classList.contains('confirm')) {
        message = "";
        if (inputString.length < 6) {
            message += `Use at least 6 characters (currently ${inputString.length} ${inputString.length == 1 ? "character" : "characters"}).<br>`;
        }
        if (!/[!@#$%^,.&*]/.test(inputString)) { // Check if there is no symbol
            message += "Add a valid symbol.<br>";
        }
        if (!/[A-Z]/.test(inputString)) {
            message += "Add an uppercase letter.<br>";
        }
        if (!/\d/.test(inputString)) {
            message += "Add a number. <br>"
        }
        if (inputString.length > 14) {
            message += `Use less than 20 characters (currently ${inputString.length} characters).`
        }
    } else if (input.type === 'text') {
        if (input.validity.patternMismatch) {
            message = "Numbers are not allowed.<br>";
        }
    }

    const prevSvg = input.previousElementSibling;
    prevSvg.style.stroke = 'var(--wrong-color)';

    input.classList.remove('focused');
    input.classList.remove('valid');
    input.classList.add('invalid');

    const errorMessageSpan = input.parentElement.nextElementSibling;
    errorMessageSpan.innerHTML = message;
}

function grayOutConfirms() {
    const firstEmail = document.querySelector('input[type="email"]');
    const confirmEmail = document.querySelector('input[type="email"].confirm');
    const firstPassword = document.querySelector('input[type="password"]');
    const confirmPassword = document.querySelector('input[type="password"].confirm');

    const prevSvgEmail = confirmEmail.previousElementSibling;
    const prevSvgPassword = confirmPassword.previousElementSibling;

    if(firstEmail.value == "") {
        confirmEmail.disabled = true;
        confirmEmail.value = ""
        prevSvgEmail.style.stroke = 'gray';

        confirmEmail.classList.remove('valid');
        confirmEmail.classList.remove('invalid');

        const errorMessageSpan = confirmEmail.parentElement.nextElementSibling;
        errorMessageSpan.innerHTML = "";
    }
    if(firstPassword.value == "") {
        confirmPassword.disabled = true;
        confirmPassword.value = ""
        prevSvgPassword.style.stroke = 'gray';

        confirmPassword.classList.remove('valid');
        confirmPassword.classList.remove('invalid');

        const errorMessageSpan = confirmPassword.parentElement.nextElementSibling;
        errorMessageSpan.innerHTML = "";
    }

    if(firstEmail.value != "") {
        confirmEmail.disabled = false;
        prevSvgEmail.style.stroke == 'gray' ? prevSvgEmail.style.stroke = "" : ""
    }
    if(firstPassword.value != "") {
        confirmPassword.disabled = false;
        prevSvgPassword.style.stroke == 'gray' ? prevSvgPassword.style.stroke = "" : ""

    }
}