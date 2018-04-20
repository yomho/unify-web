﻿define(function (require) {
    var __getCacheRepository = function () {
        return window.localStorage;
    };
    return {
            if (key.name) {
                key = key.name;
            }
            return __getCacheRepository().getItem(key);
        },
            if (key.name) {
                key = key.name;
            }
            __getCacheRepository().setItem(key, value);
        },
            __getCacheRepository().removeItem(key);
        },
        clear: function () {
            __getCacheRepository().clear();
        }
    };
});