<h1 align="center">Notes </h1>
1-edit order >>controller>> user.controller > line 158 :
--id is changing for every edit

2-orders -->db>>model>>user.model line 55 --model vs array in user model

3-admin auth -->middleware>>auth --we need admin to have access to everything
user has access to like edit /delete is there a better way ?!

4-admin register -->routes>>admin.routes line 4 --is it ok to register admin
without auth (then everone can register) or we can limit it?!

5-
