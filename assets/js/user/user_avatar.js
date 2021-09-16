$(function () {
    localStorage.removeItem("artId");
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传文件按钮绑定点击事件
    $("#btnChooseImage").on("click",function(e){
        e.preventDefault();
        $("#file").click()
    })
    $("#file").on("change",function(e){
        var files = e.target.files;
        if(files.length===0){
            return layui.layer.msg("请选择照片!")
        };
        var file = files[0];
        var newImgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src',newImgURL).cropper(options)
    })
    $("#btnUpload").on("click",function(){
        // 拿头像
        // 请求接口
        var dataURL = $image.cropper('getCroppedCanvas',{
            width:100,
            height:100
        }).toDataURL('image/png');
        console.log(dataURL)
        $.ajax({
            url:'/my/update/avatar',
            method:'POST',
            data:{avatar:dataURL},
            success:function(res){
                console.log(res)
                if(res.status===0){
                    layui.layer.msg(res.message);
                    window.parent.getUserInfo()
                }else{
                    layui.layer.msg('更换头像失败！');
                }
            }
        })
    })
})