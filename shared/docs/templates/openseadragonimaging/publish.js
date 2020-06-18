/*global env: true */
var template = require('jsdoc/template'),
    fs = require('jsdoc/fs'),
    path = require('jsdoc/path'),
    taffy = require('taffydb').taffy,
    handle = require('jsdoc/util/error').handle,
    helper = require('jsdoc/util/templateHelper'),
    htmlsafe = helper.htmlsafe,
    linkto = helper.linkto,
    resolveAuthorLinks = helper.resolveAuthorLinks,
    scopeToPunc = helper.scopeToPunc,
    hasOwnProp = Object.prototype.hasOwnProperty,
    data,
    view,
    outdir = env.opts.destination;

// Get OpenSeadragonImaging configuration (from [doc-conf.json].templates.openseadragonimaging)
var osdConfig = {};
if (env.conf.templates && env.conf.templates['openseadragonimaging']) {
    osdConfig = env.conf.templates['openseadragonimaging'];
}

// Setup for highlight.js
var hljs = null;
if (osdConfig.useHighlightJs) {
    hljs = require('./highlight.js');
}

// Setup for debugging/logging
var logMode = false,
    debugMode = false,
    logTextFile,
    logText,
    debugHtmlFile,
    debugHtmlHeader,
    debugHtmlFooter,
    debugHtml;
if (osdConfig.logMode) {
    logMode = true;
    logTextFile = outdir + '/debug.txt';
    logText = 'OpenSeadragonImaging Documentation Build Log\n\n';
}
if (osdConfig.debugMode) {
    debugMode = true;
    debugHtmlFile = outdir + '/debug.html';
    debugHtml = '<h1>OpenSeadragonImaging Documentation Build</h1>\n<h3>JSDOC Configuration</h3>\n<pre class="source-code">\nenv.conf =\n' + JSON.stringify(env.conf, null, 2) + ';\n</pre>\n';
    debugHtmlHeader = '\
        <!DOCTYPE html>\n\
        <html lang="en">\n\
        <head>\n\
            <meta charset="utf-8">\n\
            <title>OpenSeadragonImaging Documentation Build Debug</title>\n\
            \n\
            <script src="scripts/prettify/prettify.js"> </script>\n\
            <script src="scripts/prettify/lang-css.js"> </script>\n\
            <link type="text/css" rel="stylesheet" href="styles/prettify.css">\n\
            <!--<link type="text/css" rel="stylesheet" href="styles/desert.css">-->\n\
            <link type="text/css" rel="stylesheet" href="styles/jsdoc-openseadragonimaging.css">\n\
        </head>\n\
        \n\
        <body>\n\
        <div id="container" style="overflow:auto;">\n\n';
    debugHtmlFooter = '\n\
        <footer>\n\
            End OpenSeadragonImaging Debug Output \n\
        </footer>\n\
        \n\
        </div>\n\
        </body>\n\
        </html>\n';

}

function find(spec) {
    return helper.find(data, spec);
}

function tutoriallink(tutorial) {
    return helper.toTutorial(tutorial, null, { tag: 'em', classname: 'disabled', prefix: 'Tutorial: ' });
}

function getAncestorLinks(doclet) {
    return helper.getAncestorLinks(data, doclet);
}

