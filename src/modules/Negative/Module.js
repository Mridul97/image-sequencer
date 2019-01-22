module.exports = function Negative(options,UI){


    var output;

    function draw(input,callback,progressObj){

        progressObj.stop(true);
        progressObj.overrideFlag = true;

        /*
        In this case progress is handled by changepixel internally otherwise progressObj
        needs to be overriden and used
        For eg. progressObj = new SomeProgressModule()
        */

        var step = this;

        function changePixel(r, g, b, a){

            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
            return [r, g, b, a]
        }

        function output(image,datauri,mimetype){

            // This output is accessible by Image Sequencer
            step.output = {src:datauri,format:mimetype};

        }

        return require('../_nomodule/PixelManipulation.js')(input, {
            output: output,
            changePixel: changePixel,
            format: input.format,
            image: options.image,
            inBrowser: options.inBrowser,
            callback: callback
        });

    }
    return {
        options: options,
        draw:  draw,
        output: output,
        UI: UI
    }
}
