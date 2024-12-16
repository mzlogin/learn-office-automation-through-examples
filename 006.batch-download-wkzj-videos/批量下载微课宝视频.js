$('.video-download').each(function(){
    var input = $(this);
    if ($(input).data().bind) {
        var vid = $(input).data().bind;
        var url = 'https://www.wkzj.com/shared/download/' + vid;
        $.get(url, function(data, status) {
            if (data && data.success) {
                var downloadUrl = 'https://www.wkzj.com/shared/download/download/' + vid + '?secretkey=' + data.data;
                window.open(downloadUrl, '_blank');
            } else {
                alert('有视频下载出错，请检查');
            }
        });
    }
});