(function(){"use strict";Polymer({is:"px-app-nav-subitem",behaviors:[PxAppNavBehavior.Item],properties:{parentSelected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"updateStyles"}}})})();