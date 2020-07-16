$(function(){

    var valorAtual = 0
    var sendoArrastado = false //o mouse
    

    $('.pointer-barra').mousedown(function() {
        console.log('eeh')
        sendoArrastado = true
    })
    $(document).mouseup(function() {
        console.log('ooh')
        sendoArrastado = false
        enableTextSelection()
    })

    $('.barra-preco').mousemove(function(e) {
        
        if(sendoArrastado){
            desableTextSelection()

            let barraDePreco = $(this)
            let posicaoMousenaBarra = e.pageX - barraDePreco.offset().left

            if(posicaoMousenaBarra < 0 ){
                posicaoMousenaBarra = 0
            }else if(posicaoMousenaBarra > barraDePreco.width()){
                posicaoMousenaBarra = barraDePreco.width()
            }

            let posicaoMousePorcentagem = (posicaoMousenaBarra / barraDePreco.width()) * 100
            console.log(posicaoMousePorcentagem)
            $('.barra-preco-fill').css('width', posicaoMousePorcentagem+'%')
            $('.pointer-barra').css('left',(posicaoMousenaBarra - 13)+'px')

            valorAtual = (posicaoMousePorcentagem / 100) * 70000
            valorAtual = formatarValor(valorAtual)
            $('.valorDaPesquisa #valorAtual').html('R$ '+valorAtual)
        }
    })

    function formatarValor(valor) {
        valor = valor.toFixed(2)
        //string = valor.toString()
        //return string.replace("." , ",")
        var valorArray = valor.split(".")
        var valorFinal = formatacaoFinal(valorArray)

        return valorFinal
    }

    function formatacaoFinal(valorArray) {
        if(valorArray[0] < 1000){
            return valorArray[0]+","+valorArray[1]
        }else if(valorArray[0] < 10000){
            return valorArray[0][0]+"."+valorArray[0].substr(1,valorArray[0].length)+","+valorArray[1]
        }else{
            return valorArray[0][0]+valorArray[0][1]+"."+valorArray[0].substr(2,valorArray[0].length)+","+valorArray[1]
        }
        
        
    }

    function desableTextSelection() {
        $('body').css('-webkit-user-select', 'none')
        $('body').css('-moz-user-select', 'none')
        $('body').css('-ms-user-select', 'none')
        $('body').css('-o-user-select', 'none')
        $('body').css('user-select', 'none')
    }

    function enableTextSelection() {
        $('body').css('-webkit-user-select', 'auto')
        $('body').css('-moz-user-select', 'auto')
        $('body').css('-ms-user-select', 'auto')
        $('body').css('-o-user-select', 'auto')
        $('body').css('user-select', 'auto')
    }

    /* slide de fotos na pagina de mais detalhes do carro  */

    var imgShow = 3
    var maxIndex = Math.ceil($('.mini-img').length/imgShow) - 1
    var setArrow = 0

    initSlider()
    function initSlider() {
        var amount = $('.mini-img').length * 33.3
        var scroll = $('.wraper-mini-galeria')
        var imgSingle = $('.mini-img')
        scroll.css('width',amount+"%")
        imgSingle.css('width',33.3*(100/amount)+"%")
        imgSingle.css('padding-top',33.3*(100/amount)*0.6+"%")
        navigateSlide()
        clickSlide()
    }

    function navigateSlide(){
        $('.arrow-right').click(function () {
            if(maxIndex > 0){
                setArrow = 1;
                var elementOffset = $('.mini-img').eq(imgShow).offset().left - $('.wraper-mini-galeria').offset().left;
                $('.mini-galeria').animate({'scrollLeft':elementOffset+'px'},900) ;
            }
        })

        $('.arrow-left').click(function () {
            if(setArrow > 0){
                setArrow = 0;
                var elementOffset = $('.mini-img').eq(0).offset().left - $('.wraper-mini-galeria').offset().left;
                $('.mini-galeria').animate({'scrollLeft':elementOffset+'px'},900) ;
            }
        })
    }

    function clickSlide() {
        $('.mini-img').click(function(){
            $('.mini-img').css('border','2px solid white');
            $(this).css('border','4px solid rgb(233, 51, 51)');

            var img = $(this).css('background-image')
            $('.foto-destaque').css('background-image', img)// funcionando
        })
        $('.mini-img').eq(0).click()
    }

          /* movimentação da pagina quando clicar em home ou contato */

    $('[goto=contato]').click(function(){
        $('footer a').css('color','white')
        $('header a').css('color','black')
        $('[goto=contato]').css('color','rgb(218, 32, 32)')
        $('html,body').animate({scrollTop: $('.contato').offset().top},1000);
        return false;
    })

    $('#home').click(function(){
        $('header a').css('color','black')
        $('.red').css('color','rgb(218, 32, 32)')
        $('footer a').css('color','white')
        $('footer a').eq(0).css('color','rgb(218, 32, 32)')
        $('html,body').animate({scrollTop: $('header').offset().top},1000);
        return false;
    })

                                /* menu mobile */

    $('.menu-mobile').click(function(){
        $(this).find('ul').slideToggle()
    })

                    /* slide de depoimentos */

    var amountDepoimentos = $('.wraper-right p').length
    navegarDepoimentos()
    showDepoimentos()
    var idxAtual = 0

    function showDepoimentos() {
        $('.right p').hide()
        $('.right p').eq(0).show()
        $('.right span').hide()
        $('.right span').eq(0).show()

    }

    function navegarDepoimentos() {
        $('[next]').click(function() {
            idxAtual++
            if(idxAtual > amountDepoimentos - 1)
                idxAtual = 0
            $('.right p').hide()
            $('.right p').eq(idxAtual).show()
            $('.right span').hide()
            $('.right span').eq(idxAtual).show()
        })

        $('[befor]').click(function() {
            idxAtual--
            if(idxAtual < 0)
                idxAtual = amountDepoimentos - 1
            $('.right p').hide()
            $('.right p').eq(idxAtual).show()
            $('.right span').hide()
            $('.right span').eq(idxAtual).show()
        })
    }
})
