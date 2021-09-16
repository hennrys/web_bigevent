$(function () {
    localStorage.removeItem("artId");
    getUserInfo();
    var larer = layui.larer;
    // 点击实现退出首页  跳转登录界面
    $("#btnlogout").on("click",function(){
        console.log("ok");
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token");
            location.href="/login.html",
            layer.close(index);
          });
    })
})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功或者失败，都是执行complete回调函数
        // complete:function(res){
        //     console.log("执行回调");
        //     console.log(res);
        //     if(res.responseJSON.status===1&&res.responseJSON.message==="身份认证失败！"){
        //         localStorage.removeItem("token");
        //         location.href="/login.html"
        //     }
        // }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    console.log(user)
    var name = user.nickname || user.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide()
    } else {
        $(".text-avatar").html(name.slice(0, 1).toUpperCase()).show();
        $(".layui-nav-img").hide()
    }
}
function hrefArtListHtml(){
    $("#art_lists").addClass("layui-this").siblings().removeClass("layui-this")
}