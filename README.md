# Wifi Wander

![picture of website on different devices](readme-pics/website-examples.png)

## About the Project

- I created WifiWander as a platform specifically for digital nomads and remote workers who rely on finding reliable wifi while on the go. The website allows users to search for wifi spots in cities and regions worldwide, helping them locate places where they can work with uninterrupted internet access.

- The project uses React for the front-end and Django REST Framework for the back-end. The core feature of the site is a search tool that allows users to filter through continents, countries, and cities to discover all available wifi Locations. Additionally, logged-in users can contribute by adding new locations, posting reviews, and rating the quality of the wifi they’ve experienced.

- With WifiWander, I aimed to make it simple for users to:
  • Search for wifi Locations by region, country, or city through a clean, intuitive interface.
  • Filter results based on amenities, such as charging stations or quiet spaces, to find a location that meets their needs.
  • Contribute by adding wifi spots, leaving reviews, and managing their favorite locations through their personal profiles.

- I applied agile development practices, organizing the project into sprints and using user stories to guide the implementation of key features. The project is fully responsive, ensuring users can access it from any device, while maintaining strong UX and accessibility principles.

- Overall, WifiWander is designed to build a community-driven platform for remote workers, where they can discover new wifi spots, share comments, and contribute their own findings from around the world. The aim is to make finding reliable workspaces as straightforward as possible for digital nomads.

