const input = document.getElementById('escribirNumeros');
const resultado = document.getElementById('resultado');
const regex = /^[-+/*()0-9\s.]+$/;
const calculadora = document.getElementById('calculadora');

input.addEventListener("input", actualizarResultado);
let abrirParentesis = 0;

function actualizarResultado (e) {
    const value = e.target.value;
    if(!regex.test(value)) {
        e.target.value = value.slice(0, -1);
        resultado.textContent = e.target.value === '' ? 0 : e.target.value;
    }else{
        resultado.textContent = e.target.value === '' ? 0 : e.target.value;
    }
};

const botonClickeado = calculadora.addEventListener('click', (e) => {
    const button = e.target;

    if(button.classList.contains('btn')) {
        const value = button.getAttribute('value');
        handleButtonClick(value);
    } else input.focus();

});

function handleButtonClick(value) {
    if (value === 'C') {
        input.value = '';
        resultado.textContent = 0;
    } else if (value === '=') {
        try {
            let resultadoCalculado = eval(input.value); 

            if (resultadoCalculado.toString().length > 12) {
                resultadoCalculado = resultadoCalculado.toString().slice(0, 12);
            }

            resultado.textContent = resultadoCalculado; 
            input.value = resultadoCalculado; 
            abrirParentesis = 0;

        } catch {
            resultado.textContent = 'Error';
            input.value = '';
            abrirParentesis = 0; 
        }
    } else if(value === '%') {
        input.value = parseFloat(input.value) / 100;
        actualizarResultado({ target: input });
    } else if(value === '+/-') {
        input.value = input.value * (-1);
        actualizarResultado({ target: input });
    } else if (value === '()') {
        if (abrirParentesis === 0) {
            input.value += '(';
            abrirParentesis += 1;
            console.log(abrirParentesis)
        } else {
            input.value += ')';
            abrirParentesis = 0;
        }
        actualizarResultado({ target: input });
    }else {
        input.value += value;
        actualizarResultado({ target: input });
    }
    input.focus();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleButtonClick('=');
    }
});