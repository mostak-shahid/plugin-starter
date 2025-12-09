const fs = require('fs-extra');
const { exec } = require('child_process');
const chalk = require('chalk');

const pluginFiles = [
    'assets/',
    'build/',
    'languages/',
    'php/',
    'templates/',
    'vendor/',
    'readme.txt',
    'composer.json',
    'ultimate-security.php',
    'uninstall.php',
];


const { version } = JSON.parse(fs.readFileSync('package.json'));

exec(
    'rm -rf *',
    {
        cwd: 'release',
    },
    (error) => {
        if (error) {
            console.log(
                chalk.yellow(`⚠️ Could not find the release directory.`)
            );
            console.log(chalk.green(`🗂 Creating the release directory ...`));
            // Making release folder.
            fs.mkdirp('release');
        }

        const dest = 'release/ultimate-security'; // Temporary folder name after copying all the files here.
        fs.mkdirp(dest);

        console.log(`🗜 Started making the zip ...`);
        try {
            console.log(`⚙️ Copying plugin files ...`);

            // Copying all the files into release folder.
            pluginFiles.forEach((file) => {
                fs.copySync(file, `${dest}/${file}`);
            });
            console.log(`📂 Finished copying files.`);
        } catch (err) {
            console.error(chalk.red('❌ Could not copy plugin files.'), err);
            return;
        }

        exec(
            'composer install --no-dev && composer du -o',
            {
                cwd: dest,
            },
            (error) => {
                if (error) {
                    console.log(
                        chalk.red(
                            `❌ Could not install composer in ${dest} directory.`
                        )
                    );
                    console.log(chalk.bgRed.black(error));

                    return;
                }

                console.log(
                    `⚡️ Installed composer packages in ${dest} directory.`
                );

                console.log(`🧹 Removing composer files from the release ...`);
                fs.removeSync(`${dest}/composer.json`);
                fs.removeSync(`${dest}/composer.lock`);

                // Output zip file name.
                const zipFile = `ultimate-security-v${version}.zip`;

                console.log(`📦 Making the zip file ${zipFile} ...`);

                // Making the zip file here.
                exec(
                    `zip ${zipFile} ultimate-security -rq`,
                    {
                        cwd: 'release',
                    },
                    (error) => {
                        if (error) {
                            console.log(
                                chalk.red(`❌ Could not make ${zipFile}.`)
                            );
                            console.log(chalk.bgRed.black(error));

                            return;
                        }

                        fs.removeSync(dest);
                        console.log(
                            chalk.green(`✅  ${zipFile} is ready. 🎉`)
                        );
                    }
                );
            }
        );
    }
);
