$(function() {

    $('#bp_add').on('click', function() {
        window.location.href = 'bpdetail.html?add';
    });

    $('button[name="bp_modify"]').on('click', function() {
        console.log(this.value);
        window.location.href = 'bpdetail.html?mod';
    });

    $('button[name="bp_remove"]').on('click', function() {
        console.log(this.value);
        if (confirm('削除してよろしいですか？')) {

        }
    });

    //公開列
    const customRenderPublic = function(arg){
        if (arg) {
            return `<div class="toggle_button">
                        <input id="toggle" class="toggle_input" type='checkbox' checked />
                        <label for="toggle" class="toggle_label"></label>
                    </div>`;
        } else {
            return `<div class="toggle_button">
                        <input id="toggle" class="toggle_input" type='checkbox' />
                        <label for="toggle" class="toggle_label"></label>
                    </div>`;
        }
    }

    //編集列
    const customRenderEdit = function(arg){
        return `<button type="button" name="bp_modify" value="${arg}">
                    <div class="icon_pen"></div>変更
                </button>
                &nbsp;&nbsp;
                <button type="button" name="bp_remove" value="${arg}">
                    <div class="icon_trash"></div>削除
                </button>`;
    }

    var data = [
        {
            public: false,
            date: "2024/3/10",
            edit: 1
        }, 
        {
            public: true,
            date: "2024/3/3",
            edit: 2
        }
    ];

    $('#myTable').DataTable({
        data: data,
        columnDefs: [
            { targets: 0, width: "30%" },
            { targets: 1, width: "30%" },
            { targets: 2, width: "40%", visible: true }
        ],
        columns: [
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
