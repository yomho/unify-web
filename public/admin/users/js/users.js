define(function (require) {
    return {
        init: function (args) {
            var table = layui.table
            //layer.msg('Hello World');
            table.render({
                elem: '.users-list',
                height:  'full-58',
                page: true, //开启分页
                cols: [
                    [ //表头
                        { field: 'id', title: 'ID', width: 80, sort: true, fixed: 'left' },
                        { field: 'username', title: '用户名', width: 80 },
                        { field: 'sex', title: '性别', width: 80, sort: true },
                        { field: 'city', title: '城市', width: 80 },
                        { field: 'sign', title: '签名', width: 120 },
                        { field: 'experience', title: '积分', width: 80, sort: true },
                        { field: 'score', title: '评分', width: 80, sort: true },
                        { field: 'classify', title: '职业', width: 80 },
                        { field: 'wealth', title: '财富', width: 135, sort: true }
                    ]
                ],
                method:function(){

                },
                data:[
                    {
                        id:'1',
                        username:'xtadmin',
                        sex:'男',
                        city:'深圳',
                        sign:'',
                        experience:'99+',
                        score:'88',
                        classify:'攻城狮',
                        wealth:'60w'
                    },
                    {
                        id:'2',
                        username:'xtadmin',
                        sex:'男',
                        city:'深圳',
                        sign:'',
                        experience:'99+',
                        score:'88',
                        classify:'攻城狮',
                        wealth:'50w'
                    }
                ]
            });
                
        }
    }
});