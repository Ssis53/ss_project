$(window).on('load', function () {
    //上传图片文件以及其他信息
    (function upLogo() {
        $positionName = $('#positionName input');
        $company = $('#company input');
        $exer = $('#exer input');
        $position = $('#position input');
        $where = $('#where input');
        $offer = $('#offer input');
        $allInput = $('#myManageModal .content input');

        //绑定七个个输入框的isEmpty事件
        $allInput.on('isEmpty', function (e) {
            $(e.target).prev().find('i').removeClass('hidei');
        });

        $allInput.on('isNotEmpty', function (e) {
            $(e.target).prev().find('i').addClass('hidei');
        });

        function carry () {
            //提交按钮的功能

            //进行不为空校验

            //定义一个开关量判断是否所有都不为空
            var allNotEmpty = true;

            //如果点击提交按钮后
            //判断四个输入框是不是为空,
            //为空则触发对应的isEmpty事件
            for (var i = 0; i < $allInput.length; i++ ) {
                if($allInput.eq(i).val() === '') {
                    $allInput.eq(i).trigger('isEmpty', $allInput.eq(i));
                    allNotEmpty = false;
                    continue;
                } else {
                    $allInput.eq(i).trigger('isNotEmpty', $allInput.eq(i));
                }
            }

            if (!allNotEmpty) {
                return;
            }
            //todo:
            //是时候传数据了
            $('#frm').submit();
        }

        //绑定提交事件
        $('#sub').on('click', function () {

            carry();

        })
    })();

    //修改信息
    (function edit() {
        //编辑按钮的绑定事件
        $('.editBtn').on('click', function () {
            //取到被点的元素的id
            var id = $(this).attr('this-id');
            var $logoSrc = $('#upLogoEdit');
            var $positionName = $('#positionNameEdit input');
            var $company = $('#companyEdit input');
            var $exer = $('#exerEdit input');
            var $position = $('#positionEdit input');
            var $where = $('#whereEdit input');
            var $offer = $('#offerEdit input');
            //发送ajax取数据填充进小小的input
            $.ajax({
                type: 'post',
                url: '/manage/edit',
                dataType: 'json',
                data: {
                    id: id
                },
                success: function(resp) {
                    $positionName.val(resp.positionName);
                    $company.val(resp.company);
                    $exer.val(resp.exer);
                    $position.val(resp.position);
                    $where.val(resp.where);
                    $offer.val(resp.offer);
                },
                error: function(err) {
                    console.log(err);
                }
            })

            //绑定保存按钮的绑定事件并且把id值传进去！
            //todo
            $('#subEdit').on('click', function() {
                save(id);
            })
        })

        //写一个发送修改请求的函数，需要检查字段，请求发向保存
        // $positionName = $('#positionName input');
        // $company = $('#company input');
        // $exer = $('#exer input');
        // $position = $('#position input');
        // $where = $('#where input');
        // $offer = $('#offer input');
        var $allInput = $('#myEditManageModal .content input');

        //绑定七个个输入框的isEmpty事件
        $allInput.on('isEmpty', function (e) {
            $(e.target).prev().find('i').removeClass('hidei');
        });

        $allInput.on('isNotEmpty', function (e) {
            $(e.target).prev().find('i').addClass('hidei');
        });

        function save (id) {
            //提交按钮的功能

            //进行不为空校验

            //定义一个开关量判断是否所有都不为空
            var allNotEmpty = true;

            //如果点击提交按钮后
            //判断四个输入框是不是为空,
            //为空则触发对应的isEmpty事件
            for (var i = 0; i < $allInput.length; i++ ) {
                if($allInput.eq(i).val() === '') {
                    $allInput.eq(i).trigger('isEmpty', $allInput.eq(i));
                    allNotEmpty = false;
                    continue;
                } else {
                    $allInput.eq(i).trigger('isNotEmpty', $allInput.eq(i));
                }
            }

            if (!allNotEmpty) {
                return;
            }
            //todo:
            //是时候传数据了
            // $('#frmEdit').submit();

            //先把id塞进去
            $(`<input type="text" value=${id} name="idEdit" id="temp">`).appendTo('#frmEdit');
            //再发送ajax
            $.ajax({
                type: 'post',
                cache: false,
                url: '/fileUpload/save',
                processData: false,
                contentType: false,
                data: new FormData($('#frmEdit')[0]),
                dataType: 'json',
                success: function(resp) {
                    if(resp.ret) {
                        alert("修改成功");
                        location.href = '/manage';
                    } else {
                        alert('修改信息失败，请重试');
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });

            //发送完id删除临时的小input框
            $('#temp').remove();
        }
    })();

    //分页器
    (function page() {
        $('#prev').on('click', () => {
            var prev = parseInt($('#pageNoNow').val()) - 1;
            if(prev <= 0) {
                prev = 1;
            }
            location.href = '/manage?pageNo=' + prev;
        })

        $('#next').on('click', () => {
            var next = parseInt($('#pageNoNow').val()) + 1;
            location.href = '/manage?pageNo=' + next;
        })
    })();
})
