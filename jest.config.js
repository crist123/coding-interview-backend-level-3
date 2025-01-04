module.exports = {
    displayName: 'eldorado-io',
    roots: ['dist/', './node_modules/'],
    moduleFileExtensions: ['js'],
    moduleDirectories: ['node_modules', 'dist'],
    transform: {},
    setupFilesAfterEnv: ['./jestSetup.js'],
    restoreMocks: true,
};
