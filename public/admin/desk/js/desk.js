define(function (require) {
    return {
        init: function (args) {
           
            require(['jquery-ui.min','gridstack'], function () {
                var widgetElement = $('.desk-container').addClass('grid-stack').gridstack({
                    float: true,
                    draggable: {
                        handle: '.item-header'
                    }
                });
                var deskUtil = require('app/deskUtil');
                deskUtil.loadDefaultDesk(widgetElement.data('gridstack'));
            });
            
        }
    }
});