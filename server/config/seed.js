var User = require("../api/user/user.model");
var Job = require("../api/jobs/job.model");
var Info = require("../api/info/info.model");
var config = require("./environment");
var async = require('async');
User.find({}).remove(function () {
    User.create({
            provider: "local",
            role: "user",
            name: "john",
            email: "john@doe.com",
            password: "johnnyd"
        }, function (err, user) {

        }
    )
});

var fakeJobs = [
    {
        company: "CreativePlace",
        fromto: "2010 - 2013",
        position: "Ui Designer",
        logo: '/images/jobs/Chef-Cap-128.png',
        skills: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aliquam molestie eros sit amet consequat dignissim.",
            "Pellentesque mattis risus a tristique accumsan.",
            "Donec non nunc sit amet orci pellentesque rhoncus.",
            "Suspendisse suscipit leo quis interdum volutpat.",
            "Proin consectetur libero convallis odio vulputate, at rutrum sapien fermentum."
        ]
    },
    {
        company: "WebDesignPlace",
        fromto: "2008 - 2010",
        position: "Web dev. ",
        logo: '/images/jobs/Cloud-128.png',
        skills: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aliquam molestie eros sit amet consequat dignissim.",
            "Pellentesque mattis risus a tristique accumsan.",
            "Donec non nunc sit amet orci pellentesque rhoncus.",
            "Suspendisse suscipit leo quis interdum volutpat.",
            "Proin consectetur libero convallis odio vulputate, at rutrum sapien fermentum."
        ]

    },
    {
        company: "JavaScriptBox",
        fromto: "2004-2008",
        position: "JavaScript programmer",
        logo: '/images/jobs/Kremlin Palace-128.png',
        skills: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aliquam molestie eros sit amet consequat dignissim.",
            "Pellentesque mattis risus a tristique accumsan.",
            "Donec non nunc sit amet orci pellentesque rhoncus.",
            "Suspendisse suscipit leo quis interdum volutpat.",
            "Proin consectetur libero convallis odio vulputate, at rutrum sapien fermentum."

        ]

    },
    {
        company: "RandomDesigns",
        fromto: "1998 - 2004",
        position: "Graphic Designer",
        logo: '/images/jobs/Newspaper-128.png',
        skills: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Aliquam molestie eros sit amet consequat dignissim.",
            "Pellentesque mattis risus a tristique accumsan.",
            "Donec non nunc sit amet orci pellentesque rhoncus.",
            "Suspendisse suscipit leo quis interdum volutpat.",
            "Proin consectetur libero convallis odio vulputate, at rutrum sapien fermentum."
        ]
    }


];

Info.find({}).remove(function () {
    Info.create({
            name: "John Doe",
            address1: "1993 Middle Cloud Drive",
            address2: "Spyrock, Quebec",
            address3: "G4E 3J9",
            email: "john@doe.com",
            github: "https://github.com/",
            phone: "(555)555-5555",
            cell: "(555)666-6666",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sodales eros sit amet diam venenatis viverra." +
            " Fusce tempor congue pretium. Proin laoreet quam quis purus aliquam, vitae condimentum neque dapibus. Vestibulum rutrum pulvinar eros." +
            " Nulla luctus venenatis sollicitudin. Suspendisse rhoncus facilisis odio, at pulvinar odio commodo at. Cras id mauris sed neque fringilla" +
            " hendrerit ac sit amet ante. Donec posuere lorem neque, ac ultricies purus ullamcorper id."
        }, function (err, user) {

        }
    );
});


Job.find({}).remove(function () {
    async.each(fakeJobs, function (jobdata, callback) {

        var job = new Job({
            company: jobdata.company,
            fromto: jobdata.fromto,
            logo: jobdata.logo,
            skills: jobdata.skills,
            position: jobdata.position
        });

        job.save(function (err, item) {
            if (err) {
                console.log(err);
            }
            callback();
        });

    });
});
