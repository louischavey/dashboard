TO-DO:
* SUBGOAL 1: Get the basic functionality on a FLASK server -- 2/10-2/23
    * Feature 1: Set up files and scripts in server - DONE 2/15
        * Add in continuous loop of file uploading - DONE 2/15
        * Make a copy of the uploaded file so that we don't edit the local copy - DONE 2/15
    * Feature 2: Run scripts on files and store output remotely
        * Choose program to run thru typing in file name - DONE 2/16
        * Edit all existing .ipynb files so that they're scripts that can take command line inputs and output graphs - DONE 2/24 
            * Display which scripts are currently in the directory
        * Give input to scripts thru dashboard interface
            1. Find out how to pass a CL input thru code and/or backend (assume just 1 input to a script for now) -- DONE 2/28
                * Hypothesis for why this isn't working: The way that I'm passing input into script isn't compatible with posting information from user to server thru dashboard
            2. Figure out how many inputs a script needs
                * Problem: Unable to pass multiple inputs
            3. Generate a template to enter inputs (need to be able to repeat code to generate multiple boxes/not hard code each box) so that file names aren't hard-coded
            4. Plug in the functionality from item #1
* SUBGOAL 2: Make a nicer frontend (move to REACT/tailwind) and make any frontend-enabled functionality improvements -- 2/17-2/23
    * Feature 2: Run script from a dropdown
* SUBGOAL 3: Run this on Prof. Sherin's server (and/or QUEST?) -- 2/24-3/1
* SUBGOAL 4: Finishing touch features + improve existing ones
    * Feature 3: Authentication system (especially if run on QUEST)
        * Make a family and friends version of the site w/ static graphs
        * Security considerations?
    * Feature 4: Progress bar on jobs
    * Feature 1: Drag and drop
* SUBGOAL 5: Server would issue instructions to QUEST (if server is basically the same speed as QUEST)
    * 
    