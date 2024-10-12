import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
export const config: Config = {
    plugins: [sass()],
    namespace: 'django-hstore-widget',
    outputTargets: [
        // {
        //     type: 'dist',
        //     esmLoaderPath: '../loader',
        // },
        {
            type: 'dist-custom-elements',
            minify: true,
            customElementsExportBehavior: /*'auto-define-custom-elements' */ 'bundle',
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
    testing: {
        browserHeadless: 'new',
    },
};
