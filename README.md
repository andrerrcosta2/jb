para rodar a aplicação:
entre no diretorio /jb1 e execute

`docker-compose up --build`

# Observações
1. Os testes estão rodando no mesmo db da aplicação (não deu tempo de trocar para um banco em memória)
2. Faltam muitos testes como validação, consistênncia de modelos, indexações, possíveis controles de
concorrencias de transações, enfim, foi meio corrido.
3. eu acabei não testando se o swagger. eu acredito que tem que declarar os modelos inteiros dentro das anotações, eu não lembro.