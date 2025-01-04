/**
 * Check if the current execution environment is the test environment
 * @returns {boolean}
 */
export const isTestEnv = (): boolean => {
    return process.env.ENV === 'test';
};
