$(function () {
    // 点击“去注册账号”
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    // 点击“去登录”
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    // 从layui中获取form对象
    var form = layui.form;
    form.verify({
        // 自定义了一个pwd的校验规则
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repassword: function (value) {
            var pwd = $(".reg-box [name=password]").val()
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    })
    var layer = layui.layer;
    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        //  http://api-breakingnews-web.itheima.net
        // /api/reguser   post
        // username password
        var data ={username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()}; 
        $.post('/api/reguser',data,function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！请登录');
                $("#link_login").click()
            }
        )
    })
    // 监听登录表单的提交事件
    $("#form_login").on("submit",function(e){
        e.preventDefault();
        // var data 
        
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("登录失败！")
                }
                layer.msg(res.message);
                console.log(res.token);
                localStorage.setItem("token",res.token)
                // 登录成功后跳转到index.html首页
                location.href = "/index.html"
            }
        })
    })
})