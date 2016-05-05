(function(global) {

    var map = {
        'app': 'app',
        'rxjs': 'node_modules/rxjs',
        'angular2-in-memory-web-api':'node_modules/angular2-in-memory-web-api',
        '@angular': 'node_modules/@angular',
        'notifications': 'node_modules/angular2-notifications'
    },
        packages = {
            'app': { main: 'app.js',  defaultExtension: 'js' },
            'rxjs': { defaultExtension: 'js' },
            'angular2-in-memory-web-api': { defaultExtension: 'js' },
            'notifications': { main: 'components.js', defaultExtension: 'js' }
        },

        packageNames = [
            '@angular/common',
            '@angular/compiler',
            '@angular/core',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic'
        ];

    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };


    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);