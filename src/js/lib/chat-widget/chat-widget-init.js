////(function($) {
////    "use strict";
////
////
////   
////
////
////})(jQuery);
//
//
//(function () {
//    "use strict";
//    var Message;
//    Message = function (arg) {
//        this.text = arg.text, this.message_side = arg.message_side;
//        this.draw = function (_this) {
//            return function () {
//                var $message;
//                $message = $($('.message_template').clone().html());
//                $message.addClass(_this.message_side).find('.text').html(_this.text);
//                $('.chats').append($message);
//                return setTimeout(function () {
//                    return $message.addClass('appeared');
//                }, 0);
//            };
//        }(this);
//        return this;
//    };
//    $(function () {
//        var getMessageText, message_side, sendMessage;
//        message_side = 'right';
//        getMessageText = function () {
//            var $message_input;
//            $message_input = $('.message_input');
//            return $message_input.val();
//        };
//        sendMessage = function (text) {
//            var $chats, message;
//            if (text.trim() === '') {
//                return;
//            }
//            $('.message_input').val('');
//            $chats = $('.chats');
//            message_side = message_side === 'left' ? 'right' : 'left';
//            message = new Message({
//                text: text,
//                message_side: message_side
//            });
//            message.draw();
//            return $chats.animate({
//                scrollTop: $chats.prop('scrollHeight')
//            }, 300);
//        };
//        $('.send_message').click(function (e) {
//            return sendMessage(getMessageText());
//        });
//        $('.message_input').keyup(function (e) {
//            if (e.which === 13) {
//                return sendMessage(getMessageText());
//            }
//        });
//        sendMessage('Hello Philip! :)');
//        setTimeout(function () {
//            return sendMessage('Hi Sandy! How are you?');
//        }, 1000);
//        return setTimeout(function () {
//            return sendMessage('I\'c fine, thank you!');
//        }, 2000);
//    });
//}.call(this));