function hashToLink(doclet, hash) {
    if ( !/^(#.+)/.test(hash) ) { return hash; }
    
    var url = helper.createLink(doclet);
    
    url = url.replace(/(#.+|$)/, hash);
    return '<a href="' + url + '">' + hash + '</a>';
}

function needsSignature(doclet) {
    var needsSig = false;

    // function and class definitions always get a signature
    if (doclet.kind === 'function' || doclet.kind === 'class') {
        needsSig = true;
    }
    // typedefs that contain functions get a signature, too
    else if (doclet.kind === 'typedef' && doclet.type && doclet.type.names &&
        doclet.type.names.length) {
        for (var i = 0, l = doclet.type.names.length; i < l; i++) {
            if (doclet.type.names[i].toLowerCase() === 'function') {
                needsSig = true;
                break;
            }
        }
    }

    return needsSig;
}

function addSignatureParams(f) {
    var params = helper.getSignatureParams(f, 'optional');
    
    f.signature = (f.signature || '') + '('+params.join(', ')+')';
}

function addSignatureReturns(f) {
    var returnTypes = helper.getSignatureReturns(f);
    
    f.signature = '<span class="signature">' + (f.signature || '') + '</span>' +
        '<span class="type-signature">' +
        (returnTypes && returnTypes.length ? ' &rarr; {' + returnTypes.join('|') + '}' : '') +
        '</span>';
}

function addSignatureTypes(f) {
    var types = helper.getSignatureTypes(f);
    
    f.signature = (f.signature || '') + '<span class="type-signature">'+(types.length? ' :'+types.join('|') : '')+'</span>';
}

function addAttribs(f) {
    var attribs = helper.getAttribs(f);
    
    f.attribs = '<span class="type-signature">' + htmlsafe(attribs.length ?
        // we want the template output to say 'abstract', not 'virtual'
        '<' + attribs.join(', ').replace('virtual', 'abstract') + '> ' : '') + '</span>';
}

function shortenPaths(files, commonPrefix) {
    // always use forward slashes
    var regexp = new RegExp('\\\\', 'g');

    Object.keys(files).forEach(function(file) {
        files[file].shortened = files[file].resolved.replace(commonPrefix, '')
            .replace(regexp, '/');
    });

    return files;
}

function resolveSourcePath(filepath) {
    return path.resolve(process.cwd(), filepath);
}

function getPathFromDoclet(doclet) {
    if (!doclet.meta) {
        return;
    }

    var filepath = doclet.meta.path && doclet.meta.path !== 'null' ?
        doclet.meta.path + '/' + doclet.meta.filename :
        doclet.meta.filename;

    return filepath;
}
    
function generate(title, pageTitle, docs, filename, resolveLinks, highlightSource) {
    resolveLinks = resolveLinks === false ? false : true;

    var docData = {
        title: title || ('OpenSeadragonImaging ' + pageTitle),
        pageTitle: pageTitle,
        docs: docs
    };
    
    var outpath = path.join(outdir, filename),
        html = view.render('container.tmpl', docData);
    
    if (resolveLinks) {
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
    }
    
    fs.writeFileSync(outpath, html, 'utf8');
}

function generateSourceLineNumberIds(source) {
    var counter = 0;
    var numbered = source.split('\n');

    numbered = numbered.map(function(item) {
        counter++;
        return '<span id="line' + counter + '" class="line"></span>' + item;
    });

    return numbered.join('\n');
}

function generateSourceFiles(sourceFiles, encoding) {
    encoding = encoding || 'utf8';
    Object.keys(sourceFiles).forEach(function(file) {
        var source;
        // links are keyed to the shortened path in each doclet's `meta.filename` property
        var sourceOutfile = helper.getUniqueFilename(sourceFiles[file].shortened);
        helper.registerLink(sourceFiles[file].shortened, sourceOutfile);

        try {
            source = {
                kind: 'source',
                code: fs.readFileSync(sourceFiles[file].resolved, encoding)
            };
        }
        catch(e) {
            handle(e);
        }

        if (hljs) {
            //source.code = hljs.highlightAuto(source.code).value;
            // For a generic template this should be auto. 
            // OpenSeadragonImaging is pure javascript, so this speeds things up.
            source.code = hljs.highlight('javascript', source.code).value;

            source.code = generateSourceLineNumberIds(source.code);
        }
        else {
            source.code = helper.htmlsafe(source.code);
        }

        generate(null, 'Source: ' + sourceFiles[file].shortened, [source], sourceOutfile,
            false, true);
    });
}

/**
 * Look for classes or functions with the same name as modules (which indicates that the module
 * exports only that class or function), then attach the classes or functions to the `module`
 * property of the appropriate module doclets. The name of each class or function is also updated
 * for display purposes. This function mutates the original arrays.
 * 
 * @private
 * @param {Array.<module:jsdoc/doclet.Doclet>} doclets - The array of classes and functions to
 * check.
 * @param {Array.<module:jsdoc/doclet.Doclet>} modules - The array of module doclets to search.
 */
function attachModuleSymbols(doclets, modules) {
    var symbols = {};

    // build a lookup table
    doclets.forEach(function(symbol) {
        symbols[symbol.longname] = symbol;
    });

    return modules.map(function(module) {
        if (symbols[module.longname]) {
            module.module = symbols[module.longname];
            module.module.name = module.module.name.replace('module:', 'require("') + '")';
        }
    });
}

/**
 * Create the navigation sidebar.
 * @param {object} members The members that will be used to create the sidebar.
 * @param {array<object>} members.classes
 * @param {array<object>} members.externals
 * @param {array<object>} members.globals
 * @param {array<object>} members.mixins
 * @param {array<object>} members.modules
 * @param {array<object>} members.namespaces
 * @param {array<object>} members.tutorials
 * @param {array<object>} members.events
 * @return {string} The HTML for the navigation sidebar.
 */
function buildNav(members) {
    var nav = '<h2><a href="index.html">Index</a></h2>',
        seen = {},
        hasClassList = false,
        classNav = '',
        globalNav = '',
        prevClass;

    if (members.externals.length) {
        nav += '<h3>Externals</h3><ul>';
        members.externals.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                nav += '<li>'+linkto( e.longname, e.name.replace(/(^"|"$)/g, '') )+'</li>';
            }
            seen[e.longname] = true;
        });
        
        nav += '</ul>';
    }

    if (members.modules.length) {
        nav += '<h3>Modules</h3><ul>';
        members.modules.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>'+linkto(m.longname, m.name)+'</li>';
            }
            seen[m.longname] = true;
        });
        
        nav += '</ul>';
    }
    
    if (members.namespaces.length) {
        nav += '<h3>Namespaces</h3><ul>';
        members.namespaces.forEach(function(n) {
            if ( !hasOwnProp.call(seen, n.longname) ) {
                nav += '<li>'+linkto(n.longname, n.name)+'</li>';
            }
            seen[n.longname] = true;
        });
        
        nav += '</ul>';
    }
    
    if (members.classes.length) {
        members.classes.forEach(function(c) {
            if ( !hasOwnProp.call(seen, c.longname) ) {
                classNav += '<li>'+linkto(c.longname, c.name)+'</li>';
            }
            seen[c.longname] = true;
        });
        
        if (classNav !== '') {
            nav += '<h3>Classes</h3><ul>';
            nav += classNav;
            nav += '</ul>';
        }
    }

    if (members.mixins.length) {
        nav += '<h3>Mixins</h3><ul>';
        members.mixins.forEach(function(m) {
            if ( !hasOwnProp.call(seen, m.longname) ) {
                nav += '<li>'+linkto(m.longname, m.name)+'</li>';
            }
            seen[m.longname] = true;
        });
        
        nav += '</ul>';
    }

    if (members.events.length) {
        //**debug**
        //if (debugMode) {
        //    debugHtml += ('<h3>members.events</h3>\n<pre class="source-code">\nmembers.events =\n' + JSON.stringify(members.events, null, "  ") + '</pre>\n');
        //}
        //**debug**
        prevClass = '';
        nav += '<h3>Events</h3>';
        members.events.forEach(function(e) {
            if ( !hasOwnProp.call(seen, e.longname) ) {
                // Add header to group by parent class
                if (e.memberof !== prevClass) {
                    if (prevClass.length > 0) {
                        nav += '</ul>';
                    }
                    nav += '<h4>' + e.memberof + '</h4>';
                    nav += '<ul>';
                    prevClass = e.memberof;
                }
                nav += '<li>'+linkto(e.longname, e.name)+'</li>';
            }
            seen[e.longname] = true;
        });
        
        nav += '</ul>';

    }
    
    if (members.tutorials.length) {
        nav += '<h3>Tutorials</h3><ul>';
        members.tutorials.forEach(function(t) {
            nav += '<li>'+tutoriallink(t.name)+'</li>';
        });
        
        nav += '</ul>';
    }
    
    if (members.globals.length) {
        members.globals.forEach(function(g) {
            if ( g.kind !== 'typedef' && !hasOwnProp.call(seen, g.longname) ) {
                globalNav += '<li>' + linkto(g.longname, g.name) + '</li>';
            }
            seen[g.longname] = true;
        });
        
        if (!globalNav) {
            // turn the heading into a link so you can actually get to the global page
            nav += '<h3>' + linkto('global', 'Global') + '</h3>';
        }
        else {
            nav += '<h3>Global</h3><ul>' + globalNav + '</ul>';
        }
    }

    return nav;
}


