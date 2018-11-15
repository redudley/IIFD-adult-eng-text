<?php
// Get a global counter from server and update counter
$counter_file = "/tmp/dispatch-counter-1";
$counter_val = file_get_contents($counter_file);
file_put_contents($counter_file, $counter_val + 1);

// Possible redirections
$redirects = array("http://spellout.net/ibexexps/redudley/IIFDaengwbs1/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwbs2/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwbs3/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwbs4/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwlb1/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwlb2/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwlb3/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwlb4/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwub1/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwub2/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwub3/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwub4/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwex1/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwex2/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwex3/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwex4/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwnq1/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwnq2/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwnq3/experiment.html",
                   "http://spellout.net/ibexexps/redudley/IIFDaengwnq4/experiment.html");
// Redirect user to the next link
header("Location: " . $redirects[$counter_val % count($redirects)]);
?>
