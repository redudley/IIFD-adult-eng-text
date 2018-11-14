
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
                                "24.50", "24.49", "24.48", "24.47", "24.46", "24.45", "24.44", "24.43", "24.42", "24.41",
                                "24.40", "24.39", "24.38", "24.37", "24.36", "24.35", "24.34", "24.33", "24.32", "24.31",
                                "24.30", "24.29", "24.28", "24.27", "24.26", "24.25", "24.24", "24.23", "24.22", "24.21",
                                "24.20", "24.19", "24.18", "24.17", "24.16", "24.15", "24.14", "24.13", "24.12", "24.11",
                                "24.10", "24.09", "24.08", "24.07", "24.06", "24.05", "24.04", "24.03", "24.02", "24.01",
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

      //list4 - premises canonical order / every or three / trial order B / image order B
          //trials: 1 block:   1153, 1128, 1019, 1093, 1015, 1037, 1150, 1123, 1059, 1140,
          //        2 block:   1157, 1113, 1075, 1031, 1001, 1099, 1125, 1085, 1091, 1005,
          //        3 block:   1141, 1023, 1145, 1051, 1144, 1045, 1111, 1011, 1081, 1132,
          //        4 block:   1061, 1133, 1156, 1107, 1071, 1135, 1027, 1152, 1077, 1103,
          //        5 block:   1137, 1053, 1122, 1033, 1117, 1065, 1160, 1041, 1130, 1147


      ["24.01",   //1147-onlyP2-noP1-na-someB-square-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.02",   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.03",   //1041-canonical-disj-Afirst-someA-circle-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.04",   //1160-onlyP2-noP1-na-someB-square-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.05",   //1065-canonical-disj-Afirst-someA-circle-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.06",   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.07",   //1033-canonical-disj-Afirst-someB-circle-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.08",   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.09",   //1053-canonical-disj-Afirst-someA-square-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.10",   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.11",   //1103-onlyP1-disj-Afirst-noP2-square-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.12",   //1077-canonical-disj-Afirst-someA-square-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.13",   //1152-onlyP2-noP1-na-someB-square-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.14",   //1027-canonical-disj-Afirst-someB-circle-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["24.15",   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.16",   //1071-canonical-disj-Afirst-someA-square-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.17",   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      ["24.18",   //1156-onlyP2-noP1-na-someB-square-conjunctiveA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.19",   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.20",   //1061-canonical-disj-Afirst-someA-square-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.21",   //1132-onlyP2-noP1-na-someB-square-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.22",   //1081-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.23",   //1011-canonical-disj-Afirst-someB-circle-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.24",   //1111-onlyP1-disj-Afirst-noP2-square-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.25",   //1045-canonical-disj-Afirst-someA-square-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.26",   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.27",   //1051-canonical-disj-Afirst-someA-circle-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.28",   //1145-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.29",   //1023-canonical-disj-Afirst-someB-square-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.30",   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.31",   //1005-canonical-disj-Afirst-someB-square-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.32",   //1091-onlyP1-disj-Afirst-noP2-circle-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.33",   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.34",   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.35",   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.36",   //1001-canonical-disj-Afirst-someB-circle-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.37",   //1031-canonical-disj-Afirst-someB-square-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.38",   //1075-canonical-disj-Afirst-someA-circle-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.39",   //1113-onlyP1-disj-Afirst-noP2-circle-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      ["24.40",   //1157-onlyP2-noP1-na-someB-circle-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      ["24.41",   //1140-onlyP2-noP1-na-someB-square-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.42",   //1059-canonical-disj-Afirst-someA-circle-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.43",   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      ["24.44",   //1150-onlyP2-noP1-na-someB-circle-knownB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      ["24.45",   //1037-canonical-disj-Afirst-someB-square-knownB-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      ["24.46",   //1015-canonical-disj-Afirst-someB-square-knownA-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      ["24.47",   //1093-onlyP1-disj-Afirst-noP2-square-knownA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_square_three_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      ["24.48",   //1019-canonical-disj-Afirst-someB-circle-mixedAB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_every_circle_three_squares.html'}},
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_squares.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      ["24.49",   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      ["24.50",   //1153-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                "MyTime", {},
                "EnglishMessage",  {html: {include: 'eng_only_circles.html'}},
                "MyTime", {},
                "EnglishPictureAccept",  {s: "Which worksheet is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s



];
