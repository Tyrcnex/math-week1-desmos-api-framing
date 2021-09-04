const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt);
var counter = 0;
var frames = 17;
var fps = 2;
var maxEquations = 0;

var equations = [];

async function getFrameTXT(frameNum) {
    const response = await fetch(`./frames/frame${frameNum}.txt`);
    return response.text();
}

function writeFrame(txt, prefix) {
    var equation = txt.toString().split(prefix);
    equations.push(equation);
}

for (var i = 0; i < frames; i++) {
    var frame = await getFrameTXT(i + 1);
    writeFrame(frame, "##");
}

for (var i = 0; i < equations.length; i++) {
    var equation = equations[i];
    if (equation.length > maxEquations) {
        maxEquations = equation.length;
    }
}

setInterval(() => {
    counter += 1;
    if (counter >= frames) {
        counter = 0;
    }
    for (var i = 0; i < maxEquations; i++) {
        calculator.setExpression({
            id: `graph${i}`,
            latex: equations[counter][i] || "",
            color: "#6f00ff",
            lineWidth: 0
        });
    }
}, 1000/fps);