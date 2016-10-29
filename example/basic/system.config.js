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
            'platform-browser',
            'platform-browser-dynamic',
            'forms'
        ];

    function packIndex(pkgName) {packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' }}
    function packUmd(pkgName) {packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' }}

    ngPackageNames.forEach(packUmd);
    System.config({map: map, packages: packages});

})(this);