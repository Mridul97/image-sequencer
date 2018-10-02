module.exports = function Convolution(options, UI) {

    options.kernelValues = options.kernelValues || '0 0 0 0 0 0 0 0 0'
    var output;

    function draw(input, callback, progressObj) {

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        var step = this;

        function changePixel(r, g, b, a) {
            return [r, g, b, a]
        }

        function extraManipulation(pixels) {
            pixels = require('./Convolution')(pixels, options.kernelValues)
            return pixels
        }

        function output(image, datauri, mimetype) {

            step.output = { src: datauri, format: mimetype };

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            extraManipulation: extraManipulation,
            format: input.format,
            image: options.image,
            callback: callback
        });

    }
    return {
        options: options,
        draw: draw,
        output: output,
        UI: UI
    }
}
