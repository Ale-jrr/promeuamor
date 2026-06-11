// =============================================================
//  CONFIGURAÇÃO DO SEU PRESENTE  -  edite tudo aqui
// =============================================================
// Esse arquivo funciona como seu "banco de dados".
// Mude os textos, datas e a lista de fotos abaixo.
// =============================================================

window.PRESENTE = {
  // --- Tela de abertura ("Wrapped") ---
  intro: {
    deUm: "Alessandro",                // quem está dando o presente
    titulo: "separou um presente especial!",
    subtitulo: "Um momento único feito com carinho\npara celebrar a jornada de vocês",
    botao: "Ver Presente",
    dominio: "alepraale.vercel.app",   // mostrado na barra falsa quando aberto local; online usa o endereço real
  },

  // --- Player de música (estilo Spotify) ---
  musica: {
    titulo: "Planos",                   // nome da música
    artista: "BK' part. Luccas Carlos", // artista
    arquivo: "assets/music.mp3",        // coloque seu MP3 nesse caminho
    cabecalho: "Eu te amo mais que tudo! 🤍",
  },

  // --- Fotos do casal (aparecem no player, em sequência) ---
  // Coloque as imagens em assets/photos/ e liste os nomes aqui.
  fotos: [
    "assets/photos/foto1.jpg",
    "assets/photos/foto2.jpg",
    "assets/photos/foto3.jpg",
    "assets/photos/foto4.jpg",
    "assets/photos/foto5.jpg",
    "assets/photos/foto6.jpg",
  ],

  // --- Sobre o casal + contador ---
  casal: {
    titulo: "Sobre o casal",
    nomes: "Alessandro e Alessandra",   // nomes do casal
    desde: "Juntos desde o Halloween da UNIBRA até o resto da vida! 🎃❤️",
    fotoDestaque: "assets/photos/foto1.jpg",

    // Data EXATA em que começaram a namorar (ano, mês, dia, hora, minuto)
    // Mês começa em 0 = janeiro, 1 = fevereiro ... 11 = dezembro
    // Está em 31/10/2022 (Halloween) — ajuste se o evento foi outro dia.
    dataInicio: new Date(2022, 9, 31, 0, 0, 0),
  },

  // --- Passos (cards que abrem ao tocar, logo abaixo do "Sobre o casal") ---
  // Adicione quantos quiser. O "Passo N" é numerado automaticamente.
  // Coloque as fotos em assets/passos/ e ajuste os textos.
  passos: {
    titulo: "Nossos passos",
    subtitulo: "Toque em cada passo para reviver o momento 💕",
    itens: [
      { titulo: "Nosso noivado",        legenda: "...",  foto: "assets/passos/passo1.jpg" },
      { titulo: "Nosso casamento",      legenda: "...",  foto: "assets/passos/passo2.jpg" },
      { titulo: "Nossa casinha",        legenda: "...",  foto: "assets/passos/passo3.jpg" },
      { titulo: "Nossa família linda ❤️", legenda: "...",  foto: "assets/passos/passo4.jpg" },
    ],
  },

  // --- Mensagem final (opcional, aparece embaixo do contador) ---
  mensagemFinal:
    "Cada segundo ao seu lado é o meu lugar favorito no mundo. ❤️",

  // --- Carta final (tela com corações caindo ao fundo) ---
  carta: {
    titulo: "Para o amor da minha vida",
    assinatura: "Seu amor ❤️",
    paragrafos: [
      "Meu amor,",
      "Hoje eu parei para pensar em tudo o que vivemos juntos, em cada momento, cada conversa, cada sorriso, cada dificuldade que enfrentamos e superamos lado a lado. E quanto mais eu penso, mais tenho certeza de uma coisa: você foi a melhor coisa que aconteceu na minha vida.",
      "É difícil colocar em palavras tudo o que eu sinto por você, porque o meu amor vai muito além de qualquer texto, de qualquer frase bonita ou declaração. Mas mesmo assim eu quero tentar, porque você merece saber o tamanho do espaço que ocupa no meu coração.",
      "Você não é apenas a mulher que eu amo. Você é minha companheira, minha melhor amiga, minha parceira de vida, a pessoa com quem eu compartilho meus sonhos, meus medos, minhas conquistas e até os momentos mais simples do dia. Você transformou minha vida de uma forma que eu jamais imaginei ser possível. Desde que você entrou nela, tudo ganhou mais cor, mais sentido e mais propósito.",
      "Eu amo o seu jeito, amo o seu sorriso, amo a sua voz, amo a forma como você me entende mesmo quando eu não consigo explicar o que estou sentindo. Amo a sua força, sua inteligência, seu carinho e até os pequenos detalhes que talvez você nem perceba. São essas coisas que me fazem olhar para você todos os dias e ter a mesma certeza: eu escolheria você de novo, mil vezes, em qualquer vida.",
      "À medida que o tempo passa, meu amor por você não diminui. Pelo contrário, ele cresce. Cresce porque eu conheço mais você a cada dia. Cresce porque vejo a mulher incrível que você é. Cresce porque percebo que não existe ninguém no mundo com quem eu queira dividir minha vida além de você.",
      "Estamos chegando em um momento muito especial da nossa história. Depois de tudo o que construímos, sinto que estamos vivendo um dos capítulos mais importantes da nossa vida juntos. Não porque tudo seja perfeito, mas porque aprendemos a caminhar juntos, a crescer juntos e a sonhar juntos. E isso vale mais do que qualquer perfeição.",
      "Quando eu penso no futuro, você está em todos os meus planos. Eu imagino nossa casa, nossos sonhos se tornando realidade, nossas conquistas sendo celebradas lado a lado. Imagino nós construindo uma família, criando memórias, vivendo momentos inesquecíveis e enfrentando qualquer desafio de mãos dadas. Imagino envelhecer ao seu lado, olhar para trás depois de muitos anos e sentir orgulho da história linda que construímos juntos.",
      "Eu quero estar ao seu lado nos dias bons, comemorando cada vitória. Quero estar ao seu lado nos dias difíceis, sendo seu apoio e seu porto seguro. Quero ser a pessoa que segura sua mão quando você precisar, que te abraça quando o mundo parecer pesado e que te faz lembrar todos os dias o quanto você é amada.",
      "Você é a pessoa com quem eu quero acordar todos os dias da minha vida. A pessoa com quem quero compartilhar cada fase, cada sonho realizado e cada novo objetivo. Quero viver todas as versões da nossa história. Quero ver nossos cabelos ficando brancos, nossas experiências aumentando e nosso amor permanecendo firme, forte e verdadeiro.",
      "Se existe algo que eu aprendi com você, é que amar não é apenas sentir. Amar é escolher. E eu escolho você todos os dias. Escolho você nas alegrias, nas dificuldades, nos momentos simples e nos momentos especiais. Escolho você para caminhar comigo hoje, amanhã e por todos os dias que Deus permitir.",
      "Você é o amor da minha vida. É a pessoa que me faz acreditar em um futuro bonito. É quem me inspira a ser alguém melhor. É quem me faz sentir em casa, independentemente de onde eu esteja.",
      "Obrigado por cada momento, por cada demonstração de carinho, por cada palavra de incentivo e por todo o amor que você me dá. Obrigado por acreditar em nós. Obrigado por construir essa história ao meu lado.",
      "Eu não sei exatamente o que o futuro nos reserva, mas existe uma coisa que eu sei com toda a certeza do meu coração: eu quero viver esse futuro com você. Quero continuar escrevendo nossa história, realizando nossos sonhos e construindo a família que tanto imaginamos.",
      "Eu te amo mais do que consigo expressar em palavras. Te amo pelo que você é, pelo que somos juntos e por tudo o que ainda vamos viver. E enquanto eu existir, meu coração continuará escolhendo você, todos os dias, sem exceção.",
      "Você é, e sempre será, o grande amor da minha vida.",
      "Com todo o amor que existe em mim,",
    ],
  },
};