[Live Website Link](https://wifi-wander-74985bea95e7.herokuapp.com/)

## Target Audience

**What was the idea behind building the product?**

- Provide a centralized platform where users can search for Wi-Fi locations globally.
- Offer detailed information about each Wi-Fi location to users.
- Enable users to filter Wi-Fi locations based on city and specific criteria.
- Build a comprehensive repository of Wi-Fi locations.
- Allow users to filter and find the best Wi-Fi location based on ratings and amenities.
- Enable users to rate Wi-Fi locations and provide feedback.
- Show available amenities at each Wi-Fi location.

**Who is the user?**

- The platform is accessible to users of any age group.
- The primary audience includes digital nomads who travel frequently and rely on Wi-Fi.
- Users will be searching for Wi-Fi spots for business or leisure purposes.
- They will seek detailed information about the Wi-Fi location, including amenities offered.
- Users will want a way to gauge the quality of Wi-Fi at each location.

**What are the needs/wants of the users?**

- Users should easily navigate the platform and locate relevant information.
- They should be able to filter results to narrow down their search for specific Wi-Fi locations.
- The platform should be visually appealing, encouraging users to return.
- Users should have the ability to add new Wi-Fi locations they discover.
- Account creation should be available for enhanced interaction, such as commenting or rating.
- Users should be able to comment, rate, and review Wi-Fi locations.
- They should also find information about available amenities at each location.

**What are the needs/wants of the business?**

- Establish a go-to website for digital nomads seeking reliable Wi-Fi.
- Encourage regular user engagement and updates of new Wi-Fi locations.
- Ensure the platform is easy to navigate for all users.
- Create a visually appealing and well-balanced mix of images and text.
- Make adding a new Wi-Fi location simple and intuitive.
- Build and maintain a reliable repository of Wi-Fi locations worldwide.

**How does the site meet the needs of the user and business?**

- The homepage clearly states the platform's purpose, helping users understand its value.
- The search system is easy to use, allowing users to find Wi-Fi spots in any city.
- If no results are found, users are prompted to create a new listing, contributing to the repository.
- The platform serves as a centralized resource for global Wi-Fi locations.
- Users are encouraged to interact through the rating system and comment features.
- Creating an account enables users to add listings and contribute more actively.
- The platform ensures up-to-date information through user contributions.

## Scope

### What will the site include?

- **Search and Navigation**

  - The website will allow users to search for Wi-Fi spots by filtering through continents, countries, and cities. The homepage will feature interactive images representing each continent, making navigation simple and intuitive.
  - Logged-in users will have the ability to add new Wi-Fi locations if their search does not return a Wi-Fi location they were looking for.

- **User Contributions**

  - By creating an account, users can contribute to the platform by adding new Wi-Fi locations. They can also review existing locations and rate the Wi-Fi strength using a star-rating system.
  - Users can leave comments on each Wi-Fi location to provide up-to-date information or report any changes.

- **User Profiles**

  - Each user will have a personalized profile page where they can manage their contributions, including the Wi-Fi locations they’ve added. Users can also save Wi-Fi locations to a list of favourites for future reference.

- **Wi-Fi Page**

  - Each Wi-Fi location page will include a description, star rating, an image of the location, icons representing available amenities, and comments from other users.

- **Comments Section**

  - Logged-in users will have the ability to leave a comment under a Wi-Fi location, along with a rating based on their experience with the Wi-Fi and the location.

- **Description**

  - A section on the homepage will provide a clear description of how to use the site and what users can expect.

- **About Page**
  - This section will introduce the team behind the site, featuring images and a description of how the company started, along with the inspiration behind the idea.

## Structure

### Site Map

- Below shows a breakdown of the website depending on the logged in status of the user

**Logged in user or Admin**

- This wil be a user who has an account or admin

![picture of site map for clan representative](readme-pics/site-map-logged-in.png)

**General user**

- This will be a user with no log in details i.e general user

![picture of site map for non clan representative](readme-pics/site-map-general.png)

## Data Schema

- User Profile

  - The User Profile model stores all the necessary information for each registered user. It manages login credentials, user details, and profile images. Each user can add wifi locations, post comments, and save their favorite spots.

- Wifi Location

  - The Wifi Location model holds all the details about each wifi location added to the platform. Each wifi spot includes the location’s name, address, and available amenities. The model is connected to the user who added the location and supports features such as user ratings and comments.

- Comments

  - The Comments model allows users to leave feedback on individual wifi locations. Each comment is linked to both the user who posted it and the relevant wifi location. Users can rate the wifi quality with a star rating, and the comments section provides additional insights on the spot.

- Favorites
  - The Favorites model enables users to save wifi locations for future reference. Users can organize their favorite spots, add notes, and mark whether they’ve visited a location. Each favorite is tied to both the user’s profile and the wifi location.

![picture of data scheme](readme-pics/data-schema.png)

## Skeleton

### Wireframe

- I created wireframes for each page of the website, showing how the site will appear both in mobile and browser format.

**Homepage**

![picture of Homepage](readme-pics/homepage-wireframe.png)

**Country and city**

- These two pages have been combined as the basic layout is the same the only difference is the content

![picture of Country and City Page](readme-pics/city-and-country.png)

**Wifi location list**

![picture of Wifi Location List](readme-pics/wifi-location-list.png)

**About Page**

![picture of About Page](readme-pics/about-page.png)

**Wifi location page**

![picture of Wifi Location Page](readme-pics/wifi-location-page.png)

**Profile – Created and Favioutes**

- These two pages have been combined as the basic layout is the same the only difference is the content, they will not both appear at the same time

![picture of Profile with Created and Favioutes](readme-pics/profile-created-possibles.png)

**Comments - C.R.U.D**

- The image below shows the comments and also the update and delete functions
- If a user creates a comment they wil see the update and delete next to it
- Including how to create a comment

![picture of comments and CRUD functions](readme-pics/comments-crud.png)

**Sign in and Sign Up**

![picture of sing up and sing in form](readme-pics/sign-in-and-up.png)

**Sign out**

![picture of sign out system](readme-pics/sign-out-wireframe.png)

**Pop Up Message**

![picture of Pop Up Message](readme-pics/template-popup.png)

**Create/edit wifi location**

![picture of creating and editing Wifi Location](readme-pics/create-and-edit-wifi-location.png)

**Delete comment/wifi location**

![picture of Deleting Wifi Location](readme-pics/delete-wifi-location.png)

## Surface

**Images**

- For the logo this was generated from input text from myself where I described the website.
- The images that were used on the about page came from a site called unsplash
- The images on the homepage showing the 6 continents came from Wikipedia

![picture of Logo](readme-pics/logo.png)

**Colour Scheme**

- The website was created using colours that are in keeping with travel, journey, working on the go. All colours were checked to make sure they did not clash and had the correct contrast with one another.

- Header and Footer:

  - Background: Deep Blue (#003366)
  - Text: White (#FFFFFF)
  - Hover Links: neon green (#00f733)

- Website Body Content:

  - Background: Sand Beige (#F5DEB3)
  - All Text: Deep Blue (#003366)
  - Button background: Deep Blue (#003366)
  - Button Text: White (#FFFFFF)
  - Button background hover: neon green (#00f733)
  - Hover Button Text: White (#003366)

- Wifi location list

  - Background: Deep Blue (#003366)
  - Text: White (#FFFFFF)

- Listings / Featured Regions:

  - Background: Deep Blue (#003366)
  - Text: White (#FFFFFF)
  - Star Ratings: neon green (#00f733)
  - Hover Links: neon green (#00f733)

- Breadcrumb
  - Text: Deep Blue (#003366)
  - Text Hover: maroon (#800000)

![picture of colour palette ](readme-pics/colour-pallet.png)

**Typography**

- The theme for this website was Digital Noamds and how they operate whereby they are always travelling around the world therefore the font styles I selected were done so as they complemented that theme.

- Fonts were taken from google fonts:

  - Header font: fredoka - [Link](https://fonts.google.com/specimen/Fredoka?colors=140f11-fcfbfc-987987-b1bfab-97afa1&fonts=Pangolin-Inter&query=Fredoka)

  ![picture of header text example](readme-pics/header-font.png)

  - Main text font: Pangolin - [Link](https://fonts.google.com/specimen/Pangolin?colors=140f11-fcfbfc-987987-b1bfab-97afa1&fonts=Pangolin-Inter&query=Pangolin)

  ![picture of body text example](readme-pics/body-font.png)

## Agile

Kanban Board Link - [Link](https://github.com/users/GMontaque/projects/7)

- Due to the limited time available and the overall workload, I was unable to complete all the planned user stories. As a result, I had to reassess and adjust the priorities throughout the project. This allowed me to ensure that I delivered a Minimum Viable Product (MVP) that met the core requirements and functionality, even though some features were either postponed or modified. My focus was on delivering a functional product that aligned with the project's main objectives within the given timeframe.

**Epics**

- During the design stage of my project, I decided on the different features, structure and strategy for the site, this was broken down for the project using the agile methodology to better understand how to complete the project and implement the necessary features. At the same time, this ensured that the most important features were implemented first and that a deliverable product (minimum viable product) was created, even if some of the features were not completed within the set time. 12 EPICS were created 11 for the front end and 1 for the back end. These were then further broken down 12 user stories for the back end and 73 user stories for the front end.

- Below is the list of the 11 EPICS which were created for front end section of this project.

  - EPIC 1: Project set up
  - EPIC 2: Website Navigation
  - EPIC 3: Wifi Spot Filtering and Display
  - EPIC 4: User Authentication and Authorisation
  - EPIC 5: WIFI location page Creation and CRUD
  - EPIC 6: Wifi Location Page
  - EPIC 7: City and Country Profiles
  - EPIC 8: Error Handling
  - EPIC 9: Testing
  - EPIC 10: Wifi Location Page Features
  - EPIC 11: “Possibles” visit WIFI Locations

- Below is the list of the EPIC which were created for Back End section of this project.
  - EPIC 1: Back-End API Development

**User stories**

- Once the user stories and epics had been created, the next stage was to break them down to understand which to prioritize and which could be left to be completed at a later stage. I used the MoSCoW prioritization technique to do this. This process works by giving each user story a score (story point) as to the estimated amount of effort required to implement the user story and then once implemented checked against the acceptance criteria. The story point number system uses something called the Fibonacci numbers, the reason for this is that the number sequence goes (1, 2, 3, 5, 8, 13, etc.), the benefit of which is that it allows for the different size of tasks. For example setting up a GitHub repository is a relatively easy task but styling a website is much more complex with a number of parts, which the Fibonacci numbers allows for.

- Each entry in the kanban board shows the MoSCoW prioritisation result.

- MoSCoW prioritization technique stands for:

  - Must-Have: Critical requirements that must be implemented for the project to be considered successful.
  - Should-Have: Important requirements that are not critical but add significant value.
  - Could-Haves: Desirable features that would be nice to have but are not crucial.
  - Won't-Have: Features that are explicitly excluded from the project scope.

- The total Story Points in the project is 253.
- Must-Have : 189 story points
- Should-Have : 51 story points
- Could-Have : 13 story points
- Wont-Have

**Mock Kanban Board**

- As referenced previously, when deciding on how to proceed, I first broke the user stories down using the MoSCow technique and then added a story point value to each user story. I went through a few iterations to decide on the order of completion. Having arrived at a satisfactory order, I completed the project over 5 iterations.

[Excel Spreadsheet](https://docs.google.com/spreadsheets/d/1MN09sHqwkGb0rT8LuqexFH33Z2vpBfb0pXv4thdSXCI/edit?usp=sharing)

## Features

### Navigation Bar

- The navigation bar appears at the top of all pages within the website.
- Before a user logs in, the navigation bar contains links to the logo, home, about, sign-up, and sign-in pages.
- For a logged-in user, the navigation bar updates to include home, about, add location, profile, and log-out links.
- Non-logged-in users will only see the standard navigation bar links.
- When a link is moused over, its color changes to indicate focus. Additionally, the link to the current page the user is on will appear in a different color on the navigation bar.

- **Navigation Bar - General User**

![picture of General user navigation bar](readme-pics/navbar-general.png)

- **Navigation Bar - Admin and Logged-in User**

![picture of Admin and Logged-in User navigation bar](readme-pics/navbar-logged-in.png)

- **Mobile Navigation Bar**

![picture of mobile navigation bar](readme-pics/navbar-mobile.png)

### Footer

- The footer appears at the bottom of all the web pages.
- It contains social media links, website links, and a logo.
- There is also a section containing legal wording.

![picture of footer](readme-pics/footer.png)

- **Footer Mobile**

![picture of Footer Mobile](readme-pics/footer-mobile.png)

### Home Page

- The page contains the navigation bar, a hero image with the website title, and a small caption. The hero image is auto-generated.
- **Description section**: This explains the website in more detail.
- **Continent images**: These are used to allow the user to search the website for different Wi-Fi locations.
- The footer contains website links and social media links.

![picture of homepage top](readme-pics/homepage-top.png)  
![picture of homepage middle](readme-pics/homepage-middle.png)  
![picture of homepage bottom](readme-pics/homepage-bottom.png)

- **Homepage Mobile**

![picture of homepage mobile](readme-pics/homepage-mobile.png)

### Filtering by Location (Continent/Country/City)

- A user can click on any of the 6 continent images.
- Upon clicking a link, the user is taken to a page showing countries for further filtering.
- After selecting a country, they will be directed to a list of cities.
- Finally, after selecting a city, the user will see a list of Wi-Fi locations in that city.
- If no result is found for a continent, the user can click on a button to add a new location (they must be signed in to do so).

- **Continent Full Screen and Mobile**

![picture of Full Screen Continent](readme-pics/continent-fullscreen.png)  
![picture of Mobile Continent](readme-pics/continent-mobile.png)

- **Country Full Screen and Mobile**

![picture of Full Screen country](readme-pics/country-fullscreen.png)  
![picture of Mobile country](readme-pics/country-mobile.png)

- **City Full Screen and Mobile**

![picture of Full Screen City](readme-pics/city-fullscreen.png)  
![picture of Mobile City](readme-pics/city-mobile.png)

### User Registration

- There is a link in the navigation bar that directs users to the registration form.
- Users must complete the form with a username, email, password, memorable name, and optionally a profile image.
- After submitting the form, a confirmation message appears, and the user is redirected to the homepage.
- A confirmation message will appear to confirm their registration.

![picture of sign up fullscreen](readme-pics/sign-up-fullscreen.png)

- **Register Mobile**

![picture of sign up mobile](readme-pics/sign-up-mobile.png)

### User Log In

- There is a link in the navigation bar that directs users to the log-in form.
- Users must enter their username and password.
- Once logged in, they are redirected to the homepage, and a confirmation message appears.
- The navigation bar updates with appropriate links based on the user's status.

![picture of sign in fullscreen](readme-pics/sign-in-fullscreen.png)

- **Sign In Mobile**

![picture of sign in mobile](readme-pics/sign-in-mobile.png)

### User Log Out

- The log-out link appears in the navigation bar once the user is logged in.
- Clicking this link opens a pop-up asking for confirmation.
- After confirming, the user is logged out, and a message appears confirming the action.

![picture of sign out page](readme-pics/sign-out.png)

### Create Wi-Fi Location

- When a user is logged in, they will see an "add location" link in the navigation bar.
- Clicking the link takes the user to a form where they can input details such as the Wi-Fi location’s name, address, amenities, and an optional image.
- The city field is linked to a database that auto-fills the country and city upon selection.
- After submitting the form, a confirmation message will appear if successful.

![picture of Create Wi-Fi location](readme-pics/create-wifi-location.png)

- **Mobile**

![picture of Create Wi-Fi location Mobile](readme-pics/create-wifi-location-mobile.png)

### Wi-Fi Location Page

- After a user searches the website and clicks on a Wi-Fi location, they will be taken to this page.
- The page contains the full details of the Wi-Fi location, including:
  - Left side: An image of the location and its amenities.
  - Right side: The name, description, and comments section.
- Logged-in users can also add a comment.

![picture of Wi-Fi location page](readme-pics/wifi-location-page-fullscreen.png)

- **Mobile**

![picture of Wi-Fi location page Mobile](readme-pics/wifi-location-page-mobile.png)

### Delete Wi-Fi Location

- For the user who created the Wi-Fi location or an admin, two buttons appear at the top of the Wi-Fi location page, one of which is a delete button.
- Clicking the delete button opens a pop-up asking for confirmation.
- Once confirmed, the user will see a pop-up message confirming the deletion.

![picture of Delete Wi-Fi location page](readme-pics/wifi-location-delete.png)

- **Mobile**

![picture of Delete Wi-Fi location Mobile](readme-pics/wifi-location-delete-mobile.png)

### Edit Wi-Fi Location

- The second button available to the user who created the Wi-Fi location or admin is the edit button.
- Clicking the button redirects the user to the Wi-Fi location creation form, pre-populated with the current data.
- Once the form is updated, a confirmation pop-up will appear.

![picture of Edit Wi-Fi location page](readme-pics/wifi-location-edit-fullscreen.png)

- **Mobile**

![picture of Edit Wi-Fi location Mobile](readme-pics/wifi-location-edit-mobile.png)

### Create Comment

- Logged-in users can create a comment on any Wi-Fi location.
- The comment section is displayed below the Wi-Fi location information.
- The username is pre-filled, and users can add a comment and a star rating.
- After submitting the comment, a confirmation message will appear, and the comment will be displayed on the Wi-Fi page.

![picture of Create comment](readme-pics/wifi-location-edit-create-comment-fullscreen.png)

- **Mobile**

![picture of Create comment](readme-pics/wifi-location-edit-create-comment-mobile.png)

### View Comment

- All comments related to a Wi-Fi location are displayed below the description section.
- Each comment shows the username, star rating, and the comment content.
- Every Wi-Fi location has its own unique list of comments.

![picture of View comment](readme-pics/wifi-location-view-comment-fullscreen.png)

- **Mobile**

![picture of View comment Mobile](readme-pics/wifi-location-view-comment-mobile.png)

### Edit Comment

- Logged-in users who have created a comment will see two buttons next to their comments: edit and delete.
- Clicking the edit button pre-fills the comment section with the existing data, allowing the user to update it.
- After editing, a confirmation message will appear.

![picture of Edit comment](readme-pics/wifi-location-edit-comment-full.png)

- **Mobile**

![picture of Edit comment Mobile](readme-pics/wifi-location-edit-comment-edits.png)

### Delete Comment

- Like the edit button, the delete button appears next to comments created by the logged-in user.
- Clicking the delete button opens a pop-up asking for confirmation.
- After confirming, the comment is deleted, and a pop-up message confirms its removal.

![picture of Delete comment Mobile](readme-pics/wifi-location-delete-comment-mobile.png)

- **Mobile**

![picture of Delete comment](readme-pics/wifi-location-delete-comment-full.png)

### Profile Page

- Users who have created an account and logged in will have a profile page.
- The profile page shows the user’s profile image, username, and a list of Wi-Fi locations they have created and favorited.
- The created and favorited Wi-Fi locations are split into two tabs, with summary information such as image, name, address, and links.

### Add Wi-Fi Location to Favorites

- To add a Wi-Fi location to a user's favorites list, they need to click the button that appears on that specific Wi-Fi location page.
- After clicking the button, a pop-up will confirm that the Wi-Fi location has been added to the favorites list.
- If the user has created the Wi-Fi location, they will not be able to add the location to their favorites.

![picture of Add Wi-Fi location to favorites](readme-pics/wifi-location-add-to-fav.png)

- **Mobile**

![picture of Add Wi-Fi location to favorites](readme-pics/wifi-location-add-to-fav-mobile.png)

### Remove Wi-Fi Location from Favorites

- To remove a Wi-Fi location from a user's favorites list, they need to go to their profile page and click on the favorites tab.
- Here, each Wi-Fi location will have a remove button next to it.
- When the user clicks the button, a pop-up will appear asking for confirmation to remove the location.
- If they confirm, the Wi-Fi location is removed from the favorites list, and a pop-up will confirm the action.

![picture of Removing Wi-Fi location from favorites](readme-pics/wifi-location-remove-favioutes.png)

- **Mobile**

![picture of Removing Wi-Fi location from favorites](readme-pics/wifi-location-remove-favioutes-mobile.png)

### About Page

- The About page can be accessed from the navigation bar.
- When clicked, it takes the user to a page divided into sections:
  - The top section provides an overview of the company.
  - Below, there is a section filled with images of company employees and descriptions about the company and the team.

![picture of About page](readme-pics/wifi-location-about-page.png)

- **Mobile**

![picture of About page Mobile](readme-pics/wifi-location-about-page-mobile.png)

## Future Implementations

- **Search Bar** – A search bar will be added to the homepage, allowing users to search for Wi-Fi locations by city or country without needing to use the image icons.
- **Reply to Comments** – On Wi-Fi location pages, users can currently create comments. A future feature would allow users to reply to comments and have conversations with others.
- **Suggestions** – A feature to recommend Wi-Fi locations based on the user’s current location, making it easier to find nearby spots.
- **Sorting Feature** – When a user filters a list of Wi-Fi locations down to a city, they will be able to sort by amenities, star rating, or proximity to the city center.
- **Gallery** – This feature will allow users to upload multiple images to Wi-Fi location pages, creating a gallery that others can view and scroll through.

## Testing

- Please see External testing file for manaul testing result, automated testing and errors/bugs

[Link to test.md](testing.md)

## Technologies and Languages

- HTML: A markup language used to create the structure and content of web pages.
- CSS: A styling language used to control the layout and visual appearance of web pages.
- JavaScript: A programming language used to add interactivity and dynamic effects to web pages.
- Python: A high-level programming language used for web development, data analysis, and artificial intelligence.
- Django: A high-level Python web framework that enables rapid development of secure and maintainable websites.
- Github: A web-based platform for version control and collaboration on software development projects.
- Bootstrap: A popular front-end framework used to build responsive and mobile-first web applications.
- Heroku: A cloud platform as a service (PaaS) that enables developers to build, deploy, and scale web applications.
- Vscode: A lightweight, open-source code editor developed by Microsoft that supports a wide range of programming languages.
- Gitpod: A cloud-based development environment that provides a pre-configured and collaborative coding experience.
- SweetAlert: A JavaScript library used to create customizable and responsive alert messages and modal windows for web applications.

## Requirments.txt

- Following requirements for the REST API

- asgiref==3.8.1
- cloudinary==1.41.0
- dj-database-url==2.2.0
- dj-rest-auth==2.1.9
- Django==4.2
- django-allauth==0.54.0
- django-cloudinary-storage==0.3.0
- django-cors-headers==4.4.0
- djangorestframework==3.15.2
- djangorestframework-simplejwt==5.3.1
- gunicorn==23.0.0
- oauthlib==3.2.2
- pillow==10.4.0
- psycopg2==2.9.9
- PyJWT==2.9.0
- python3-openid==3.2.0
- requests-oauthlib==2.0.0
- sqlparse==0.5.1

## Deployment

### Deploying on Heroku

#### Preparing the Application

1. **Procfile**: Create a `Procfile` in the root directory of your project to instruct Heroku on how to run your application. For a Django project, you would run the following in your terminal:
   ```bash
   echo 'web: gunicorn <project_name>.wsgi' > Procfile
   ```
2. **requirements.txt**: Ensure all the project dependencies are listed in your `requirements.txt` file. To generate or update this file, run:
   ```bash
   pip freeze > requirements.txt
   ```
3. **Config Vars**: In the Heroku dashboard, under **Settings**, set the required configuration variables such as:
   - `SECRET_KEY`
   - `DATABASE_URL`
   - `CLOUDINARY_URL`
4. **ALLOWED_HOSTS**: Update your `settings.py` to include your Heroku app in `ALLOWED_HOSTS`:
   ```python
   ALLOWED_HOSTS = ['your-app-name.herokuapp.com']
   ```

#### Initial Setup

1. Sign up for an account at [Heroku](https://heroku.com) if you haven’t already.
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) to interact with Heroku from your terminal.
3. Alternatively, use the Heroku web interface to manage your deployment.

#### Creating a Heroku App

1. Log in to Heroku and click **Create New App**.
2. Provide a unique app name and choose the region closest to you.
3. Navigate to the **Buildpacks** section and ensure **Python** is added first, followed by **Node.js** if required.
   - You can reorder the buildpacks by dragging them into the correct sequence.

#### Deployment

1. **GitHub Integration**: In the **Deploy** tab, choose **GitHub** and search for your repository. Once found, click **Connect**.
2. **Manual Deployment**: You can also deploy manually by pushing your code to Heroku using the CLI:
   ```bash
   git push heroku main
   ```
3. **Migrations**: After deploying, ensure database migrations are applied:
   ```bash
   heroku run python manage.py migrate
   ```

#### Final Steps

1. **Dyno Management**: Ensure the web dyno is enabled in the **Resources** tab.
2. **View App**: Open your application using the Heroku dashboard or via the CLI:
   ```bash
   heroku open
   ```

### Local Deployment

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
   ```

2. **Open the Project**: Navigate to the project directory and open it in your IDE.

3. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   ```

4. **Activate the Virtual Environment**:

   - **Windows**:
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

5. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

6. **Set Up Environment Variables**: Create a `.env` file in the project’s root directory and add the necessary environment variables:

   ```bash
   SECRET_KEY=your_secret_key
   DATABASE_URL=your_database_url
   CLOUDINARY_URL=your_cloudinary_url
   ```

7. **Run the Development Server**:
   ```bash
   python manage.py runserver
   ```

---

### Forking the Repository

1. Navigate to the GitHub repository you want to fork.
2. Click the **Fork** button located in the upper-right corner of the repository page.
3. After the repository is forked, clone it to your local machine:

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-FORKED-REPOSITORY
   ```

4. Make changes to the codebase locally.
5. Commit your changes:

   ```bash
   git commit -m "Description of changes"
   ```

6. Push the changes to your forked repository:

   ```bash
   git push origin main
   ```

7. To contribute to the original repository, initiate a pull request by clicking **New pull request** on the original repository page.

---

### Cloning the Repository

1. Log in to GitHub and find the repository you want to clone.
2. Click the **Code** button and copy the URL under **Clone with HTTPS**.
3. Open Git Bash or a similar terminal and navigate to the directory where you want to clone the repository.
4. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
   ```

For more details on cloning a repository, check out [GitHub’s official documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

## Credit and Content

**Images**

- Logo Image - Auto generated with input prompts
- continent images:

  - [Ocenia Image](<https://en.wikipedia.org/wiki/Oceania#/media/File:Oceania_(centered_orthographic_projection).svg>)
  - [Africa Image](<https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_Africa#/media/File:Africa_(orthographic_projection).svg>)
  - [Asia Image](<https://en.wikipedia.org/wiki/Asia#/media/File:Asia_(orthographic_projection)_without_New_Guinea.svg>)
  - [Europe Image](<https://en.wikipedia.org/wiki/Europe#/media/File:Europe_orthographic_Caucasus_Urals_boundary_(with_borders).svg>)
  - [South America Image](<https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_South_America#/media/File:South_America_(orthographic_projection).svg>)
  - [North America Image](https://en.wikipedia.org/wiki/List_of_sovereign_states_and_dependent_territories_in_North_America#/media/File:Location_North_America.svg)

- About page boss image - [Link](https://www.manomano.fr/p/relaxdays-etui-lunettes-pour-8-paires-rangement-lunettes-de-soleil-85-x-335-x-245-cm-coffre-en-cuir-noir-49967871)

- About page team images:

  - [Team Member Image 1](https://unsplash.com/photos/people-holding-shoulders-sitting-on-wall-Cecb0_8Hx-o)
  - [Team Member Image 2](https://unsplash.com/photos/group-picture-of-men-and-women-on-hill-at-daytime-cMG5qjpnsyg)
  - [Team Member Image 3](https://unsplash.com/photos/a-man-wearing-a-hat-is-looking-at-a-laptop-t1aXvVUEH0o)
  - [Team Member Image 4](https://unsplash.com/photos/man-in-black-and-white-plaid-dress-shirt-sitting-by-the-table-using-macbook-1SimlW2A4ZY)
  - [Team Member Image 5](https://unsplash.com/photos/three-people-sitting-in-front-of-table-laughing-together-g1Kr4Ozfoac)
  - [Team Member Image 6](https://unsplash.com/photos/man-smiling-and-using-macbook-qnt9iigV444)
  - [Team Member Image 7](https://unsplash.com/photos/man-using-computer-desktop-front-of-cat-XncszFVfqhE)

- 404 Page image - [Link](https://unsplash.com/photos/people-holding-shoulders-sitting-on-wall-Cecb0_8Hx-o)

**Tutor Support**

- Profile component in django: created with the help of Code Institute Tutor Support

- Moment and drf-api Code Institute Walk Through Project

**Youtube Courses**

- Bro Code - React Fuull Course - [Link](https://www.youtube.com/watch?v=CgkZ7MvWUAA)

- freecodecamp.org - React Course - [Link](https://youtu.be/bMknfKXIFA8?si=rn1s71I49-x04VOQ)
