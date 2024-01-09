https://fonts.google.com/icons

ng build --configuration production (esse)

ng build --configuration production --aot --output-hashing=all

ng build --configuration production --aot --output-hashing=all --output-path docs --base-href /mySmallGroup/

manter o CNAME no /docs
www.mysmallgroup.com.br

/docs/404.html
<script>
    window.location.href = "https://www.mysmallgroup.com.br/";
</script>


Menu
- Home ???

- Participantes (gestão)
- Calendário de Eventos
    - Página de evento (botão voltar)
        - Evento Principal?, Presença do dia, Sorteio, Descrição, Fotos, etc.
- Relatórios (filtros e talvez para calendário de eventos tb)
    - Frequência Geral, Frequência Simples, Evento Principal
- Configurações
    - Alterar nome da célula    
    - Sair
    - Língua
    - Tema?
    - Alterar Senha?