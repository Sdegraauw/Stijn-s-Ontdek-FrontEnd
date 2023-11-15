export function RoundToOneDecimal(meting) {
    return Math.round(meting * 10)/10;
}

export function ContrastToColour (contrastValue) {
    let red = Math.round(Red(contrastValue) * 255);
    let green = Math.round(Green(contrastValue) * 255);
    let blue = Math.round(Blue(contrastValue) * 255);

    return "rgb(" + red.toString() + "," +
        green.toString() + "," +
        blue.toString() + ")";
}

function Red(contrastValue) {
    return (Math.pow(2, contrastValue) - 1);
}

function Green(contrastValue) {
    return Math.abs((-4 * Math.pow(contrastValue, 2)) + (4 * contrastValue));
}

function Blue(contrastValue) {
    return ((Math.pow(2, 1 - contrastValue) - 1));
}