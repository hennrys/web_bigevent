$(function () {
    localStorage.removeItem("artId");
    // 初始化富文本编辑器
    initEditor();
    function initArtCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章类别失败！")
                }
                var artCateHTML = template("artCateList", res);
                $("[name=cate_id]").append(artCateHTML);
                layui.form.render()
            }
        })
    }
    initArtCate();
    // 图片裁剪功能
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 为选择封面的按钮绑定点击事件
    $("#btnChooseImage").on("click",function(){
        $("#coverFile").click()
    })
    $("#coverFile").on("change",function(e){
        var files = e.target.files;
        if(files.length===0){
            layui.layer.msg("请选择图片！")
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image.cropper('destroy').attr('src',newImgURL).cropper(options)
    })
    var art_state = '已发布';
    $("#btnSave2").on("click",function(e){
        art_state='草稿';
    });
    $("#form-pub").on("submit",function(e){
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        formData.append("state",art_state);
        $image.cropper('getCroppedCanvas',{
            width:400,
            height:280
        }).toBlob(function(blob){
            formData.append('cover_img',blob)
            publishArtcle(formData)
        })
    })
    // 发布文章的方法
    function publishArtcle(formData){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:formData,
            // 相服务器提交的是formdata格式的，必须两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg("发布文章失败！")
                }
                layui.layer.msg("发布文章成功！");
                console.log(res);
                window.parent.hrefArtListHtml()
                location.href='/article/art_list.html';
            }
        })
    }
})
