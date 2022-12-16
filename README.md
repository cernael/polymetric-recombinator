polymetric-recombinator
=======================

Web application for quickly visualizing the architecture of a piece of music in strict polymetric.

Let's actually make a plan.

I've had some thoughts, right?

Concepts:
    V - voice:
        A one-bar repeating rhythm.
    CM - combinatorial map:
        the global map of combined voices.
    CL - combinatorial length:
        the total length for all voices to go from in sync to back in sync.
    CP - combinatorial place:
        a specific point in the combinatorial map. Annotations here can show up as annotations in the voice UI elements.
    VP - voice place:
        a specific beat marker in a voice. Annotations here can show up in combinatorial places using the beat.
    CT - coincidence threshold:
        defaults to the number of voices. Only combinatorial places that include at least this many marked voice places are actually added for consideration in the combinatorial map.


Features:
Add voices, with a specified length.
    Calculate the new total combinatorial length of the piece. (If the coincidence threshold is not max, run an update to find new combinatorial places to add to the map.)


Mark a voice place as highlighted.
    Calculate combinatorial places including this voice place. If any reach the threshold, show them in the global map.

See an ordered list of the CPs.
    Possibly with some way to visually mark the distance between them in the CM.
    Show/hide annotations for the included VPs.

Annotate a CP.

Annotate a voice place.

Delete a voice:
    Ask if the CM should be saved. If so, somehow preserve a copy of the CM.
    Collapse annotations in the CM that were distinguished only by different notes in the deleted voice. Probably.

Unmark a voice place.
    Hide the CPs that fall below the CT, but keep their annotations in the CM.


(Set threshold for how many of the present voices need be marked for a combinatorial place to me marked.)
