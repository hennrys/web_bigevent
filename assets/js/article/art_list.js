$(function () {
    localStorage.removeItem("artId");
    // 定义美化时间的过滤器
    template.defaults.imports.dateFormat = function (data) {
        var date = new Date(data)
        var y = date.getFullYear();
        var m = addZero(date.getMonth() + 1);
        var d = addZero(date.getDate());
        var h = addZero(date.getHours());
        var mm = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
    }
    // 补零函数
    function addZero(date) {
        if (date >= 10) {
            return date
        }
        return '0' + date
        // 或者使用三元表达式
        // return date>9? date:'0'+date;
    }
    // 定义一个对象，用来传参数
    var q = {
        pagenum: 1,//默认显示第几页数据
        pagesize: 2,//默认一页2条数据
        cate_id: '',
        state: ''
    }
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg("获取文章列表失败！")
                }
                // 使用模板引擎渲染数据
                var artListHTML = template("tem-artList", res);
                $("#artList").html(artListHTML);

                initPageNum(res.total)

            }
        })
    }
    initTable()
    function initArtCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg("获取文章列表失败！")
                }
                var artCateHTML = template('tem-artCate', res)
                $("[name=cate_id]").append(artCateHTML);
                layui.form.render()
            }
        })
    }
    initArtCate();
    $("#selectCate").on("submit", function (e) {
        e.preventDefault();
        console.log($("[name=cate_id]").val(), $("[name=state]").val());
        q.cate_id = $("[name=cate_id]").val();
        q.state = $("[name=state]").val();
        initTable()
    })
    // 定义分页功能的方法
    var laypage = layui.laypage;
    function initPageNum(total) {
        //执行一个laypage实例
        layui.laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    $("#artList").on("click", '.btn-delArt', function () {
        var artId = $(this).attr("data-id");
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            console.log(artId)
            delArticle(artId)
            layer.close(index);
        });
    })
    function delArticle(artId) {
        var length = $(".btn-delArt").length;
        $.ajax({
            url: '/my/article/delete/' + artId,
            method: 'GET',
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg("删除文章失败!")
                }
                layui.layer.msg("删除文章成功!")
                if (length === 1) {
                    q.pagenum = q.pagenum === 1 ? 1 : --q.pagenum;
                }
                initTable()
            }
        })
    }
    $("#artList").on("click",".article-Edit",function(){
        location.href = '/article/art_update.html';
        localStorage.setItem("artId",$(this).attr("data-id"))
    })
})