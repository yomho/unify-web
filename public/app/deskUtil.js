define(function (require) {
    return {
        __DEFAULT_SETTINGS: function (callback) {
            if (callback) {
                var dataFromDB = [
                {
                    name: "账号管理",
                    "userdata": {
                        "widgettype": "1",
                        "items": [
                            {
                                "funcpath": "/admin/users"
                            }
                        ]
                    },
                    "location": {
                        "x": 0,
                        "y": 0,
                        "width": 8,
                        "height": 7
                    }
                },
                {
                    "name": "快捷菜单",
                    "userdata": {
                        "widgettype": "0",
                        "items": [
                            {
                                "funname": "百度",
                                "funcpath": "http://www.baidu.com"
                            }
                        ]
                    },
                    "location": {
                        "x": 8,
                        "y": 0,
                        "width": 4,
                        "height": 3
                    }
                }];
                callback(dataFromDB);
            }
        },
        createWidget: function (WIDGET, itemData, auto_position, callback) {
            var widgetTemplate = require('text!res/tpls/desk/widget.html');
            var widget = WIDGET.add_widget(
                $(widgetTemplate)
                .find('.widget-name').text(itemData.name || '').end()
            , itemData.location.x, itemData.location.y, itemData.location.width, itemData.location.height, auto_position);
            if (callback) {
                callback(widget, itemData);
            }
        },
        loadDesk: function (WIDGET, initData) {
            if (WIDGET) {
                if (initData) {
                    var widgetMaker = this.maker;
                    for (var i in initData) {
                        this.createWidget(WIDGET, initData[i], false,
                            function (widget, itemData) {
                                if (itemData.userdata.items && itemData.userdata.items.length > 0) {
                                    switch (itemData.userdata.widgettype) {
                                        case '0':
                                            for (var j in itemData.userdata.items) {
                                                widgetMaker.makeLink(widget.find('.item-content'), itemData.userdata.items[j], itemData.userdata.widgettype);
                                            }
                                            break;
                                        case '1':
                                            widgetMaker.makePageView(widget.find('.item-content'), itemData.userdata.items[0], itemData.userdata.widgettype);

                                            break;
                                    }
                                }

                            }
                        );
                    }
                }
               

            }
        },
        loadDefaultDesk: function (WIDGET) {
            if (WIDGET) {
                var _this = this;
                _this.__DEFAULT_SETTINGS(function (initData) {
                    _this.loadDesk(WIDGET, initData);
                });
            }
        },
        maker:{
            makeLink: function (itemHolder, itemData, widgetType) {
                if (itemHolder.attr('widgettype') !== widgetType) {
                    itemHolder.empty();
                }
                itemHolder.attr('widgettype', widgetType).append('<a href="' + itemData.funcpath + '" type="button" class="btn btn-primary btn-lg" style="text-shadow: black 5px 3px 3px;margin:10px;" target="_blank">' + itemData.funname + '</a>');
                var dataWidgetItems = itemHolder.data('data-widget-items');
                if (!dataWidgetItems) {
                    dataWidgetItems = [];
                }
                dataWidgetItems.push(itemData);
                itemHolder.data('data-widget-items', dataWidgetItems);
            },
            makePageView: function (itemHolder, itemData, widgetType) {
                // if (itemHolder.attr('widgettype') !== widgetType) {
                //     itemHolder.empty();
                // }
                itemHolder.attr('widgettype', widgetType).html('<iframe frameborder="0" onerror="return false;" src="' + itemData.funcpath + '">' + itemData.funname + '</iframe>');
                var dataWidgetItems = [];/* 数据项暂时只支持一项*/
                dataWidgetItems.push(itemData);
                itemHolder.data('data-widget-items', dataWidgetItems);
            }
        }
    };
});