const fs = require('fs-extra');

const libraryPath = '../library/src/lib/';

async function copyFiles() {

  try {

    await fs.copy('./src/components/', libraryPath + 'components');
    await fs.copy('./src/layout/', libraryPath + 'layout');
    await fs.copy('./src/models/', libraryPath + 'models');
  } catch (err) {
    console.error('Error executing copy function in library-copy.js', err);
  }
}

copyFiles();
