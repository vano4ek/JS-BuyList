$(function () {
    function addProd(name) {
        if (name.trim()) {

            var count = 1;

            //product in the left column
            var $newProd = $("#newProd").clone();
            $newProd.removeAttr('id');
            var $editDiv = $newProd.find('.editDiv');
            var $nameDiv = $newProd.find(".for-add");
            $editDiv.hide();
            $nameDiv.text(name);
            $('.left').append($newProd);

            //clean the input
            $('.nameinput').val('');

            //statistics on the right
            var $prodLeft = $('#prodLeft').clone();
            $prodLeft.removeAttr('id');
            $prodLeft.find('.right-prodName').text(name);
            $('#leftover').append($prodLeft);

            var $boughtProd = $('#boughtProd').clone();
            $boughtProd.removeAttr('id');
            $boughtProd.find('.itemName').text(name);
            $('#crossedProd').append($boughtProd);
            $boughtProd.hide();


            //event on minus button
            var $minus = $newProd.find('.minBut');
            $minus.click(function () {
                count--;
                if (count == 1) {
                    $minus.css("disabled", true);
                    $minus.css('background-color', 'rgba(226, 61, 61, 0.6)');
                    $minus.css('cursor', 'auto');
                    $minus.attr('data-tooltip', 'Неможливо');
                } else if (count < 1)
                    count++;
                $newProd.find('.leftamount').text(count);
                $prodLeft.find('.rightamount').text(count);
                $boughtProd.find('.rightamount').text(count);

            });
            //event on plus button
            var $plus = $newProd.find('.plusbut');
            $plus.click(function () {
                count++;
                $newProd.find('.leftamount').text(count);
                $prodLeft.find('.rightamount').text(count);
                $boughtProd.find('.rightamount').text(count);
                if (count > 1) {
                    $minus.css('background-color', 'rgb(226, 61, 61)');
                    $minus.css('cursor', 'pointer');
                    $minus.attr('data-tooltip', 'Менше');
                }
            });

            //event on del button
            var $del = $newProd.find('.delbut');
            if ($del) {
                $del.click(function () {
                    $newProd.remove();
                    $prodLeft.remove();
                    $boughtProd.remove();
                });
            }

            //event on the bought button
            var boughtButCount = 1;
            var $boughtBut = $newProd.find('.boughtbut');
            if ($boughtBut) {
                $boughtBut.click(function () {
                    if (boughtButCount) {
                        $nameDiv.css('text-decoration', 'line-through');
                        $minus.hide();
                        $plus.hide();
                        $del.hide();
                        $boughtBut.text('Не куплено');
                        $boughtProd.show();
                        $boughtProd.find('.rightamount').show();
                        $prodLeft.hide();
                        boughtButCount--;
                        $boughtBut.attr('data-tooltip', 'Повернути');
                    } else {
                        $nameDiv.css('text-decoration', 'none');
                        $minus.show();
                        $plus.show();
                        $del.show();
                        $boughtBut.text('Куплено');
                        $boughtProd.hide();
                        $prodLeft.show();
                        boughtButCount++;
                        $boughtBut.attr('data-tooltip', 'Куплено');
                    }
                });
            }

            //editing the prodname
            var $editName = $editDiv.find('#editName');
            $nameDiv.click(function () {
                $nameDiv.hide();
                $editDiv.show();
                $editName.focus();
                var $oldName = $nameDiv.text();
                $editName.val($oldName);
                var $newName;
                $editName.keyup(function () {
                    $newName = $editName.val();
                    $nameDiv.text($newName);
                    $prodLeft.find('.right-prodName').text($newName);
                    $boughtProd.find('.itemName').text($newName);
                });
                $editName.blur(function () {
                    if(!$newName.trim()){
                        $nameDiv.text($oldName);
                        $prodLeft.find('.right-prodName').text($oldName);
                        $boughtProd.find('.itemName').text($oldName);
                    }
                    $editDiv.hide();
                    $nameDiv.show();
                });
            });

        }
        $('.nameinput').val('');
    }

    //event on adding button
    $("#toListBut").click(function () {
        var prodName = $(".nameinput").val();
        addProd(prodName);
    });

    //sensitiveness to enter-key
    $('.nameinput').keypress(function (e) {
        if (e.which == 13) {
            var prodName = $('.nameinput').val();
            addProd(prodName);
        }
    });

    //3 items have been already added
    addProd('Помідори');
    addProd('Печиво');
    addProd('Сир');

});
