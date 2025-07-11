import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    plugins: [],
    sourceMap: false,
    namespace: 'django-hstore-widget',
    srcDir: 'src/frontend',
    // buildEs5: 'prod',
    extras: {
        enableImportInjection: true,
        experimentalSlotFixes: true,
    },
    outputTargets: [
        {
            type: 'dist-custom-elements',
            minify: true,
            generateTypeDeclarations: false,
            customElementsExportBehavior: 'auto-define-custom-elements' /*'auto-define-custom-elements'*/,
            externalRuntime: false,
            empty: true,
        },
        // {
        //   type: 'docs-readme',
        // },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],

    hydratedFlag: {
        selector: 'attribute',
    },
};
