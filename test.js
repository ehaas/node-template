(function() {
    var sys = require('sys'),
        test = require('mjsunit'),
        template = require('./template'),
        pending_callbacks = 0;

    function expect_callback() {
        pending_callbacks += 1;
    }

    function receive_callback() {
        pending_callbacks -= 1;
    }


    var myobj = {obj : {num: 5, person:'Jack'}};
    var myobj2 = {obj : {num: 10, person:'Jill'}};

    expect_callback();
    template.create('./tmpls/t1.template', function(my_template_function) {
        receive_callback();
        test.assertEquals('5 apples for Jack ', my_template_function(myobj));
    });

    expect_callback();
    template.create('./tmpls/t2.template', function(my_template_function) {
        receive_callback();
        test.assertEquals('Bob', my_template_function({name:'Bob'}));
    });
    
    expect_callback();
    template.create('./tmpls/t3.template', function(my_template_function) {
        var data = {users: [{name:'Chad', age:25}, {name:'Bob', age:40}]};
        receive_callback();
        test.assertEquals('Chad is 25 years old.\nBob is 40 years old.\n', my_template_function(data));
    });
    
    // assert that all callbacks were called within the alloted time and exit
    
    setTimeout(function () {
        test.assertEquals(0, pending_callbacks);
        process.exit();
    }, 50);
}());
