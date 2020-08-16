# media-collector ![ISC Badge](https://img.shields.io/badge/License-ISC-brightgreen)

## Links

Demo Video: [Media Collector Demo Video](https://youtu.be/9YB0--9IDyU)

Repository Link: [Media Collector Repo](https://github.com/masonmarinko/movie-collector)

Live URL Link: [Media Collector Website](https://media-collector-project.herokuapp.com/)

## Description
- Media collector is a dual purpose website. Once logged in you can add your movie and book collection to the website which will track is based on information you input. Only required information is the Titles and the cover URL, don't know how to do it? There is a video on the same page with a 55 second tuturial teaching users. But that's not all. Media Collector is about community as well. Your movies and books are posted on the home page for all to see and comment, to talk about likes and dislikes.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Questions](#questions)


## Installation
(For USE)
1. Download repository

2. Create mysql database app is setup for one named "movie_collector"

4. Use "npm start" to start server, at which point you can open with localhost:3001 by default. You can then use the app openly.

(For Viewing)

1. Visit website: https://media-collector-project.herokuapp.com/

2. Have fun!

## Usage/Features

![image](/assets/readme_screenshots/homepage.png)

1) When you visit the website you are greeted with a clean homepage. The tiles have a hover effect and will show any videos or books posted by the community. It also tells the user who posted it and when (date) and how many comments have been made. At the top are the navigation tabs, these tabs are for Home, Dashboard, Login, Signup if the user isn't signed in, and shows Home, Dashboard, and Logout if the user is logged in.

![image](/assets/readme_screenshots/login.png)

2) If the user selects login they will be directed to the login screen, if the user selects dashboard and is not logged in they will be redirected to this page as well. The user can put in their username and password, if they are not a user, or have not made an account they can click the link below that says "New? Sign Up"

![image](/assets/readme_screenshots/signup-1.png)
![image](/assets/readme_screenshots/signup-2.png)
![image](/assets/readme_screenshots/signup-3.png)

3) If the user needs to signup for an account they will be directed here. They can create a username and enter a password. As they enter their password helped text will appear below and tell the user if their password is strong or if it needs to be better along with helpful comments/recommendations on how to fix it. The different screenshots represent some examples of the text depending on what is entered.

![image](/assets/readme_screenshots/dashboard-1.png)
![image](/assets/readme_screenshots/dashboard-2.png)

4) Once signed in you are redirected to your dashboard. The first screenshot is the upper half, second is the lower half (assuming its populated). The upper half has an area to put in book or movie information and once done you hit create and its added to your list. It also will be shown to the community on the home page. There are fields that allow you to insert information about your book or movie but the only required information is the Titles and the Cover Image URL. If the user has any confusion about how to add/find the cover imgae URL there is a 55 second video telling the user exactly what to do. That video can be found at "https://youtu.be/9YB0--9IDyU"

![image](/assets/readme_screenshots/edit-1.png)

5) If the user selects edit on their dashboard on a specific book or movie they will be routed to the edit screen. These fields will populate with the information the user has already put in. If the user wants to they can add information, remove information or just delete the book or movie altogether.

![image](/assets/readme_screenshots/comment-1.png)

6) When looking at other user's movies on the homepage you can also comment. This will allow you to communicate with other members of the Media Collector community about likes, dislikes and just plain conversation. The post will show who posted it, once its commented on the movie or book will update and show how many comments are attached.


## License
This project is covered under the following license(s):
ISC

## Questions? Ask Us:

GitHub Profiles:

- [Mason Marinko](https://github.com/masonmarinko)

- [Paul Throckmorton](https://github.com/siwel20)

- [Matthew McFadden](https://github.com/MatthewMcFadden)


Questions? Contact Us:
- [Mason Marinko](<Mason.P.Marinko@gmail.com>)

- [Paul Throckmorton](<plthrock@gmail.com>)

- [Matthew McFadden](<matt.mcfadden14@gmail.com>)
