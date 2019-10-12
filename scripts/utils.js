'use strict';

const { join } = require('path');

const pkg = require('../package');

const BASE_URL = 'https://github.com/uid-11222/ts-redux-store/';
const CHANGELOG_PATH = join(__dirname, '../CHANGELOG.md');
const README_PATH = join(__dirname, '../README.md');

const getColor = percent => {
    if (percent > 95) return 'brightgreen';
    if (percent > 80) return 'green';
    if (percent > 60) return 'yellowgreen';
    if (percent > 20) return 'yellow';

    return 'red';
};

const getDepsLength = depsKey => Object.keys(pkg[depsKey] || {}).length;

const padDate = date => String(date).padStart(2, '0');

const getFullDate = () => {
    const now = new Date();

    return `${now.getFullYear()}-${padDate(now.getMonth() + 1)}-${padDate(now.getDate())}`;
};

module.exports = {
    BASE_URL,
    CHANGELOG_PATH,
    getColor,
    getDepsLength,
    getFullDate,
    README_PATH,
    version: pkg.version,
};
