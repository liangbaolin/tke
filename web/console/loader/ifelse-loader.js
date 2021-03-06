let loaderUtils = require('loader-utils');
let parse = require('./lib/parse');
let fs = require('fs');

module.exports = function (source) {
  
    this.cacheable && this.cacheable();
    let options = loaderUtils.getOptions(this);
    // console.log(options)

    let resource = this._module.resource;

    let verbose = {
        Version : options.version,
        [options.version] : true
    }
    try {
        source = parse(source, verbose, verbose);

        //console.log('>>>>>>>>>>>>>>>>>>>>config', verbose)
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>ifelse', source)
        
        this.callback(null, source);
    }
    catch (err) {
        const errorMessage = `ifdef-loader error: ${err},file:${resource}`;
        this.callback(new Error(errorMessage));
    }
};

