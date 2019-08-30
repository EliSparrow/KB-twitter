

## Projet MERN

#### Todo :

- Back-end :
    - User MODEL: username(R) | email(R) | password(R) | avatar | admin(default:false) | birthdate(R) (age > 13) | description | webSite | language | Ban(default:0)(until date) | Suspended(default:false)(boolean) | followId(a la création) | createdAt | updatedAt
        1. Register
        2. Login
        3. User CRU(D) + suspend account(BONUS), only admin can delete account

    - Post MODEL: content | userId | createdAt | updatedAt
        1. Post CR(UD) (user online) -> U&D only for owner and admin
        2. All Posts page ('/explore')

    - Follow MODEL: followedUserId | followingUserId | seePost(boolean)     LF info on populate
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
          
- Ressources:
    - [Full MERN tuto](https://www.youtube.com/watch?v=7CqJlxBYj-M)

    - [CRUD Tutorial 1](https://www.youtube.com/watch?v=qvBZevK1HPo)
    - [CRUD Tutorial 2](https://www.youtube.com/watch?v=_02zK1D4brk)
    - [CRUD Tutorial 3](https://www.youtube.com/watch?v=WT67-OETeGU)
    - [CRUD Tutorial 4](https://www.youtube.com/watch?v=GIITXvYD7pc)

- BONUS :    
    - @Username dans le text redirection vers profil
    - Implement an avatar system (localstorage)
    - Ability to register to your app through Facebook/Twitter API
    - A “remember me” option
    - Admin space
    - Birthday CSS
    - [upload avatar](https://www.youtube.com/watch?v=9Qzmri1WaaE) 

    


