System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var InfoIcon;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InfoIcon = (function () {
                function InfoIcon() {
                }
                InfoIcon = __decorate([
                    core_1.Component({
                        selector: 'infoIcon',
                        template: "\n        <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/>\n        </svg>\n    ",
                        styles: ["\n        svg {\n            position: absolute;\n            box-sizing: border-box;\n            top: 0;\n            right: 0;\n            width: auto;\n            height: 70px;\n            padding: 10px;\n            fill: #fff;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [])
                ], InfoIcon);
                return InfoIcon;
            })();
            exports_1("InfoIcon", InfoIcon);
        }
    }
});
