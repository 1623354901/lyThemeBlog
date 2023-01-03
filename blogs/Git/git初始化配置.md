---
title: git安装后的初始化设置
date: 2022-12-05
tags:
 - Git
categories:
 -  Git相关
publish: true
---

### 初始化配置

```
1.设置用户名
git config --global user.name '1623354901'
2.设置用户名邮箱
git config --global user.email '1623354901@qq.com'
3.查看设置是否配置成功
git config --list
```
### git连上github

```
//先生成ssh
ssh-keygen -t rsa //回车三次
将公钥（位置：C:\Users\你的用户名.ssh 中的id_rsa.pub）复制出来放到github网站-setting-SSH and GPG keys中的SSH keys中
```

### clone代码：
```
git clone git@github.com:1623354901/1623354901.github.io.git
```

### git首次提交代码到自己的github仓库

1. 在github中创建仓库
2. 在代码文件夹中执行以下代码：
```
git init
git add . // git add .命令是添加该目录下所有的文件
git commit -m 'first commit'
git remote add origin 'https://github.com/1623/1623.github.io.git' //放到暂存区
git push -u origin master //将远程仓库origin的master分支与本地仓库master分支关联,并推送
```

### git合并分支
场景：想把dev分支新提交的代码合并到自己的分支(ly)
```
git branch -a //查看所有分支
git checkout ly //切换到自己分支
git merge dev //合并dev分支到自己分支
```