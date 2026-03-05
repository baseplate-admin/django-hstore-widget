import { createJestStencilPreset } from 'jest-stencil-runner';
import type { Config } from 'jest';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));

const config: Config = createJestStencilPreset({
    rootDir,
    testMatch: ['**/*.(test|spec).(ts|tsx|js)'],
    moduleNameMapper: {
        '^\\$lib/(.*)$': '<rootDir>/src/frontend/lib/$1',
        '^\\$store/(.*)$': '<rootDir>/src/frontend/stores/$1',
    },
});

export default config;
