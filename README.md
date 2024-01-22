$ SERVER DESCRIPTION

_scripts_
development - npm run dev - uses nodemon
prod - npm run start
while registering and login one will get new token use it in authorization to be authenticated for server all the time.

_notes_
Express with sequelize and mysql

JWT TOKEN for authentication . The server assumes the frontend will store and cache the token for the user based on its user_id. Check auth.middleware.ts to know the createAccessToken method. Default alogrithms are used.
Hence based on above JWT TOKEN one \*logout functionity can be achieved in the frontend only clearing out the stored or cached token.

sequelize-cli can be used was observed very late in the task notes hence I didnt used it from start and hence not integrated with this version of project yet. // Always prefer sequelize-cli

_API DESCRIPTION_

# ENDPOINTS | TYPE | INPUTS | OUTPUTS

------------------users-------------

# users/registerUser --> POST --> {username,email,password} ==> user , token

# users/login --> POST --> {username,password} ==> user , token

# users/update --> PUT --> {...} => updatedUser

# users/logout --> GET --> { } ==> { }

--------------blogs------------------

# blogs/create --> CREATE --> {user_id,title,content} ==> {..blog.body}

# blogs/update --> PUT --> {blog_id , title? , content? , user_id{should be available via jwt authentication.}} ==> {..blog.body}

# blogs/delete --> DELETE --> {blog_id , user_id } ==> {..blog.body}

--------------comment-----------------

# comment/create --> CREATE --> {user_id , blog_id , content } ==> {..comment.body}

# comment/update --> PUT --> {comment_id , content , user_id {jwt authentication} } ==> {..comment.body}

# comment/delete --> DELETE --> {user_id , comment_id } ==> {..comment.body}

# comment/fetch --> GET --> {comment_id} ==> {..comment.body}

# comment/fetchBlogComment --> GET --> {blog_id} ==> {[..comments.body]}

.........................................................DEVELOPERS NOTE------------------------------------------

AREA OF IMPROVEMENT - SEQUELIZE-CLI - BETTER AND DEDICATED DATA VALIDATION - SOPHISTICATED JWT HANDLING.
ACTIVE CODING TIME - 15 HOURS.
