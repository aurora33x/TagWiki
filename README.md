# Wikipedia Forum App
## Introduction
This app is a social platform for sharing knowledge. It is a supplementary project to the [Wikipedia App](https://en.wikipedia.org) to add a social aspect to the Wikipedia experience. It is a platform that users can share their opinions on everything on the Wikipedia. 

![wikiforum](/frontend/public/wikiforum.png "wikiforum")

## Features

The core features of the app are:
- **Discussion**: **BUILT FROM SCRATCH!** Users can create a post to share their opinion on a particular topic or an article. Their post will be visible to all users. Under posts, users can comment on the post. Each comment is a “thread”. Comments can be replied to. All replies to a comment should be logically and visually contained in
- **RTE**: Users can edit post content in rich-text editing mode. Empowered by ReactMarkDown
- **Post**: **BUILT FROM SCRATCH!** The core function. Users can create a post, others can see and comment below. 
- **Easy article referencing**: **BUILT FROM SCRATCH!** Users on the platform can easily reference articles by the title, section heading or even a fragment of the article. 
- **Community**: **BUILT FROM SCRATCH!** Categorises posts into different communities. Users can create a community or join existing communities
- **User System**: **BUILT FROM SCRATCH!** Users can create an account and create a profile.
- **Commenting**: **BUILT FROM SCRATCH!** Under posts, users can comment on the post.
- **Maths Mode**: Users can add maths equations in LaTeX like syntax. Empowered by KaTeX. Equations will be rendered in preview and post detail page.
- **ReCAPTCHA**: Empowered by Google reCAPTCHA. Protects login, create post, change password functions.
- **Liking**: Users can like or cancel like what other users post.
## Get Started
Before you can start preparing the repository, you need to have `node@16` installed. This app will have problem with `node@18`. 
If you have `node@18` installed, you need to remove `node@18` first to install `node@16`.

For mac users, it is recommended to manage packages with `Homebrew`. Copy and paste following command into your terminal to install `node@16`. (You need to have [`brew`](https://brew.sh) installed)
`brew install node@16`

For Windows users, consider using Windows package manager `winget` to manage `node` versions. Copy and paste following command into your terminal to install `node@16`. (You need to have [`winget`](https://winget.run) installed)
`winget install -e --id OpenJS.NodeJS -v 16.12.0`

To run this project, all you need to do is to install some dependencies.

### Install the dependencies
Using yarn in backend and frontend:
```
yarn install
```

### Run the dashboard
Using yarn in backend and frontend:
```
yarn start
```

The dashboard will now run in your default browser at: http://localhost:3000/

## Tools
We use the MERN Stack as our development tool. The MERN stack includes open source components, including frameworks, libraries, and databases based on JavaScript; this makes the stack popular with its compatibility and easy learning curve.

![mongo](/frontend/public/mongo.png "mongo")

## Structure
The app consists of two main folders:

- **Front end**: Contains the sub-app of the client end of the app.
- **Back end**: Contains the sub-app of the server end of the app.

## Next
Please navigate to each folder and start preparing the repository.

## Test Details:
The tests have been categorized into two sides Backend and Frontend. 

### Backend Test 
4 test suites in total:
There are 3 schema tests under backend/src/model/__tests__ to verify if the schemas
are in a correct format and with right values for community, user, and vote schemas.
There is 1 api test under backend/src/routes/api/__tests__ to verify if a new user is able to call register api to sign up and an existing user is able to call login api to sign in.
And there is 1 db-handler.js under backend/src/model/__tests__ to connect to the in-memory database so that it won’t impact the real database for fetching or deleting data while executing test.

![test1](/frontend/public/test1.png "test1")

### Frontend Test
2 test suites in total:
There is 1 test for Navbar component under frontend/src/components/__tests__ to verify if login button renders given user not login and if user name renders given user already logged in.
And the other 1 test for login page under frontend/src/views/__tests__ to verify if the user is able to login successfully. Please note that: This test doesn’t get passed because GoogleReCaptcha Context has not yet been implemented and GoogleReCaptcha is used to detect human detection. Since this action is done apparently not regarded as an human detection, then the test will fail due to it.

![test2](/frontend/public/test2.png "test2")

## Acknowledgement
We would like to thank for the MediaWiki team https://www.mediawiki.org/wiki/MediaWiki for providing the APIs that supply wiki data reference.