/**
    @param {TAFFY} taffyData See <http://taffydb.com/>.
    @param {object} opts
    @param {Tutorial} tutorials
 */
exports.publish = function(taffyData, opts, tutorials) {
    data = taffyData;

    var conf = env.conf.templates || {};
    conf['default'] = conf['default'] || {};

    var templatePath = opts.template;
    view = new template.Template(templatePath + '/tmpl');
    
    // claim some special filenames in advance, so the All-Powerful Overseer of Filename Uniqueness
    // doesn't try to hand them out later
    var indexUrl = helper.getUniqueFilename('index');
    // don't call registerLink() on this one! 'index' is also a valid longname

    var globalUrl = helper.getUniqueFilename('global');
    helper.registerLink('global', globalUrl);

    // set up templating
    view.layout = 'layout.tmpl';

    // set up tutorials for helper
    helper.setTutorials(tutorials);

    data = helper.prune(data);
    data.sort('longname, version, since');
    helper.addEventListeners(data);

    var sourceFiles = {};
    var sourceFilePaths = [];
    data().each(function(doclet) {
         doclet.attribs = '';
        
        if (doclet.examples) {
            doclet.examples = doclet.examples.map(function(example) {
                var caption, code;
                
                if (example.match(/^\s*<caption>([\s\S]+?)<\/caption>(\s*[\n\r])([\s\S]+)$/i)) {
                    caption = RegExp.$1;
                    code    = RegExp.$3;
                }
                
                return {
                    caption: caption || '',
                    code: code || example
                };
            });
        }
        if (doclet.see) {
            doclet.see.forEach(function(seeItem, i) {
                doclet.see[i] = hashToLink(doclet, seeItem);
            });
        }

        // build a list of source files
        var sourcePath;
        var resolvedSourcePath;
        if (doclet.meta) {
            sourcePath = getPathFromDoclet(doclet);
            resolvedSourcePath = resolveSourcePath(sourcePath);
            sourceFiles[sourcePath] = {
                resolved: resolvedSourcePath,
                shortened: null
            };
            sourceFilePaths.push(resolvedSourcePath);
        }
    });
    
    // update outdir if necessary, then create outdir
    var packageInfo = ( find({kind: 'package'}) || [] ) [0];
    if (packageInfo && packageInfo.name) {
        outdir = path.join(outdir, packageInfo.name, packageInfo.version);
    }
    fs.mkPath(outdir);

    // copy the template's static files to outdir
    var fromDir = path.join(templatePath, 'static');
    var staticFiles = fs.ls(fromDir, 3);

    staticFiles.forEach(function(fileName) {
        var toDir = fs.toDir( fileName.replace(fromDir, outdir) );
        fs.mkPath(toDir);
        fs.copyFileSync(fileName, toDir);
    });

    // copy user-specified static files to outdir
    var staticFilePaths;
    var staticFileFilter;
    var staticFileScanner;
    if (conf['default'].staticFiles) {
        staticFilePaths = conf['default'].staticFiles.paths || [];
        staticFileFilter = new (require('jsdoc/src/filter')).Filter(conf['default'].staticFiles);
        staticFileScanner = new (require('jsdoc/src/scanner')).Scanner();

        staticFilePaths.forEach(function(filePath) {
            var extraStaticFiles = staticFileScanner.scan([filePath], 10, staticFileFilter);

            extraStaticFiles.forEach(function(fileName) {
                var sourcePath = fs.statSync(filePath).isDirectory() ? filePath :
                    path.dirname(filePath);
                var toDir = fs.toDir( fileName.replace(sourcePath, outdir) );
                fs.mkPath(toDir);
                fs.copyFileSync(fileName, toDir);
            });
        });
    }
    
    if (sourceFilePaths.length) {
        sourceFiles = shortenPaths( sourceFiles, path.commonPrefix(sourceFilePaths) );
    }
    data().each(function(doclet) {
        var url = helper.createLink(doclet);
        helper.registerLink(doclet.longname, url);

        // replace the filename with a shortened version of the full path
        var docletPath;
        if (doclet.meta) {
            docletPath = getPathFromDoclet(doclet);
            docletPath = sourceFiles[docletPath].shortened;
            if (docletPath) {
                doclet.meta.filename = docletPath;
            }
        }
    });
    
    data().each(function(doclet) {
        var url = helper.longnameToUrl[doclet.longname];

        if (url.indexOf('#') > -1) {
            doclet.id = helper.longnameToUrl[doclet.longname].split(/#/).pop();
        }
        else {
            doclet.id = doclet.name;
        }
        
        if ( needsSignature(doclet) ) {
            addSignatureParams(doclet);
            addSignatureReturns(doclet);
            addAttribs(doclet);
        }
    });
    
    // do this after the urls have all been generated
    data().each(function(doclet) {
        doclet.ancestors = getAncestorLinks(doclet);

        if (doclet.kind === 'member') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
        }
        
        if (doclet.kind === 'constant') {
            addSignatureTypes(doclet);
            addAttribs(doclet);
            doclet.kind = 'member';
        }
    });
    
    var members = helper.getMembers(data);
    members.tutorials = tutorials.children;

    ////**debug**
    //if (debugMode) {
    //    debugHtml += ('<h3>members.classes</h3>\n<pre class="source-code">\nmembers.classes =\n' + JSON.stringify(members.classes, null, "  ") + '</pre>\n');
    //}
    ////**debug**

    // add template helpers
    view.find = find;
    view.linkto = linkto;
    view.resolveAuthorLinks = resolveAuthorLinks;
    view.tutoriallink = tutoriallink;
    view.htmlsafe = htmlsafe;
    view.hljs = hljs;

    // once for all
    view.nav = buildNav(members);
    attachModuleSymbols( find({ kind: ['class', 'function'], longname: {left: 'module:'} }),
        members.modules );

    // output source files by default; do this before generating any other pages, so
    // that the other pages can link to the source files
    if (!conf['default'] || conf['default'].outputSourceFiles !== false) {
        generateSourceFiles(sourceFiles, opts.encoding);
    }

    if (members.globals.length) { generate(null, 'Global', [{kind: 'globalobj'}], globalUrl); }
    
    // index page displays information from package.json and lists files
    var files = find({kind: 'file'}),
        packages = find({kind: 'package'});

    //**debug**
    if (debugMode) {
        debugHtml += ('<h3>mainpage docs</h3>\n<pre class="source-code">\ndocs =\n' + JSON.stringify(packages.concat([{kind: 'mainpage', readme: opts.readme, longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'}]), null, "  ") + '</pre>\n');
    }
    //**debug**
    generate('OpenSeadragonImaging API', 'OpenSeadragonImaging API',
        packages.concat(
            [{kind: 'mainpage', readme: opts.readme, longname: (opts.mainpagetitle) ? opts.mainpagetitle : 'Main Page'}]
        ).concat(files),
    indexUrl);

    // set up the lists that we'll use to generate pages
    var classes = taffy(members.classes);
    var modules = taffy(members.modules);
    var namespaces = taffy(members.namespaces);
    var mixins = taffy(members.mixins);
    var externals = taffy(members.externals);
    
    Object.keys(helper.longnameToUrl).forEach(function(longname) {
        var myClasses = helper.find(classes, {longname: longname});
        if (myClasses.length) {
            generate(null, 'Class: ' + myClasses[0].name, myClasses, helper.longnameToUrl[longname]);
        }
        
        var myModules = helper.find(modules, {longname: longname});
        if (myModules.length) {
            generate(null, 'Module: ' + myModules[0].name, myModules, helper.longnameToUrl[longname]);
        }

        var myNamespaces = helper.find(namespaces, {longname: longname});
        if (myNamespaces.length) {
            generate(null, 'Namespace: ' + myNamespaces[0].name, myNamespaces, helper.longnameToUrl[longname]);
        }
        
        var myMixins = helper.find(mixins, {longname: longname});
        if (myMixins.length) {
            generate(null, 'Mixin: ' + myMixins[0].name, myMixins, helper.longnameToUrl[longname]);
        }

        var myExternals = helper.find(externals, {longname: longname});
        if (myExternals.length) {
            generate(null, 'External: ' + myExternals[0].name, myExternals, helper.longnameToUrl[longname]);
        }
    });

    // TODO: move the tutorial functions to templateHelper.js
    function generateTutorial(title, tutorial, filename) {
        var tutorialData = {
            title: title,
            header: tutorial.title,
            content: tutorial.parse(),
            children: tutorial.children
        };
        
        var tutorialPath = path.join(outdir, filename),
            html = view.render('tutorial.tmpl', tutorialData);
        
        // yes, you can use {@link} in tutorials too!
        html = helper.resolveLinks(html); // turn {@link foo} into <a href="foodoc.html">foo</a>
        
        fs.writeFileSync(tutorialPath, html, 'utf8');
    }
    
    // tutorials can have only one parent so there is no risk for loops
    function saveChildren(node) {
        node.children.forEach(function(child) {
            generateTutorial('Tutorial: ' + child.title, child, helper.tutorialToUrl(child.name));
            saveChildren(child);
        });
    }
    saveChildren(tutorials);

    if (logMode) {
        fs.writeFileSync(logTextFile, logText, 'utf8');
    }
    if (debugMode) {
        fs.writeFileSync(debugHtmlFile, debugHtmlHeader + debugHtml + debugHtmlFooter, 'utf8');
    }
};
