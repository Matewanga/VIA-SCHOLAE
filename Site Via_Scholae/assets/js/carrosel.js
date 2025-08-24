   $(document).ready(function(){
        $('.slick-slider').slick({
            dots: true, // Mostra os pontos de navegação
            infinite: true, // O carrossel será infinito
            speed: 500, // Velocidade da transição
            slidesToShow: 1, // Número de slides a serem exibidos
            slidesToScroll: 1, // Número de slides a serem rolados
            autoplay: true, // Ativa o autoplay
            autoplaySpeed: 3000, // Velocidade do autoplay
            arrows: true // Ativa as setas de navegação
        });
    });