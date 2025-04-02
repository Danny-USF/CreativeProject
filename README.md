The application I created is intended to make it easier for the user to keep track of all of the people in their lives, so that they have easy access to information such as that individual's birthday, career, hobbies, familial connections, and so on. The application uses a Firebase Database to store information between instances of the application, allowing the user to build robust personal networks on the application.

The application is deployed here: "http://localhost:5173/login" try it out!

OR

Watch this video to see the application in action: https://res.cloudinary.com/dvpd1ibxp/video/upload/v1743567984/video1671046798_cb1e5k.mp4

The initial prompt I used for this application goes as such: Create a web application that allows the user to create and manage profiles for friends and family members. The user should be able to input a person's full name, birthday, relation to the user, occupation favorite color, favorite food, and hobbies.

Cursor responded by generating an extremely barebones profile-tracker application, creating card-like profiles from the user's inputs.

This was about what I expected: Cursor provided me with an extremely basic prompt that I could further refine later using additional prompts.

Here are ten feature-related follow-up prompts I gave to Cursor and their results:

Prompt 1: Make it so the user can create new profiles with an "Add New Profiles" button
Result: The application created an "Add New Profiles" button at the top of the screen.

Prompt 2: Make it so that the user can display profiles by hovering their mouse over the profile nodes.
Result: The application created pop-ups that appear whenever the user hovers their mouse over a profile node.

Prompt 3: Make it so that familial connection are shown as blue lines connecting profiles on the graph.
Result: Familial connections were displayed on the graph as blue lines linking different profiles nodes.

Prompt 4 Make it so that the user can edit profiles by clicking on the profile node.
Result: The application now allows users to edit profiles by clicking on the profile nodes.

Prompt 5: Make it so that the user can navigate the profile graph by scrolling with their mouse.
Result: The user can now move around the profile graph by clicking and dragging their mouse.

Prompt 6: Utilize the empty portion of the left side of the screen to create a calender that displays birthdays and other events using information taken from the profiles.
Result: Cursor created a calender that automatically displays the current month, and also allows the user to look ahead and backward on the calender. The calender did not display birthdays, however.

Prompt 7: Make it so that birthdays visually appear on the calender itself.
Result: Birthdays were still not displayed.

Prompt 8: Make it so that upcoming birthdays appear on the calender as little notifications on the blocks indicating certain dates.
Result: The application finally displayed birthdays on the calender, both past and upcoming.

Prompt 9: add user registration and login to the app, and change the app to use persistent data with a Firebase Firestore database. Make it so the data is user specific-- each user has their own list of profiles they can record. Use the following Firebase project settings: const firebaseConfig = {

  apiKey: "AIzaSyB2YTuI2BGcym1hgRkS3YSQrokKfyshckw",

  authDomain: "creativeproject-9fd2c.firebaseapp.com",

  projectId: "creativeproject-9fd2c",

  storageBucket: "creativeproject-9fd2c.firebasestorage.app",

  messagingSenderId: "65106030149",

  appId: "1:65106030149:web:9bdc305856f9b53ee83d2c",

  measurementId: "G-X4CETBKBPS"

};
Result: The application now has persistent memory stored in a Firebase Database, that can be accessed by users across iterations. Furthermore, users can create "accounts" with individualized logins to store their individual data.

Prompt 10: Make it so that the user can delete profiles while editing.
Result: The user can now delete profiles while editing.

Here are ten UI-Related follow-up prompts that I gave Cursor and their results:

Prompt 1: Alter the UI so that each profile the user creates is displayed in a web-like format, in which each profile is positioned equidistantly two inches away from a central node representing the user, and in which profiles that share familial relations are connected by lines.
Response: Cursor altered the application's UI so that the profiles generated appear in a web-like format centered around a single central node. However, the nodes were so close to one another that they were overlapping.

Prompt 2: Space the profile nodes two inches further away from the central node. Label the central node "me"
Response: The profile nodes are now spaced two inches away from the central node.

Prompt 3: Change the screen's background color to black.
Response: The application's background is now black, and other elements were also changed to fit the new theme.

Prompt 4: Change the background color of the profile pop-up to a dark grey
Response: The pop-up that appears when the user hovers their mouse over a profile node now has a black background and white tooltips.

Prompt 5: Change the color of the "create new profile" popup to black
Response: The pop-up that appears when the user clicks on a profile node now has a black background and white tooltips.

Prompt 6: Make it so that profiles with the same surname are positioned next to one another around the central node.
Response: Profile nodes with the same surname are now positioned next to one another on the graph.

Prompt 7: Alter the application's UI so that the lines indicating familal connection cannot pass through the "me" node.
Response: Lines indicating familial connection can no longer pass through the "me" node, and instead curve around the graph.

Prompt 8: Make it so that the calender is on the right side of the screen, and so that the calender and profile graph do not overlap.
Response: The calender was moved to the right side of the screen, but it was still overlapping the profile map.

Prompt 9: The calender and profile graph are still overlapping. Please make it so that they do not touch one another at all.
Response: The calender and the profile map no longer overlap.

Prompt 10: Make it so the width of the calender's background automatically stretches to fit the days of the month
Response: The calenders's size increased, but the background didn't.

Final Application Description:

This application gives it's users the ability to keep track of the people in their socal network. By creating profiles for the people that they interact with, the user creates a repository of information that can be quickly accessed when the user needs it.

What I liked about Cursor:

Working with Cursor allowed me to create applications faster than I ever could have on my own.

The AI formatted the application automatically, which gave me more time to focus on the application's features and UI.

What I found challenging:

Cursor often struggled to run the application when I wanted to test new edits.

The AI often didn't do what I asked it to, even when I tried to phrase my request in a different way.

Sometimes when I made edits to the UI, the AI would override previous alterations that I'd made.


