var initializer = {
    initRoute:function(app){
        //var indexRouter = require('./routes/index');
        //var usersRouter = require('./routes/users');
        //var adminRouter = require('./routes/admin');
        // app.use(function(req, res, next) {
        //     if(req.path==='/'){
        //         res.locals.relativePrefix='..';
        //     }else{
        //         res.locals.relativePrefix = req.path.replace(/[^\/]*/gi, '').replace(/^\//gi, '').replace(/\//gi, '/..');
        //     }
        //     next();
        // });
        app.use('/', require('./routes/index'));
        app.use('/admin', require('./routes/admin'));
        app.use('/admin/users', require('./routes/users'));
        //app.use('/users', usersRouter);
    },
    initSwig: function (swig, config) {
        swig.setDefaults({
            allowErrors: false,//默认值为 false。将所有模板解析和编译错误直接输出到模板。如果为 true，则将引发错误，抛出到 Node.js 进程中，可能会使您的应用程序崩溃。
            autoescape: true,/*默认true，强烈建议保持。字符转换表请参阅转义过滤器。•true: HTML安全转义
                            •false: 不转义，除非使用转义过滤器或者转义标签
                            •'js': js安全转义
                            */
            cache: 'memory',//更改为 false 将重新编译每个请求的模板的文件。正式环境建议保持true。
            encoding: 'utf8',//模板文件编码
            filters: {},//自定义过滤器或者重写默认过滤器，参见自定义过滤器指南。
            root: '/',//需要搜索模板的目录。如果模板传递给 swig.compileFile 绝对路径(以/开头)，Swig不会在模板root中搜索。如果传递一个数组，使用第一个匹配成功的数组项。
            tags: {},//自定义标签或者重写默认标签，参见自定义标签指南。
            extensions: {},//添加第三方库，可以在编译模板时使用，参见参见自定义标签指南。
            tzOffset: 0,//设置默认时区偏移量。此设置会使转换日期过滤器会自动的修正相应时区偏移量。
            locals: {
                now: function () {
                    return new Date();
                },
                config: config.public.locals
            }
        });
    }

};
module.exports = initializer;