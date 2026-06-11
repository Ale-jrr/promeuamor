# 💚 Presente para a namorada

Site estático estilo "retrospectiva do casal" (inspirado no LovePanda):
tela de abertura → player de música com fotos → contador de tempo de namoro.

## 📁 Como personalizar (seu "banco" é o `config.js`)

Abra **`config.js`** e edite:

- `intro.deUm` → seu nome (aparece em "Fulano separou um presente especial!")
- `intro.subtitulo` → frase de abertura
- `musica.titulo` / `musica.artista` → dados da música
- `musica.arquivo` → caminho do MP3 (padrão: `assets/music.mp3`)
- `fotos` → lista das fotos do casal (passam no player)
- `casal.nomes` / `casal.desde` → nomes e "Juntos desde..."
- `casal.dataInicio` → **a data exata** em que começaram (liga o contador ao vivo)
  - ⚠️ o mês começa em 0: janeiro = 0, fevereiro = 1 ... dezembro = 11
- `mensagemFinal` → recadinho no fim

## 🖼️ Onde colocar os arquivos

- **Fotos:** dentro de `assets/photos/` (ex.: `foto1.jpg`, `foto2.jpg`...).
  Liste os nomes em `config.js` → `fotos`.
- **Música:** salve o arquivo como `assets/music.mp3`.

## ▶️ Ver no seu computador

Abra um terminal **dentro desta pasta** e rode:

```
npx serve .
```

Depois acesse o endereço que aparecer (ex.: http://localhost:3000).
Ou simplesmente dê **duplo clique no `index.html`** (o player de áudio funciona melhor via `npx serve`).

## 🚀 Colocar no ar (Vercel — grátis)

**Opção A — pelo site (mais fácil):**
1. Crie conta em https://vercel.com
2. Clique em **Add New → Project → Deploy** e arraste esta pasta inteira.
3. Pronto, ele te dá um link público (ex.: `seu-presente.vercel.app`).

**Opção B — pelo terminal:**
```
npm i -g vercel
vercel
```
Siga as perguntas (login + confirmar) e ele publica.

> Dica: depois de publicar, dá pra ligar um domínio próprio ou gerar um QR code
> do link pra entregar de presente. 😉
