git写代码写错分支如何迁移

假设需要代码写到dev-ly上，现在写到了master上

1、未commit时

```
git add .
git stash
git checkout dev-ly
git stash pop
```

2、已commit时

```
1、获取本次commit的ID（会获取到一个长id如：ae71cfaf9e865682e2c008aa867e8fbef7a19f7f）
git rev-parse HEAD
2、切换到新分支
git checkout -b dev-ly
3、在分支执行：git cherry-pick ae71cfaf9e865682e2c008aa867e8fbef7a19f7f
4、git push
```

