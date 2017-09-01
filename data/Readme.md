#Data Scheme

##Database-Model
The database-model.json file is the scheme that was used with [backand]("http://www.backand.com") service.

##User
The user schema is the base information contained in the user class for [buddy parse]("http://parse.buddy.com")
There are three properties that matter: username, email, password
It is important to not put anymore properties inside the user model because of the way buddy implements user class security.  