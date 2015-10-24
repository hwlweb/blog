"use strict";

define(function (require, exports, module) {
    var selectCate = function(ev){
        var cate = $('#cate').val();
        var name = $('[name="title"]');
        if($.trim(name.val()) == ''){
            name.parent().addClass('has-error');
            return false;
        }else if($.trim(cate) == ''){
            $('.cate-error').show();
            return false;
        }else{
            name.removeClass('has-error');
            $('.cate-error').hide();
            return true;
        }
    };

    var checkCate = function(ev){
        var target = $(ev.target);
        var cate = $('#cate');
        var name = target.data('name');
        cate.val(name);
        $('[data-role="cate"]').removeClass('btn-info');
        target.addClass('btn-info');
    }

    var previewPost = function(ev){
        var target = $(ev.target);
        var html = target.val();
        $('#article-main').html(marked(html));
    }
    
    var postComment = function (ev) {
        alert(0);
        var commentCon = $('#comment');
        if($.trim( commentCon.val() ) == ''){
            $('#post-comment').show();
        }else{
            $('#post-comment').hide();
        }
    }


    exports.init = function () {
        $('#submit-btn').on('click', selectCate);
        $('[data-role="cate"]').on('click', checkCate);
        $('#add-post').on('keyup',previewPost);
        $('#post-comment').on('click', postComment);
    }
});