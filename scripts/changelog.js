'use strict';

const { execFileSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');

const {
    BASE_URL, CHANGELOG_PATH, getFullDate, version,
} = require('./utils');

const changelogText = readFileSync(CHANGELOG_PATH, 'utf8');

const previousVersion = changelogText.match(/\[v(\d+\.\d+\.\d+)\]/)[1];
const gitOptions = ['log', `HEAD...v${previousVersion}`, '--pretty=tformat:%H %s'];

const commits = execFileSync('git', gitOptions, { encoding: 'utf8' })
    .split('\n')
    .map(text => ({hash: text.slice(0, 40), message: text.slice(41)}))
    .filter(({hash, message}) => hash && message && !/\d+\.\d+\.\d+/.test(message));

const commitsLinks = commits
    .map(({hash, message}) => `- [${message}](${BASE_URL}commit/${hash})`)
    .join('\n');

writeFileSync(CHANGELOG_PATH, `# Changelog

## [v${version}](${BASE_URL}tree/v${version}) (${getFullDate()})

[Full Changelog](${BASE_URL}compare/v${previousVersion}...v${version})

${commitsLinks}

${changelogText.slice(changelogText.search('##'))}`);
