// 公開トグルボタン
const eventToggle = function(id, public, date) {
    //console.log(id + '/' + public + '/' + date);
}

// 変更ボタン
const eventModify = function(id, date) {
    let location = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
    let url = new URL(location + '/bpdetail.html');
    url.searchParams.append(ParamItem.type, ParamType.mod);
    url.searchParams.append(ParamItem.date, date);
    window.location.href = url;
};

// 削除ボタン
const eventRemove= function(id, date) {
    if (confirm(date + ' の行を削除してよろしいですか？')) {

    }
};

$(function() {
    // 新規作成ボタン
    $('#bp_add').on('click', function() {
        var date = cdate().format('YYYY-MM-DD');
        let location = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
        let url = new URL(location + '/bpdetail.html');
        url.searchParams.append(ParamItem.type, ParamType.add);
        url.searchParams.append(ParamItem.date, date);
        window.location.href = url;
    });

    //公開列
    const customRenderPublic = function(data, type, row, meta){
        let checked = "";
        if (data) {
            checked = "checked";
        }
        return `<div class="toggle_button">
                    <input id="toggle_${row.id}" class="toggle_input" type='checkbox' onclick='eventToggle(${row.id},${!data},"${row.date}")' ${checked}>
                    <label for="toggle_${row.id}" class="toggle_label"></label>
                </div>`;
    }

    //編集列
    const customRenderEdit = function(data, type, row, meta){
        const today = cdate().format("YYYYMMDD");
        const targetday = cdate(row.date).format("YYYYMMDD");
        //console.log("today:" +today + "/targetday:" + targetday);
        let disabled = "";
        let disableClass = "";
        if (targetday < today) {
            disabled = "disabled";
            disableClass = "icon_disable";
        }
        return `<button type='button' onclick='eventModify(${row.id},"${row.date}")' ${disabled}>
                    <div class='icon_pen ${disableClass}'></div>変更
                </button>
                &nbsp;&nbsp;
                <button type='button' onclick='eventRemove(${row.id},"${row.date}")' ${disabled}>
                    <div class='icon_trash ${disableClass}'></div>削除
                </button>`;

    }

    var data = [
        {
            id: 3,
            public: true,
            date: "2024-03-17",
        }, {
            id: 2,
            public: true,
            date: "2024-03-10",
        }, {
            id: 1,
            public: false,
            date: "2024-03-03",
        }
    ];

    $('#myTable').DataTable({
        data: data,
        columnDefs: [
            { targets: 0, width: "40px" },
            { targets: 1, width: "30%" },
            { targets: 2, width: "30%" },
            { targets: 3 }
        ],
        columns: [
            { data: 'id' },
            { data: 'public', render: customRenderPublic },
            { data: 'date' },
            { data: 'edit', render: customRenderEdit }
        ],
        lengthChange: false,    // 件数切替機能 無効
        searching: false,   // 検索機能 無効
        ordering: false,    // ソート機能 無効
        info: false,    // 情報表示 無効
        paging: false   // ページング機能 無効
    });
});
