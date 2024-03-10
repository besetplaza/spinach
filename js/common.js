const ParamItem = {
    type: 'type',
    date: 'date',
}
const ParamType = {
    add : 'add',
    mod : 'mod',
};

const MaxPrice = 9999;
const MaxQuantity = 99;

const formatNumber = function(str) {
    let strNum = "0";
    if (!isNaN(str)) {
        strNum = Number(str).toLocaleString();
    }
    return strNum;
}


$(function() {
    // let sunday = _nextSunday(new Date());
    // if ($('next_sunday')) {
    //     $('next_sunday').value(_format(sunday, 'YYYY-MM-DD'));
    // }
    //console.log("window:" + window.innerHeight);
    //console.log("header:" + $("header").height());
    //console.log("article:" + $("article").height());
    //console.log("footer:" + $("footer").height());
    //$("article").height(window.innerHeight - $("header").height() - $("footer").height() - 36);
    //console.log("article:" + $("article").height());
});