https://fonts.google.com/icons

ng build --configuration production

ng build --configuration production --aot --output-hashing=all

ng build --configuration production --aot --output-hashing=all --output-path docs --base-href /mySmallGroup/

manter o CNAMES no /docs
www.mysmallgroup.com.br

/docs/404.html
<script>
    window.location.href = "https://www.mysmallgroup.com.br/";
</script>
