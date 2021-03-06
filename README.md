# hosts-scheduler

## 使用方法

安装 `hosts-scheduler`：

```bash
npm install hosts-scheduler -g
```

之后就可以通过 `hs` 命令快捷调用了：

```base
hs group1
hs -g group1
```

## hosts 规则分组说明

通过事先在 `hosts` 文件中加入注释标记，可以将规则进行分组：

```
#==== dev
127.0.0.1 website_host
#====

#==== test
192.168.0.101 website_host
#====

#==== online
#====
```

然后通过 `hs -g <分组名>` 或 `hs --group <分组名>` 即可启用对应分组下的规则，并刷新 DNS 缓存，使域名立即生效：

```
hs -g dev
hs -g test
hs -g online
```

使用 `hs -n` ，则会在现有的自定义分组之间轮流切换：

```
hs -n
hs --next
```

### 特殊分组

两个特殊分组 **[ALWAYS_ON]** 和 **[ALWAYS_OFF]**，顾名思义，永远开启和关闭。

```
#==== [ALWAYS_ON]
127.0.0.1 localhost
#====

#==== dev
127.0.0.1 website_host
#====

#==== test
192.168.0.101 website_host
#====

#==== online
#====
```

## 常用命令

```base
hs -v
hs --version                查看版本
hs [-g] [<groupName>]
hs [--group] [<groupName>]  切换到对应分组（未指定分组名则关闭所有自定义分组）
hs -s
hs --state                  查看当前分组启用状态
hs -l               
hs --list                   列出当前启用的分组规则
hs -f
hs --flush                  清空DNS缓存
hs -d
hs --disable                禁用所有分组的规则
hs -h
hs --help                   查看帮助
```
