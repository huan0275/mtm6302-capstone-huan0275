# mtm6302-capstone-huan0275
Caihua Huang
041-077-508
Pokedex

A report to explain the design decisions:

First off, I used a Pokemons Photo with four pokemons.
Secondly, I decided the following color according to the four pokenmons' skins. 
I've got two dimensions, one for desktop and the other mobile.
Per requirements, the layouts are different for the pokemons caught and uncaught.
For caught ones, there exist in a 'bowl' in which all the pokemons caught are.
Inside the detail of a pokemon, user should be able to release/catch, or simply quit to view it and go back to pokemons display page, when interacting with the buttons. 
Homepage for the desktop will automatically load the 20 pokemons without user clicking 'more' sign, if they don't sign in or register within certain seconds. (Just a thought, may change if it won't work webdev-wise)


a report on Pt.3

1 outlines the steps taken
first, think about how many html pages there should be. for my project, there should be 3: index(home), detail, and collection (list). 
*** it's fewer than hifi wireframes, because i think the catch/release button will change according to the reality, which of course needs knowledge in js(?).
then, the repsective css files.
third, the js page.

2 resources used
i didn't use CSS Frameworks. i used the AI to answer my all kinds of questions, especially the js part, since when i was designing the hifi wireframes i didn't know it would be so hard. 

3 challenges faced
a. the background picture is very tricky, it's hard to put the ideal place. tried many times to make it. 

b. had no idea when designing the hi-fi wireframes that it needs js which is quite hard. i used chatgpt to realize the effct designed in hifi wireframes for mobile desktop when tapping the pokemon.

c. the images(pokemons) in the bowls are even harder to realize so i just dropped the idea that they randomly scatter in the bowl.

d. the load more arrow is hard to control to be in the center during the transition to mobile version

e. also the hamburger menu needs js a lot, so i dropped it for the mobile version.

A Report on Pt. 4

a. tried to merge all css together but that's just led to a mess, and the prof said it's ok to leave three css there. Also, there's no need to download the list of the caught pokemons. such a list button was therefore deleted. 

b. used js to add more html to index.html like detail and collection html. 

c. used chatgpt to figure out how to randomly load the first 20 pokemons instead of the same pokemons with the same order again and again, and how to dynamically change the 'release'/'catch' button according to the reality.

d. forget about the name that has to be with the image when initially loaded, I had to add them dynamically. To avoid the image placed weirdly i had to use transform: translateY to put it in the center of the circle.

e. pokemons in the caught list displayed weridly, did some work on its CSS too. 

f. html/css validator used to check if there're any grammar errors.