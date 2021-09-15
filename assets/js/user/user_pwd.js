$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value===$("[name=oldPwd]").val()){
                return "新密码不能与原密码相同！"
            }
        }
    })
    $("#formRePwd").on("submit", function (e) {
        e.preventDefault();
        var newPwd = $(".layui-card-body [name=newPwd]").val();
        var rePwd = $(".layui-card-body [name=rePwd]").val();
        if (newPwd !== rePwd) {
            return layer.msg("确认新密码与新密码不一致！")
        } else {
            $.ajax({
                url: '/my/updatepwd',
                method: 'POST',
                data: form.val("formRePwd"),
                success: function (res) {
                    console.log(res);
                    if(res.message==="原密码错误！"&&res.status===1){
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    $("#formRePwd")[0].reset()
                }
            })
        }
    })
    $("#clearPwdText").on("click", function (e) {
        e.preventDefault();
        $("#formRePwd")[0].reset()
    })
})