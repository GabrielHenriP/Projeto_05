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

})
