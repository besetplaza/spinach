$(function() {
    
    $('#bp_copy_before').on('click', function() {
        if (confirm("前回入力した内容で上書きします。よろしいですか？")) {
        }
    });

    $('button[name="bp_delete_row"]').on('click', function() {
        console.log(this.value);
    });

    $('#bp_add_row').on('click', function() {
    });

    $('#bp_save').on('click', function() {
        if (confirm("保存します。よろしいですか？")) {
        }
    });

    $('#bp_cancel').on('click', function() {
        window.location.href = 'bplist.html';
    });

    var data = [
        []
    ];

    // テーブルの作成
    $("#grid").DataTable({
        "data": data,
        "columnDefs": [
            { targets: 0, visible: false },  // インデックス0(1列目)の列を非表示
            { targets: [1, 2], sortable: false }, // インデックス1と2の列をソート禁止
            // 全ての列にCSSクラス 'highlight' を適用
            { targets: '_all', className: 'highlight' }, 
            // インデックス3と4の列に数値をフォーマット
            { targets: [3, 4], render: $.fn.dataTable.render.number(',', '.', 2, '$') }
          ]
    });
});
