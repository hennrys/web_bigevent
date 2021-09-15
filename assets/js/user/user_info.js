$(function(){
    var form = layui.form;
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在 1 ~ 6 位字符'
            }
        }
    })
})
initUserInfo();
// 初始化用户的基本信息
function initUserInfo(){
    var layer = layui.layer;
    var form = layui.form;
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        success:function(res){
            if(res.status !== 0){
                return layer.msg("获取用户信息失败！")
            }
            console.log(res);
            form.val("formUserInfo",res.data)
        }
    })
}
$("#btnReset").on("click",function(e){
    e.preventDefault();
    initUserInfo()
})
$(".layui-form").on("submit",function(e){
    e.preventDefault();
    var layer = layui.layer;
    var form = layui.form;
    $.ajax({
        url:'/my/userinfo',
        method:'POST',
        // $(this).serialize()
        data:form.val("formUserInfo"),
        success:function(res){
            if(res.status!==0){
                return layer.msg("更新用户信息失败！")
            }
            layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
            initUserInfo()
        }
        
    })
})