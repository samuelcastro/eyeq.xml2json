/**
 * @author Samuel Castro
 * @description XML to JSON converter
 * @since 7/14/15
 */

var fs = require('fs'),
    xml2js = require('xml2js'),
    dir = require('node-dir'),
    path = require('path'),
    program = require('commander'),
    filendir = require('filendir'),
    inspect = require('eyes').inspector({styles: {all: 'magenta'}});

var parser = new xml2js.Parser({ explicitArray: false });

/**
 * Creating a xml2json constructor
 */
function xml2json() {
    this.init();
}

/**
 * Start the process getting the directory/file to convert
 */
xml2json.prototype.init = function() {
    var self = this;

    program
        .version('1.0.0')
        .option('-o, --origin [origin]', 'Add the specified directory of XML files.')
        .option('-d, --destination [destination]', 'Add the specified XML file.')
        .parse(process.argv);

    /**
     * Getting the files to convert
     */
    dir.paths(program.origin,function(err, paths) {
        if (err) throw err;
        self.convert(paths.files, program, function(err, result) {
            if (err) throw err;
            inspect('[' + (100/paths.files.length * result.index + 1).toFixed(0) + '%] ' + result.file + ' written!');
            if(paths.files.length === result.index + 1) {
                inspect('[100%] DONE');
            }
        });
    });
};

/**
 * Converting XML to JSON creating the same directory structure
 * @param files
 * @param cb
 */
xml2json.prototype.convert = function(files, program, cb) {
    for(var i in files) {
        parser.parseString(fs.readFileSync(files[i]), function(err, result) {
            if(err) cb(err);
            if (filendir.ws((program.destination || '.') + '/' + files[i].replace(program.origin, '').replace('xml', 'json'), JSON.stringify(result, null, "\t"))) {
                cb(null, { file: (program.destination || '.') + '/' + files[i].replace(program.origin, '').replace('xml', 'json'), output: result, index: i * 1 })
            }
        });
    }
};

/**
 * Exporting module
 * @type {{run: xml2json}}
 */
module.exports = {
    run: new xml2json()
};
