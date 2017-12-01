# Data Scheme

## Backand
[Backand]("http://www.backand.com")
### Database-Model
The database-model.json file is the scheme that was used with  service. This service was discontinued because the developers were not confortable with the security implementation

## Buddy Parse (Parse)
[Buddy Parse]("http://parse.buddy.com")
### User
The user schema is the base information contained in the user class.
There are three properties that matter: username, email, password
It is important to not put anymore properties inside the user model because of the way buddy implements user class security.

### User-Details
The user details scheme is the extended user details. This is done because buddy parse security doesn't allow other users to alter data in the user class as a secuirty measure. In order to create the ability to modify user data for administrators, the details not linked to username, password, and email have been moved into this class.

### Project
The project class contains all the information about projects in the organization. The class is used to associate users to projects for each semester. 

### PartnerOrg
The partner organization class contains all the information about partners that sponsor projects. The class is used to associate partner organizations with projects

### Chapter
The chapter class contains the scheme for each chapter of greenlightsolutionsfoundation organization. The class is used to associate users, projects, partner organizations, to a single chapter. 