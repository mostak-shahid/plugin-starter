const fs = require('fs-extra');
const { replaceInFile } = require('replace-in-file');

const pluginFiles = [
    'assets/**/*',
    'php/**/*',
    'templates/**/*',
    'src/**/*',
    'ultimate-security.php',
    'uninstall.php',
];
const { version } = JSON.parse(fs.readFileSync('package.json'));

replaceInFile({
    files: pluginFiles,
    from: [
        /ULTIMATE_SECURITY_SINCE/g,
        /ULTIMATE_SECURITY_PRO_SINCE/g,
    ],
    to: version,
})
    .then(results => {
        console.log('Replacement results:', results);
    })
    .catch(error => {
        console.error('Error occurred:', error);
    });

