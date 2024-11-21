# 003. 批量生成小鹅通课程分享二维码

## 功能描述

1. 将 批量下载小鹅通二维码.js 添加到浏览器开发者工具的 源代码 - 片段 里面，通过它生成 data.txt 文件所需内容，格式如下：

    ```
    链接名称1,课程链接1
    链接名称2,课程链接2
    链接名称3,课程链接3
    ```

    如：

    ```
    章节1,https://lfvbx.xetslk.com/s/xxx
    章节2,https://lfvbx.xetslk.com/s/yyy
    章节3,https://lfvbx.xetslk.com/s/zzz
    ```

2. 将以上内容保存为 data.txt 文件；

3. 通过 [002.batch-gen-qrcode](../002.batch-gen-qrcode/) 小工具，批量生成二维码。
