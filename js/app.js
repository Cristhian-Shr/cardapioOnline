$(document).ready(function () {
  cardapio.eventos.init();
});

var cardapio = {};

cardapio.eventos = {
  init: () => {
    cardapio.metodos.obterItensCardapio();
  },
};

cardapio.metodos = {
  obterItensCardapio: (categoria = "burgers", vermais = false) => {
    var filtro = MENU[categoria];
    console.log(filtro);

    if (!vermais) {
      $("#itensCardapio").html("");
      $("#btnVerMais").removeClass("hidden");
    }

    $.each(filtro, (i, e) => {
      let temp = cardapio.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","));

      if (vermais && i >= 8 && i < 12) {
        $("#itensCardapio").append(temp);
      }
      if (!vermais && i < 8) {
        $("#itensCardapio").append(temp);
      }
    });
    $(".container-menu a").removeClass("active");
    $("#menu-" + categoria).addClass("active");
  },

  verMais: () => {
    var ativo = $(".container-menu a.active").attr("id").split("menu-")[1];
    cardapio.metodos.obterItensCardapio(ativo, true);

    $("#btnVerMais").addClass("hidden");
  },
};

cardapio.templates = {
  item: `
    <div class="col-3 mb-5">
    <div class="card card-item">
        <div class="img-produto">
            <img src="\${img}" alt="hamburger">
        </div>
        <p class="title-produto text-center mt-4">
            <b>\${name}</b>
        </p>
        <p class="price-produto text-center">
            <b>R$ \${price}</b>
        </p>
        <div class="add-carrinho">
            <span class="btn-menos"><i class="fas fa-minus"></i></span>
            <span class="add-numero-itens">0</span>
            <span class="btn-mais"><i class="fas fa-plus"></i></span>
            <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
        </div>
    </div>
</div>
    `,
};
