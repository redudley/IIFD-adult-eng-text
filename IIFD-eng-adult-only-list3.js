
var shuffleSequence = seq(
                             "preload", "time",
                             "consent", "time",
                             "taskdescrip", "time",
                             "famknown", "time",
                             "singleprem",
                             "prac_single",
                             "doubleprem",
                             "prac_double",
                             "start",
                                "13.50", "13.49", "13.48", "13.47", "13.46", "13.45", "13.44", "13.43", "13.42", "13.41",
                                "13.40", "13.39", "13.38", "13.37", "13.36", "13.35", "13.34", "13.33", "13.32", "13.31",
                                "13.30", "13.29", "13.28", "13.27", "13.26", "13.25", "13.24", "13.23", "13.22", "13.21",
                                "13.20", "13.19", "13.18", "13.17", "13.16", "13.15", "13.14", "13.13", "13.12", "13.11",
                                "13.10", "13.09", "13.08", "13.07", "13.06", "13.05", "13.04", "13.03", "13.02", "13.01",
                                "finished", "time",
                                "subj_info", "time",
                                "sr", "time",
                                "code"
                            );

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "ContinueMessage", {
        hideProgressBar: false,
    },
    "PracticeMessage", {
        hideProgressBar: false,
    },
    "StartMessage", {
        hideProgressBar: false,
    },
    "FinishMessage", {
        hideProgressBar: false,
    },
    "EnglishPictureAccept", {
        hideProgressBar: false,
        randomOrder: false,
    },
    "EnglishMessage", {
        hideProgressBar: false,
    },
    "MyTime", {
        hideProgressBar: false,
    },
    "EnglishForm", {
        hideProgressBar: false,
        continueOnReturn: true,
    },
    "EnglishDoneForm", {
        hideProgressBar: false,
        continueOnReturn: true,
    },
];

var manualSendResults = true;

var IMAGES_TO_PRELOAD = [

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions

    "https://imgur.com/szZ1mVE.png", // 8-1c2s-control
    "https://imgur.com/wkDVZgd.png", // 8-1c3s-control
    "https://imgur.com/zXTKjiQ.png", // 8-2c2s-control
    "https://imgur.com/yv9ULuj.png", // 8-4c4s-control

    "https://imgur.com/uFZftEp.png", // 8-0c0s-sample

    "https://imgur.com/Cg57f9e.png", // Madame Gentille

];

