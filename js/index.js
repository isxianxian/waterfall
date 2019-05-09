$(function () {
    //1.获取数据
    let page = 0,
        imgData = null,
        isRun = false;
    let queryData = () => {
        page++;
        $.ajax({
            url: `json/data.json?page=${page}`,
            method: 'get',
            async: false,
            dataType: 'json',
            success: result => {
                imgData = result;
            }
        });
    };
    queryData();

    //2.数据绑定
    let bindData = ({pic, link, title}={}) =>{
        if(!pic){
            return;
        }

        let str = 
            `<a href="${link}">
                <div><img src="${pic}" alt=""></div>
                <span>${title}</span>
            </a>`;
        
        return str;

    }

    let bindHTML = () => {
        let $boxList = $('.container li');
        for (let i = 0; i < imgData.length; i += 3) {
            let val0 = imgData[i+0],
                val1 = imgData[i+1],
                val2 = imgData[i+2];

            $boxList.sort((a, b) => {
                return $(a).outerHeight() - $(b).outerHeight();
            });
            $boxList.each((index, curLi) => {
                let item = bindData(eval(`val${index}`));
                $(item).appendTo($(curLi));
            });
        }
        isRun = false;
    };
    bindHTML();
    
    //3.当滚动到页面底部的时候，加载下一页的更多数据
    $(window).on('scroll', () => {
        let winH = $(window).outerHeight(),
            pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
            scrollT = $(window).scrollTop();
        if ((scrollT + 100) >= (pageH - winH)) {
            if (isRun) return;
            isRun = true;
            if (page > 5) {
                alert('没有更多数据了');
                return;
            }
            queryData();
            bindHTML();
        }
    });
});