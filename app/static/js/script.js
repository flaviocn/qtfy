function copy_email() {
    $("email").select();
    document.execCommand("Copy"); // 执行浏览器复制命令
    alert("邮箱已复制，可贴粘。");
}