define_ibex_controller({
    name: "EnglishPreloader",
    jqueryWidget: {
        _init: function () {
            this.element.append("Loading files...");

            this.preloadedImages = [ ];
            var numToPreload = IMAGES_TO_PRELOAD.length;
            for (var i = 0; i < IMAGES_TO_PRELOAD.length; ++i) {
                var img = new Image();
                img.src = IMAGES_TO_PRELOAD[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
        }
    },
    properties: {
        countsForProgressBar: false
    }
});


var items = [


    ["preload", "EnglishPreloader", { }],

    ["sr", "__SendResults__", { }],

    ["time", "MyTime", { }],

    ["sep", "Separator", { }],

    ["setcounter", "__SetCounter__", { }],

    ["taskdescrip","ContinueMessage", {html: {include: 'iifd_eng_task.html'}}],

    ["famknown","ContinueMessage", {html: {include: 'iifd_eng_known_sample.html'}}],

    ["singleprem","PracticeMessage", {html: {include: 'iifd_eng_introduce_single.html'}}],

    ["doubleprem","PracticeMessage", {html: {include: 'iifd_eng_introduce_double.html'}}],

    ["start","StartMessage", {html: {include: 'iifd_eng_start.html'}}],

    ["finished", "FinishMessage", {html: {include: 'iifd_eng_finish.html'}}],

    ["consent", "EnglishForm", {html: {include: 'english_agreement.html'}}],

    ["subj_info", "EnglishForm", {html: {include: 'english_questionary.html'}}],

    ["code", "EnglishDoneForm", {html: {include: 'english_written_number.html'}}],

    ["prac_single", //every shape: choice between 4c4s (correct, left) and 2c2s (wrong, right)
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_every_shape.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                  as:   [["D","https://imgur.com/wkDVZgd.png"], //4c4s - true
                                        ["K","https://imgur.com/zXTKjiQ.png"]]}],//2c2s - false
    ["prac_single", //three squares: choice between 1c3s (correct, right) and 1c2s (wrong, left)
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s - true
    ["prac_double", //one or four circles, every shape: choice between 4c4s (correct, right) and 1c2s (wrong, left)
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_one_circle_four_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_every_shape.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/wkDVZgd.png"]]}], //4c4s - true
    ["prac_double", //two or three squares, two circles : choice between 2c2s (correct, left) and 1c3s (wrong, right)
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_two_squares_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_practice_two_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                 as:   [["D","https://imgur.com/zXTKjiQ.png"], //2c2s - true
                                       ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s- false

      // condition names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside

      //list3 - premises canonical order / every or three / trial order B / image order A
          //trials: 1 block:  1154, 1127, 1017, 1095, 1013, 1039, 1149, 1124, 1057, 1139,
          //        2 block:  1158, 1115, 1073, 1029, 1003, 1097, 1126, 1087, 1089, 1007,
          //        3 block:  1142, 1021, 1146, 1049, 1143, 1047, 1109, 1009, 1083, 1131,
          //        4 block:  1063, 1134, 1155, 1105, 1069, 1136, 1025, 1151, 1079, 1101,
          //        5 block:  1138, 1055, 1121, 1035, 1119, 1067, 1159, 1043, 1129, 1148

      ["13.01",   //1148-onlyP2-noP1-na-someB-square-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["13.02",   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["13.03",   //1043-canonical-disj-Afirst-someA-circle-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["13.04",   //1159-onlyP2-noP1-na-someB-square-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["13.05",   //1067-canonical-disj-Afirst-someA-circle-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["13.06",   //1119-onlyP1-disj-Afirst-noP2-square-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["13.07",   //1035-canonical-disj-Afirst-someB-circle-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["13.08",  //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["13.09",  //1055-canonical-disj-Afirst-someA-square-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["13.10",  //1138-onlyP2-noP1-na-someB-circle-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["13.11",  //1101-onlyP1-disj-Afirst-noP2-square-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["13.12",   //1079-canonical-disj-Afirst-someA-square-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["13.13",   //1151-onlyP2-noP1-na-someB-square-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["13.14",   //1025-canonical-disj-Afirst-someB-circle-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], // 4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], // 0c3s
      ["13.15",   //1136-onlyP2-noP1-na-someB-square-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["13.16",   //1069-canonical-disj-Afirst-someA-square-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["13.17",   //1105-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["13.18",   //1155-onlyP2-noP1-na-someB-square-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["13.19",   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["13.20",   //1063-canonical-disj-Afirst-someA-square-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["13.21",   //1131-onlyP2-noP1-na-someB-square-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["13.22",   //1083-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], // 4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], // 4c3s
      ["13.23",   //1009-canonical-disj-Afirst-someB-circle-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["13.24",    //1109-onlyP1-disj-Afirst-noP2-square-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], // 3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], // 3c0s
      ["13.25",   //1047-canonical-disj-Afirst-someA-square-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s

      ["13.26",  //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], // 2c4s
      ["13.27",   //1049-canonical-disj-Afirst-someA-circle-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["13.28",   //1146-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["13.29",   //1021-canonical-disj-Afirst-someB-square-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["13.30",   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], // 4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], // 2c3s

      ["13.31",  //1007-canonical-disj-Afirst-someB-square-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], // 3c4s
      ["13.32",    //1089-onlyP1-disj-Afirst-noP2-circle-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], // 4c0s
      ["13.33",   //1087-onlyP1-disj-Afirst-noP2-square-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["13.34",   //1126-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["13.35",   //1097-onlyP1-disj-Afirst-noP2-circle-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["13.36",   //1003-canonical-disj-Afirst-someB-circle-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["13.37",   //1029-canonical-disj-Afirst-someB-square-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["13.38",   //1073-canonical-disj-Afirst-someA-circle-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["13.39",   //1115-onlyP1-disj-Afirst-noP2-circle-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], // 0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["13.40",   //1158-onlyP2-noP1-na-someB-circle-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["13.41",   //1139-onlyP2-noP1-na-someB-square-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["13.42",   //1057-canonical-disj-Afirst-someA-circle-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["13.43",   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], // 2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["13.44",   //1149-onlyP2-noP1-na-someB-circle-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["13.45",   //1039-canonical-disj-Afirst-someB-square-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["13.46",   //1013-canonical-disj-Afirst-someB-square-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], // 3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], // 0c4s
      ["13.47",   //1095-onlyP1-disj-Afirst-noP2-square-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], // 0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], // 3c2s
      ["13.48",   //1017-canonical-disj-Afirst-someB-circle-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], // 2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], // 4c2s
      ["13.49",   //1127-onlyP2-noP1-na-someB-square-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["13.50",   //1154-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s


];
