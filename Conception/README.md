

## Projet MERN

#### Todo :

- Back-end :
    - User MODEL: username(R) | email(R) | password(R) | avatar | admin | birthdate(R) (age > 13) | description | ville | webSite | language | Ban (until date) | Suspended (boolean) | createdAt | updatedAt
        1. Register
        2. Login
        3. User CRU(D) + suspend account(BONUS), only admin can delete account

    - Post MODEL: content | userId | createdAt | updatedAt
        1. Post CRUD (user online) -> U&D only for owner and admin
        2. All Posts page ('/explore')

    - Follow MODEL: followedUserId | followingUserId | seePost(boolean)
        1. Follow C~~R~~UD (user online, impossible to follow himself)

    - (BONUS) Comment MODEL: content | postId | userId | createdAt | updatedAt
        1. Comment C~~R~~UD (user online) -> U&D only for comment owner and admin | D for post owner

    - (BONUS) Like MODEL: postId | commentId | userId | CreatedAt
        1. Like C~~RU~~D (user online) -> Like posts and comments

- Front-end :
    - Step 1:
        - template
            - base
            - navbar ( offline | online)
            - footer
        - Register
            - form
        - Login
            - form
        - Profile  ('/:name')
            - profile section
            - edit profile (modale)
                - edit form
                - suspend account (BONUS)
            
    - Step 2:
        - Profile + Own flow timeline ('/:name')
            - profile section
            - edit profile (modale)
            - Flow section
                - post section
                    - post form
                    - post flow (+ recent au + vieux)
        - Post Show
            - comment section
                - comment form
                - comments flow (+ recent au + vieux)

    - Step 3:
        - Follow timeline ('/')
            - Flow section
                - post section
                    - form post (modale)
                    - post flow (+ recent au + vieux)
        - Explore flow timeline
            - Flow section
                - post section
                    - post flow 
        - Followers / Following Manager page (aside profile section)

    - Step 4:
        - Search
                - content
                - user
                - hastag
        - hastag in content must link to a search section where you can see all the same posts
          

- BONUS :    
    - @Username dans le text redirection vers profil
    - Implement an avatar system (localstorage)
    - Ability to register to your app through Facebook/Twitter API
    - A “remember me” option
    - Admin space
    - Birthday CSS

    


