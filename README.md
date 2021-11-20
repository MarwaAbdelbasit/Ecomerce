h<h1 align="center">Notes </h1>

<h4>2-orders -->db>>model>>user.model line 55 </h4>
<p>--model vs array in user model</p>......Solved(model)

<h4>3-a-Bearer in Auth -->middleware>>auth <h4>
<p>--we removed Bearer because it is
possiple that user does not enter any header so it will be <<undefined.replace>>
giving an error (is there other way to handle this?!) ++ps:removing Bearer
doesn't affect the functionality of auth </p>

<h4>3-b-admin auth -->middleware>>auth <h4>
<p>--we need admin to have access to everything
user has access to like edit /delete is there a better way ?!</p>

<h4>4-admin register -->routes>>admin.routes line 4<h4>
<p>--is it ok to register admin
without auth (then everone can register) or we can limit it?!</p>

5-
