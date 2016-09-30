(function(global) {

    var map = {
            'app': 'app',
            '@angular': 'node_modules/@angular',
            'rxjs': 'node_modules/rxjs',
            'angular2-notifications': 'node_modules/angular2-notifications'
        },
        packages = {
            'app': { main: 'main.js',  defaultExtension: 'js' },
            'rxjs': { defaultExtension: 'js' },
            'angular2-notifications': {main: 'components.js', defaultExtension: 'js'}
        },
        ngPackageNames = [
            'common',
            'compiler',
            'core',
            'forms',
            'platform-browser',
            'platform-browser-dynamic',
            'upgrade'
        ];

    function packUmd(pkgName) {packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' }}

    var setPackageConfig = packUmd;
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);