$(function () {
    localStorage.removeItem("artId");
    // 获取文章列表
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                var artTemHTML = template("tem-artList", res)
                $("#artCateList").html(artTemHTML)
            }
        })
    }
    initArtCateList();
    var indexAddCate = null;
    $("#btnAddCate").on("click", function () {
        indexAddCate = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })
    $("body").on("submit", "#form-addCate", function (e) {
        e.preventDefault();
        console.log('ok');
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg("新增分类失败!")
                }
                initArtCateList();
                layui.layer.msg(res.message);
                // 根据索引关闭指定的弹出层
                layui.layer.close(indexAddCate);
            }
        })
    })
    var indexEdit = null;
    var form = layui.form;
    $("#artCateList").on("click", ".btn-edit", function (e) {
        e.preventDefault()
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#dialog-edit").html()
        });
        var artID = $(this).attr("data-Id");
        //   var nameText = $(this).parent().siblings("td").eq(0).attr("data-name");
        //   var aliasText = $(this).parent().siblings("td").eq(1).attr("data-alias");
        //   $("#form-editCate [name=name]").val(nameText);
        //   $("#form-editCate [name=alias]").val(aliasText);
        $.ajax({
            url: '/my/article/cates/' + artID,
            method: 'GET',
            success: function (res) {
                console.log(res);
                form.val("form-editCate", res.data)
            }
        })
    })
    $("body").on("submit", "#form-editCate", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $("#form-editCate").serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg("更新分类信息失败！")
                }
                layui.layer.msg(res.message);
                layui.layer.close(indexEdit);
                initArtCateList()
            }
        })
    })
    $("#artCateList").on("click", ".btn-delete", function () {
        var id = $(this).attr("data-id");
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg("删除文章分类失败！")
                    }
                    layui.layer.msg("删除文章分类成功！")
                    layer.close(index);
                    initArtCateList()
                }
            })
        })

    })
})