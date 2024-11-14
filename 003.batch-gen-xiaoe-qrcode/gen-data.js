const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function genEachQrcode(element, index, elements) {
    console.log('开始处理第' + index + '个');
    element.click();
    do {
        await sleep(100);
        // 等待框弹出来
        var shareDialog = document.querySelector('.xe-share-dialog__content');
        if (shareDialog) {
            break;
        }
    } while (true);

    // 复制并打印标题与网址
    do {
        var itemUrlDetail = document.querySelector('.item-url-detail');
        if (!itemUrlDetail) {
            await sleep(100);
            continue;
        }
        
        var targetText = itemUrlDetail.textContent;
        if (targetText.trim().length === 0) {
            await sleep(100);
        } else {
            // console.log(targetText);
            // vim 提取 %s/.*\n.*\n.*\n^\s*\(.*\)\n.*点击学习：\(.*\)\n/\1,\2/g
            var result = targetText.match(/.*\n.*\n.*\n\s*(.*)\n.*点击学习：(.*)\n/);
            console.log(result[1] + ',' + result[2]);
            break;
        }
    } while (true);

    // 叉掉框，等待框消失
    console.log('开始关闭第' + index + '个弹框');
    do {
        document.querySelector('.xe-share-dialog__closeBtn').click();
        await sleep(100);
        console.log('循环' + index);
        var shareDialog = document.querySelector('.xe-share-dialog__content');
        if (!shareDialog || shareDialog.length === 0) {
            console.log('开始跳出第' + index);
            break;
        }
    } while (true);
    console.log('结束处理第' + index + '个');
}

async function batchGenQrcode() {
    let elems = [];
    if (window.location.href.match('https://admin.xiaoe-tech.com/t/course/column/list')) {
        // 专栏列表
        elems = document.querySelectorAll('.ss-table__fixed-right > .ss-table__fixed-body-wrapper > .ss-table__body > tbody > tr > td:nth-child(8) > .cell > .ss-multi-operate-table__cell > .ss-multi-operate-table__cell-inner > .ss-multi-operate__cell-operates-wrap > div:nth-child(3) > .ss-button');
    } else if (window.location.href.match('https://admin.xiaoe-tech.com/t/course/column/detail/.*')) {
        // 专栏目录
        elems = document.querySelectorAll('.ss-table__fixed-right > .ss-table__fixed-body-wrapper > .ss-table__body > tbody > tr > td:nth-child(8) > .cell > .ss-multi-operate-table__cell > .ss-multi-operate-table__cell-inner > .ss-multi-operate__cell-operates-wrap > div:nth-child(4) > .ss-button');
    } else if (window.location.href.match('https://admin.xiaoe-tech.com/t/course/big_column/detail/.*')) {
        // 大专栏目录
        elems = document.querySelectorAll('.ss-table__fixed-right > .ss-table__fixed-body-wrapper > .ss-table__body > tbody > tr > td:nth-child(6) > .cell > .ss-multi-operate-table__cell > .ss-multi-operate-table__cell-inner > .ss-multi-operate__cell-operates-wrap > div:nth-child(3) > .ss-button');
    } else {
        alert('不支持的页面');
    }
        
    await asyncForEach(elems, genEachQrcode);
}

await batchGenQrcode();