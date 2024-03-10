var table = new DataTable('#myTable');

// 削除ボタン
const eventDelete= function(id, product) {
    if (confirm("「" + product +"」の行を削除してよろしいですか？")) {

    }
};

// 合計金額算出
const getSummary = function() {
    // console.log("getSummary");
    let sumprice = 0;
    $('input[id^="salesprice_"]').each(function(index, element) {
        let id = element.id.substr(element.id.indexOf('_') + 1);
        let quantity = $("input#quantity_" + id).val();
        // console.log(id + ":" + element.value + "*" + quantity);
        sumprice += Number(element.value) * Number(quantity);
    });
    return sumprice;
}

// 合計値を更新
const updateSummary = function() {
    if ($("span#sumprice").length < 1) {
        let sum = getSummary();
        let tr = '<tr><td colspan="4" class="table_column">合計</td><td><span id="sumprice">' + formatNumber(sum) + '</span>&nbsp;円</td></tr>';
        $('tbody').append(tr);
    }
    let sumprice = getSummary();
    $("span#sumprice").text(formatNumber(sumprice));
}

// 定価変更
const eventChangeListPrice = function(id, value) {
    // console.log("eventChangeListPrice");
    let offprice = Math.floor(value * 0.9);    // 切り捨て
    let salesprice = Math.round(offprice / 10) * 10; // 1の位を四捨五入
    $("#offprice_" + id).text(offprice);
    $("#salesprice_" + id).val(salesprice);
    updateSummary();
};

// 販売価格変更
const eventChangeSalesPrice = function() {
    // console.log("eventChangeSalesPrice");
    updateSummary();
}

// 個数変更
const eventChangeQuantity = function() {
    // console.log("eventChangeQuantity");
    updateSummary();
}

$(function() {
    let url = new URL(window.location.href);
    const params = url.searchParams;
    const date = params.get(ParamItem.date);
    const type = params.get(ParamItem.type);
    const tomorrow = cdate().add(1, "day").format("YYYY-MM-DD");

    // 日付初期表示設定
    if (type == ParamType.add) {
        // 新規作成の場合は翌日
        $("#next_sunday").val(tomorrow);

    } else if (type == ParamType.mod) {
        // 変更の場合は引数の日付
        $("#next_sunday").val(date);
    }

    // コピーボタン
    $('#bp_copy_before').on('click', function() {
        if (confirm("前回入力した内容で上書きします。よろしいですか？")) {
        }
    });

    // 行追加ボタン
    $('#bp_add_row').on('click', function() {
        if (table) {
            let count = $("#myTable tr").length;
            table.row.add({
                id: count - 1,
                product: '',
                listprice: '0',
                offprice: '0',
                salesprice: '0',
                quantity: '1',
                delete: ''
                })
            .draw();
        }
        updateSummary();
    });

    // 保存ボタン
    $('#bp_save').on('click', function() {
        if (confirm("保存します。よろしいですか？")) {
        }
    });

    // キャンセルボタン
    $('#bp_cancel').on('click', function() {
        if (confirm("入力を取消して前のページへ戻ります。よろしいですか？")) {
            let location = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
            let url = location + '/bplist.html';
            window.location.href = url;
        }
    });

    // 品名列
    const customRenderProduct = function(data, type, row, meta){
        return `<input type="text" class="product" value="${data}">`;
    }

    // 10%OFF列
    const customRenderOffPrice = function(data, type, row, meta){
        let price = 0;
        if (row.listprice) {
            price = Math.floor(row.listprice * 0.9);    // 切り捨て
        }
        return `<span id="offprice_${row.id}">${formatNumber(price)}</span>&nbsp;円`;
    }

    // 定価列
    const customRenderListPrice = function(data, type, row, meta){
        return `<input type="number" step="1" min="0" max="${MaxPrice}" inputmode="numeric" class="price" value="${data}" onchange="eventChangeListPrice(${row.id},this.value)">&nbsp;円`;
    }

    // 販売価格列
    const customRenderSalesPrice = function(data, type, row, meta){
        return `<input type="number" step="10" min="0" max="${MaxPrice}" inputmode="numeric" class="price" value="${data}" id="salesprice_${row.id}" onchange="eventChangeSalesPrice()">&nbsp;円`;
    }

    // 個数列
    const customRenderQuantity = function(data, type, row, meta){
        return `<input type="number" step="1" min="0" max="${MaxQuantity}" inputmode="numeric" class="quantity" value="${data}" id="quantity_${row.id}" onchange="eventChangeQuantity()">`;
    }

    // 削除列
    const customRenderDelete = function(data, type, row, meta){
        return `<button type="button" value="${row.id}" onclick="eventDelete(${row.id},'${row.product}')">
                    <div class="icon_minus"></div>削除
                </button>`;
    }
    
    var data = [{
            id: 1,
            product: "牛乳",
            listprice: "530",
            salesprice: "490",
            quantity: "4",
        }, {
            id: 2,
            product: "ちほまろ（プレーン）",
            listprice: "280",
            salesprice: "250",
            quantity: "2",
        }, {
            id: 3,
            product: "芋けんぴ",
            listprice: "270",
            salesprice: "240",
            quantity: "1",
    }];

    // テーブルの作成
    table = $("#myTable").DataTable({
        data: data,
        columnDefs: [
            { targets: 0, width: "30px" },
            { targets: 1 },
            { targets: 2, width: "110px" },
            { targets: 3, width: "80px" },
            { targets: 4, width: "110px" },
            { targets: 5, width: "70px" },
            { targets: 6, width: "90px" }
        ],
        columns: [
            { data: 'id' },
            { data: 'product', render: customRenderProduct },
            { data: 'listprice', render: customRenderListPrice },
            { data: 'offprice', render: customRenderOffPrice },
            { data: 'salesprice', render: customRenderSalesPrice },
            { data: 'quantity', render: customRenderQuantity },
            { data: 'delete', render: customRenderDelete }
        ],
        initComplete: function (settings, json) {
            updateSummary();
        },
        lengthChange: false,    // 件数切替機能 無効
        searching: false,   // 検索機能 無効
        ordering: false,    // ソート機能 無効
        info: false,    // 情報表示 無効
        paging: false   // ページング機能 無効
    });
    
});
