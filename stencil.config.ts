import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    plugins: [sass()],
    sourceMap: false,
    namespace: 'django-hstore-widget',
    srcDir: 'src/frontend',
    extras: {
        enableImportInjection: true,
        experimentalSlotFixes: true,
    },
    outputTargets: [
        {
            type: 'dist',
        },
        // {
        //     type: 'dist-custom-elements',
        //     minify: true,

        //     customElementsExportBehavior: 'bundle' /*'auto-define-custom-elements'*/,
        //     externalRuntime: false,
        //     empty: true,
        // },
        // {
        //   type: 'docs-readme',
        // },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    testing: {
        browserHeadless: 'new',
    },
    hydratedFlag: {
        selector: 'attribute',
    },
};
