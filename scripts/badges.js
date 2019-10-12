'use strict';

const { readFileSync, writeFileSync } = require('fs');

const {
    getColor, getDepsLength, README_PATH, version,
} = require('./utils');

const readmeText = readFileSync(README_PATH, 'utf8');

const deps = getDepsLength('dependencies');
const devDeps = getDepsLength('devDependencies');
const peerDeps = getDepsLength('peerDependencies');

writeFileSync(
    README_PATH,
    readmeText
        .replace(/\/dependencies-\d+/, `/dependencies-${deps}`)
        .replace(/\/devDependencies-\d+/, `/devDependencies-${devDeps}`)
        .replace(/\/peerDependencies-\d+/, `/peerDependencies-${peerDeps}`)
        .replace(/\/version-.+-blue/, `/version-${version}-blue`),
);
