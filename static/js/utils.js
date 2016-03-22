
function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
    return 'AssertException: ' + this.message;
};

function assert(exp, message) {
    if (!exp) {
        throw new AssertException(message);
    }
}

// Mean of booleans (true==1; false==0)
function boolpercent(arr) {
    var count = 0;
    for (var i=0; i<arr.length; i++) {
        if (arr[i]) { count++; }
    }
    return 100* count / arr.length;
}

function getPseudoRandomNumber(a_list, curr_val) {
    //curr_val is 1 or 2. 1 implies 0 and 2 implies 1

    if (a_list.length > 1) {
        b_list = a_list.slice(a_list.length - 2, a_list.length);
        console.log('b', b_list, curr_val);
        
        first_val = b_list[0];
        second_val = b_list[1];
        if (first_val == second_val) {
            //swap the val
            if (curr_val == 1) {
                curr_val = 2;
            } else if (curr_val == 2) {
                curr_val = 1;
            }
        }
    }
    return curr_val;
}
